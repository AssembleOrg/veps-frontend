import { ref, readonly } from 'vue'
import { navigateTo } from '#app'
import type { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const user = ref<User | null>(null)
  const loading = ref(true)
  const token = ref<string | null>(null)

  // Backend auth endpoints base
  const authBase = 'http://localhost:3000/auth'

  // Load session from localStorage if present
  const getSession = async () => {
    try {
      // Prefer restoring a full session if available
      const rawSession = localStorage.getItem('vep_session')
      if (rawSession) {
        try {
          const s = JSON.parse(rawSession)
          token.value = s?.access_token || s?.session?.access_token || null
          // save token also in vep_token for backward compatibility
          if (token.value) try { localStorage.setItem('vep_token', token.value) } catch (_) {}
          // user is inside session.user
          user.value = s?.user || s?.session?.user || null
        } catch (e) {
          console.warn('[useAuth] failed parsing vep_session', e)
        }
      } else {
        const rawUser = localStorage.getItem('vep_user')
        if (rawUser) {
          try {
            user.value = JSON.parse(rawUser)
          } catch (_) {
            user.value = null
          }
        }
        const tok = localStorage.getItem('vep_token')
        if (tok) token.value = tok
      }
    } catch (e) {
      console.error('Error reading session from storage', e)
      user.value = null
    } finally {
      loading.value = false
    }
  }

  // Sign in using backend /auth/login
  const signIn = async (username: string, password: string) => {
    try {
      const res = await fetch(`${authBase}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (res.status === 401) {
        const err = await res.json().catch(() => ({ message: 'Unauthorized' }))
        const e = new Error(err.message || 'Unauthorized') as any
        e.status = 401
        throw e
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || `Error ${res.status}`)
      }

      const data = await res.json()

      // If backend returns the LoginResponse shape with session
      const session = data.session || data?.data?.session || data?.session
      if (session) {
        // Persist full session for later restoration
        try { localStorage.setItem('vep_session', JSON.stringify(session)) } catch (_) {}
        token.value = session.access_token || session?.access_token || null
        try { if (token.value) localStorage.setItem('vep_token', token.value) } catch (_) {}
        // refresh token
        try { if (session.refresh_token) localStorage.setItem('vep_refresh', session.refresh_token) } catch (_) {}
        // user inside session.user
        user.value = session.user || null
        try { if (user.value) localStorage.setItem('vep_user', JSON.stringify(user.value)) } catch (_) {}
      } else {
        // Fallbacks: older shapes
        const returnedUser = data.user ?? null
        user.value = returnedUser
        try { if (user.value) localStorage.setItem('vep_user', JSON.stringify(user.value)) } catch (_) {}
        const returnedToken = data.token || data.accessToken || data.jwt || null
        if (returnedToken) {
          token.value = returnedToken
          try { localStorage.setItem('vep_token', returnedToken) } catch (_) {}
        }
      }
      return data
    } catch (err) {
      throw err
    }
  }

  // Sign out - clear local session and call backend logout if available
  const signOut = async () => {
    // Attempt server logout, ignore failures
    console.table(user.value)
    try {
      await fetch(`${authBase}/logout`, { method: 'POST' })
    } catch (e) {
      // ignore
    }

    try { console.debug('[useAuth] Signing out: starting') } catch (_) {}
    user.value = null
    token.value = null

    // Remove specific keys (explicit) and clear storages as best-effort
    try { localStorage.removeItem('vep_session') } catch (e) { console.warn('[useAuth] removeItem vep_session failed', e) }
    try { localStorage.removeItem('vep_token') } catch (e) { console.warn('[useAuth] removeItem vep_token failed', e) }
    try { localStorage.removeItem('vep_refresh') } catch (e) { console.warn('[useAuth] removeItem vep_refresh failed', e) }
    try { localStorage.removeItem('vep_user') } catch (e) { console.warn('[useAuth] removeItem vep_user failed', e) }
    try { localStorage.clear() } catch (e) { console.warn('[useAuth] localStorage.clear failed', e) }
    try { sessionStorage.clear() } catch (e) { console.warn('[useAuth] sessionStorage.clear failed', e) }

    // Try to delete cookies (best-effort)
    try {
      const cookies = (document.cookie || '').split(';')
      for (const c of cookies) {
        const eqPos = c.indexOf('=')
        const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim()
        if (!name) continue
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
      }
    } catch (e) {
      console.warn('[useAuth] Failed clearing cookies', e)
    }

    try { console.debug('[useAuth] Signing out: navigating to /login') } catch (_) {}
    try {
      // replace to avoid back navigation to protected pages
      window.location.replace('/login')
      return true
    } catch (e) {
      try { navigateTo('/login') } catch (_) {}
      return true
    }
  }

  // onAuthStateChange: simple subscriber using polling of user ref
  const onAuthStateChange = (callback: (u: User | null) => void) => {
    // call immediately with current
    callback(user.value)
    // watch via simple interval (lightweight)
    const id = setInterval(() => callback(user.value), 1000)
    return () => clearInterval(id)
  }

  // Initialize on client side
  if (import.meta.client) {
    getSession()
  }

  return {
    user: readonly(user),
    token: readonly(token),
    loading: readonly(loading),
    signIn,
    signOut,
    getSession,
    onAuthStateChange,
  }
}