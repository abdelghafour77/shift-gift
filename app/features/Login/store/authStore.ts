import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean | null
  profile: 'ADMIN' | 'COLLABORATOR' | null
  SN: string | null
  setIsAuthenticated: (value: boolean) => void
  setProfile: (value: 'ADMIN' | 'COLLABORATOR' | null) => void
  backOfficeLogout: () => void
  setSN: (value: string | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: null,
  profile: null,
  SN: null,

  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
  setProfile: (value: 'ADMIN' | 'COLLABORATOR' | null) => set({ profile: value }),
  backOfficeLogout: () => {
    set({
      isAuthenticated: null,
    })
  },
  setSN: (value: string | null) => set({ SN: value }),
}))
