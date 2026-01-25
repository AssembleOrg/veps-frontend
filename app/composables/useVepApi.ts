import type {
  FolderContents,
  CreateFolderResponse,
  FolderExistsResponse,
  ListFoldersResponse,
  SearchFoldersResponse,
  SearchFilesResponse,
  RenameFileResponse,
  GenerateFolderNameResponse,
  RenameFileRequest,
  VepUser,
  CreateVepUserDto,
  UpdateVepUserDto,
  PaginatedResponse,
  DeleteVepUserResponse,
  JobTime,
  CreateJobTimeDto,
  UpdateJobTimeDto
} from '~/types/api'

export const useVepApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.baseURL
  const baseURLDigitalOcean = `${baseURL}/digital-ocean`

  // Auth token from useAuth (if available)
  const auth = useAuth()
  const getAuthHeaders = () => {
    const h: Record<string,string> = { 'Content-Type': 'application/json' }
    try {
      const token = (auth as any).token?.value || localStorage.getItem('vep_token')
      if (token) h['Authorization'] = `Bearer ${token}`
    } catch (_) {}
    return h
  }

  // Función helper para manejar errores
  async function handleApiCall<T>(apiCall: () => Promise<Response>): Promise<T> {
    try {
      const response = await apiCall()
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        
        switch (response.status) {
          case 401:
            // Token expirado o no autorizado - limpiar sesión y redirigir al login
            console.warn('[useVepApi] 401 Unauthorized - cerrando sesión')
            try {
              await (auth as any).signOut()
            } catch (signOutError) {
              console.error('[useVepApi] Error al cerrar sesión:', signOutError)
              // Forzar redirección manual si signOut falla
              try {
                localStorage.clear()
                sessionStorage.clear()
                window.location.replace('/login')
              } catch (e) {
                console.error('[useVepApi] Error al redirigir:', e)
              }
            }
            throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.')
          case 400:
            throw new Error(`Parámetros inválidos: ${errorData.message || 'Error de validación'}`)
          case 404:
            throw new Error(`Recurso no encontrado: ${errorData.message || 'No existe'}`)
          case 409:
            throw new Error(`Conflicto: ${errorData.message || 'Ya existe'}`)
          default:
            throw new Error(`Error ${response.status}: ${errorData.message || 'Error desconocido'}`)
        }
      }
      
      return await response.json()
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Error de conexión. Verifica que el servidor esté funcionando.')
      }
      throw error
    }
  }

  // 📁 Crear Carpeta
  const createFolder = async (month: number, year: number): Promise<CreateFolderResponse> => {
    return handleApiCall(() =>
      fetch(`${baseURLDigitalOcean}/folders?month=${month}&year=${year}`, {
        method: 'POST',
        headers: getAuthHeaders(),
      })
    )
  }

  // ✅ Verificar Existencia de Carpeta
  const checkFolderExists = async (folderName: string): Promise<FolderExistsResponse> => {
    return handleApiCall(() =>
      fetch(`${baseURLDigitalOcean}/folders/${encodeURIComponent(folderName)}/exists`, { headers: getAuthHeaders() })
    )
  }

  // 📋 Listar Todas las Carpetas
  const listAllFolders = async (): Promise<ListFoldersResponse> => {
    return handleApiCall(() =>
      fetch(`${baseURLDigitalOcean}/folders`, { headers: getAuthHeaders() })
    )
  }

  // 🔍 Buscar Carpetas
  const searchFolders = async (searchTerm: string): Promise<SearchFoldersResponse> => {
    return handleApiCall(() =>
      fetch(`${baseURLDigitalOcean}/folders/search?term=${encodeURIComponent(searchTerm)}`, { headers: getAuthHeaders() })
    )
  }

  // 📂 Obtener Contenido de Carpeta
  const getFolderContents = async (folderName: string): Promise<FolderContents> => {
    return handleApiCall(() =>
      fetch(`${baseURLDigitalOcean}/folders/${encodeURIComponent(folderName)}/contents`, { headers: getAuthHeaders() })
    )
  }

  // 🔎 Buscar Archivos
  const searchFiles = async (searchTerm: string, folder?: string): Promise<SearchFilesResponse> => {
    let url = `${baseURLDigitalOcean}/files/search?term=${encodeURIComponent(searchTerm)}`
    if (folder) {
      url += `&folder=${encodeURIComponent(folder)}`
    }
    
    return handleApiCall(() => fetch(url, { headers: getAuthHeaders() }))
  }

  // ✏️ Renombrar Archivo
  const renameFile = async (oldKey: string, newKey: string): Promise<RenameFileResponse> => {
    return handleApiCall(() =>
      fetch(`${baseURLDigitalOcean}/files/rename`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ oldKey, newKey } as RenameFileRequest),
      })
    )
  }

  // 🏷️ Generar Nombre de Carpeta
  const generateFolderName = async (month: number, year: number): Promise<GenerateFolderNameResponse> => {
    return handleApiCall(() =>
      fetch(`${baseURLDigitalOcean}/folders/generate-name?month=${month}&year=${year}`, { headers: getAuthHeaders() })
    )
  }

  // 🔄 Crear Carpeta con Validación
  const createFolderSafely = async (month: number, year: number) => {
    try {
      // 1. Generar nombre
      const nameInfo = await generateFolderName(month, year)
      
      // 2. Verificar si existe
      const existsCheck = await checkFolderExists(nameInfo.folderName)
      
      if (existsCheck.exists) {
        return { 
          success: false, 
          message: `La carpeta ${nameInfo.folderName} ya existe`,
          folderName: nameInfo.folderName
        }
      }
      
      // 3. Crear carpeta
      const result = await createFolder(month, year)
      return result
      
    } catch (error) {
      console.error('Error en flujo de creación:', error)
      throw error
    }
  }

  // 📥 Descargar archivo por clave (devuelve Blob)
  const downloadFileByKey = async (key: string): Promise<Blob> => {
    try {
      const url = `${baseURLDigitalOcean}/files/download-by-key?key=${encodeURIComponent(key)}`
      const res = await fetch(url, { headers: getAuthHeaders() })
      if (!res.ok) {
        if (res.status === 401) {
          // Token expirado - limpiar sesión y redirigir al login
          console.warn('[useVepApi] 401 Unauthorized en downloadFileByKey - cerrando sesión')
          try {
            await (auth as any).signOut()
          } catch (signOutError) {
            console.error('[useVepApi] Error al cerrar sesión:', signOutError)
            localStorage.clear()
            sessionStorage.clear()
            window.location.replace('/login')
          }
          throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.')
        }
        if (res.status === 404) throw new Error('Archivo no encontrado (404)')
        const err = await res.json().catch(() => ({ message: `Error ${res.status}` }))
        throw new Error(err.message || `Error ${res.status}`)
      }
      return await res.blob()
    } catch (err) {
      if (err instanceof TypeError) throw new Error('Error de conexión al descargar archivo')
      throw err
    }
  }

  // 📥 Descargar archivo por nombre (+opcional carpeta) (devuelve Blob)
  const downloadFileByName = async (fileName: string, folder?: string): Promise<Blob> => {
    try {
      const q = `fileName=${encodeURIComponent(fileName)}` + (folder ? `&folder=${encodeURIComponent(folder)}` : '')
      const url = `${baseURLDigitalOcean}/files/download?${q}`
      const res = await fetch(url, { headers: getAuthHeaders() })
      if (!res.ok) {
        if (res.status === 401) {
          // Token expirado - limpiar sesión y redirigir al login
          console.warn('[useVepApi] 401 Unauthorized en downloadFileByName - cerrando sesión')
          try {
            await (auth as any).signOut()
          } catch (signOutError) {
            console.error('[useVepApi] Error al cerrar sesión:', signOutError)
            localStorage.clear()
            sessionStorage.clear()
            window.location.replace('/login')
          }
          throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.')
        }
        if (res.status === 404) throw new Error('Archivo no encontrado (404)')
        const err = await res.json().catch(() => ({ message: `Error ${res.status}` }))
        throw new Error(err.message || `Error ${res.status}`)
      }
      return await res.blob()
    } catch (err) {
      if (err instanceof TypeError) throw new Error('Error de conexión al descargar archivo')
      throw err
    }
  }

  // 🔗 Obtener código QR (devuelve Blob)
  const getQrCode = async (): Promise<Blob> => {
    try {
      const config = useRuntimeConfig()
      const secret = config.public.qrSecret
      console.log('secret', secret)
      const url = `${baseURL}/qr?secret=${encodeURIComponent(secret)}`
      const res = await fetch(url, { headers: getAuthHeaders() })
      if (!res.ok) {
        if (res.status === 401) {
          // Token expirado - limpiar sesión y redirigir al login
          console.warn('[useVepApi] 401 Unauthorized en getQrCode - cerrando sesión')
          try {
            await (auth as any).signOut()
          } catch (signOutError) {
            console.error('[useVepApi] Error al cerrar sesión:', signOutError)
            localStorage.clear()
            sessionStorage.clear()
            window.location.replace('/login')
          }
          throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.')
        }
        const err = await res.json().catch(() => ({ message: `Error ${res.status}` }))
        throw new Error(err.message || `Error ${res.status}`)
      }
      return await res.blob()
    } catch (err) {
      if (err instanceof TypeError) throw new Error('Error de conexión al obtener código QR')
      throw err
    }
  }

  // 👥 VEP Users API Functions
  
  // Obtener usuarios filtrados (sin paginación)
  const getVepUsersFiltered = async (
    search?: string, 
    field?: string, 
    type?: 'autónomo' | 'credencial' | 'monotributo'
  ): Promise<VepUser[]> => {
    const params = new URLSearchParams()
    
    if (search && search.trim()) {
      params.append('search', search.trim())
    }
    
    if (field && field.trim()) {
      params.append('field', field.trim())
    }
    
    if (type) {
      params.append('type', type)
    }
    
    const queryString = params.toString()
    const url = queryString 
      ? `${baseURL}/vep-users/filtered?${queryString}`
      : `${baseURL}/vep-users/filtered`
    
    return handleApiCall(() =>
      fetch(url, { 
        headers: getAuthHeaders() 
      })
    )
  }

  // Obtener usuarios paginados con búsqueda y filtros integrados (DEPRECATED - usar getVepUsersFiltered)
  const getVepUsersPaginated = async (
    page: number = 1, 
    limit: number = 10, 
    search?: string, 
    field?: string, 
    type?: 'autónomo' | 'credencial' | 'monotributo'
  ): Promise<PaginatedResponse<VepUser>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    
    if (search && search.trim()) {
      params.append('search', search.trim())
    }
    
    if (field && field.trim()) {
      params.append('field', field.trim())
    }
    
    if (type) {
      params.append('type', type)
    }
    
    return handleApiCall(() =>
      fetch(`${baseURL}/vep-users/paginated?${params.toString()}`, { 
        headers: getAuthHeaders() 
      })
    )
  }

  // Crear usuario VEP
  const createVepUser = async (userData: CreateVepUserDto): Promise<VepUser> => {
    return handleApiCall(() =>
      fetch(`${baseURL}/vep-users`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
      })
    )
  }

  // Obtener usuario por ID
  const getVepUserById = async (id: number): Promise<VepUser> => {
    return handleApiCall(() =>
      fetch(`${baseURL}/vep-users/${id}`, { 
        headers: getAuthHeaders() 
      })
    )
  }

  // Actualizar usuario VEP
  const updateVepUser = async (id: number, userData: UpdateVepUserDto): Promise<VepUser> => {
    return handleApiCall(() =>
      fetch(`${baseURL}/vep-users/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
      })
    )
  }

  // Eliminar usuario VEP
  const deleteVepUser = async (id: number): Promise<DeleteVepUserResponse> => {
    return handleApiCall(() =>
      fetch(`${baseURL}/vep-users/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })
    )
  }

  // Buscar usuarios VEP
  const searchVepUsers = async (term: string, field?: string): Promise<VepUser[]> => {
    let url = `${baseURL}/vep-users/search?term=${encodeURIComponent(term)}`
    if (field) {
      url += `&field=${encodeURIComponent(field)}`
    }
    
    return handleApiCall(() => fetch(url, { headers: getAuthHeaders() }))
  }

  // Job Time API functions
  const createJobTime = async (jobTimeData: CreateJobTimeDto): Promise<JobTime> => {
    return handleApiCall(() =>
      fetch(`${baseURL}/job-time`, {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobTimeData)
      })
    )
  }

  const getAllJobTimes = async (): Promise<JobTime[]> => {
    return handleApiCall(() =>
      fetch(`${baseURL}/job-time`, {
        headers: getAuthHeaders()
      })
    )
  }

  const getJobTimesPaginated = async (
    page: number = 1,
    limit: number = 10,
    search?: string,
    field?: string,
    status?: 'PENDING' | 'FINISHED' | 'RUNNING' | 'ERROR',
    type?: 'autónomo' | 'credencial' | 'monotributo'
  ): Promise<PaginatedResponse<JobTime>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    if (search && search.trim()) {
      params.append('search', search.trim())
    }

    if (field && field.trim()) {
      params.append('field', field.trim())
    }

    if (status) {
      params.append('status', status)
    }

    if (type) {
      params.append('type', type)
    }

    return handleApiCall(() =>
      fetch(`${baseURL}/job-time/paginated?${params.toString()}`, {
        headers: getAuthHeaders()
      })
    )
  }

  const searchJobTimes = async (
    term: string,
    field?: string,
    status?: 'PENDING' | 'FINISHED' | 'RUNNING' | 'ERROR',
    type?: 'autónomo' | 'credencial' | 'monotributo'
  ): Promise<JobTime[]> => {
    const params = new URLSearchParams({
      term: term.trim()
    })

    if (field && field.trim()) {
      params.append('field', field.trim())
    }

    if (status) {
      params.append('status', status)
    }

    if (type) {
      params.append('type', type)
    }

    return handleApiCall(() =>
      fetch(`${baseURL}/job-time/search?${params.toString()}`, {
        headers: getAuthHeaders()
      })
    )
  }

  const getJobTimeById = async (id: number): Promise<JobTime> => {
    return handleApiCall(() =>
      fetch(`${baseURL}/job-time/${id}`, {
        headers: getAuthHeaders()
      })
    )
  }

  const updateJobTime = async (id: number, jobTimeData: UpdateJobTimeDto): Promise<JobTime> => {
    return handleApiCall(() =>
      fetch(`${baseURL}/job-time/${id}`, {
        method: 'PATCH',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobTimeData)
      })
    )
  }

  const deleteJobTime = async (id: number): Promise<boolean> => {
    return handleApiCall(() =>
      fetch(`${baseURL}/job-time/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
    )
  }

  return {
    createFolder,
    checkFolderExists,
    listAllFolders,
    searchFolders,
    getFolderContents,
    searchFiles,
    renameFile,
    generateFolderName,
    createFolderSafely,
    downloadFileByKey,
    downloadFileByName,
    getQrCode,
    // VEP Users functions
    getVepUsersFiltered,
    getVepUsersPaginated,
    createVepUser,
    getVepUserById,
    updateVepUser,
    deleteVepUser,
    searchVepUsers,
    // Job Time functions
    createJobTime,
    getAllJobTimes,
    getJobTimesPaginated,
    searchJobTimes,
    getJobTimeById,
    updateJobTime,
    deleteJobTime
  }
} 