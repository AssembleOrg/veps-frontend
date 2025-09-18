// Tipos para la API del VepSenderController

// Elemento de carpeta (archivo o subcarpeta)
export interface FolderItem {
  name: string;           // Nombre del archivo o carpeta
  type: 'file' | 'folder'; // Tipo de elemento
  size?: number;          // Tamaño en bytes (solo para archivos)
  lastModified?: Date;    // Fecha de última modificación
  key: string;           // Clave completa en el bucket
}

// Contenido completo de una carpeta
export interface FolderContents {
  items: FolderItem[];    // Lista de elementos
  totalCount: number;     // Total de elementos
  folderPath: string;     // Ruta de la carpeta
}

// Respuesta de creación de carpeta
export interface CreateFolderResponse {
  success: boolean;
  message: string;
  folderName: string;
}

// Respuesta de verificación de existencia
export interface FolderExistsResponse {
  exists: boolean;
  folderName: string;
}

// Respuesta de listado de carpetas
export interface ListFoldersResponse {
  folders: string[];
  totalCount: number;
}

// Respuesta de búsqueda de carpetas
export interface SearchFoldersResponse {
  folders: string[];
  totalCount: number;
  searchTerm: string;
}

// Respuesta de búsqueda de archivos
export interface SearchFilesResponse {
  files: FolderItem[];
  totalCount: number;
  searchTerm: string;
  folder?: string; // Solo presente si se buscó en carpeta específica
}

// Respuesta de renombrado de archivo
export interface RenameFileResponse {
  success: boolean;
  message: string;
  oldKey: string;
  newKey: string;
}

// Respuesta de generación de nombre
export interface GenerateFolderNameResponse {
  folderName: string;
  month: number;
  year: number;
}

// Cuerpo para renombrar archivo
export interface RenameFileRequest {
  oldKey: string;
  newKey: string;
}

// Tipos para formularios
export interface CreateFolderForm {
  month: number;
  year: number;
}

export interface SearchForm {
  term: string;
  folder?: string;
}

export interface RenameForm {
  oldKey: string;
  newKey: string;
}

// VEP Users Types
export interface VepUser {
  id: number
  alter_name: string
  cuit: string
  execution_date: string | null
  is_group: boolean
  last_execution: string | null
  mobile_number: string
  need_papers: boolean | null
  need_z: boolean | null
  need_compra: boolean | null
  need_auditoria: boolean | null
  real_name: string
  // NUEVO: Array de usuarios asociados
  joined_users: Array<{
    name: string
    cuit: string
  }> | null
  // NUEVO: Tipo de usuario
  type: 'autónomo' | 'credencial'
}

export interface CreateVepUserDto {
  alter_name: string
  cuit: string
  execution_date?: string | null
  is_group?: boolean
  last_execution?: string | null
  mobile_number: string
  need_papers?: boolean | null
  need_z?: boolean | null
  need_compra?: boolean | null
  need_auditoria?: boolean | null
  real_name: string
  // NUEVO: Array de usuarios asociados
  joined_users?: Array<{
    name: string
    cuit: string
  }>
  // NUEVO: Tipo de usuario
  type: 'autónomo' | 'credencial'
}

export interface UpdateVepUserDto {
  alter_name?: string
  cuit?: string
  execution_date?: string | null
  is_group?: boolean
  last_execution?: string | null
  mobile_number?: string
  need_papers?: boolean | null
  need_z?: boolean | null
  need_compra?: boolean | null
  need_auditoria?: boolean | null
  real_name?: string
  // NUEVO: Array de usuarios asociados
  joined_users?: Array<{
    name: string
    cuit: string
  }>
  // NUEVO: Tipo de usuario
  type?: 'autónomo' | 'credencial'
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface DeleteVepUserResponse {
  success: boolean
  message: string
}

// Tipo para usuarios asociados
export interface JoinedUserDto {
  name: string
  cuit: string
} 