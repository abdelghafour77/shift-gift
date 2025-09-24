import { useState, type Dispatch, type SetStateAction } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useLoginAdminQuery, useLoginQuery } from './loginQuerries'
import { useGlobalStore } from '../../../store/globalStore'

interface useLoginProps {
  username?: string
  password?: string
  navigate: NavigateFunction
  setShowError?: Dispatch<SetStateAction<string>>
  setUsernameError?: (value: SetStateAction<string | null>) => void
}

export const useLogin = ({ username, password, navigate, setShowError, setUsernameError }: useLoginProps) => {
  const { SN, setIsAuthenticated, setProfile } = useAuthStore()
  const { mutateAsync: backOfficeLogin } = useLoginQuery()
  const { mutateAsync: adminLogin, isPending: isLoginPending } = useLoginAdminQuery()
  const { setCollaborator } = useGlobalStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const collaborator = await backOfficeLogin(SN ?? '')
      setIsAuthenticated(true)
      setProfile(collaborator?.profile)
      localStorage.setItem('isAuthenticated', 'true')
      if (collaborator?.profile === 'COLLABORATOR') {
        navigate('/shift')
        setCollaborator(collaborator)
      } else {
        navigate('/login')
      }
    } catch (err: any) {
      setIsAuthenticated(false)
      setProfile(null)
      localStorage.setItem('isAuthenticated', 'false')
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdminLogin = async () => {
    setShowError && setShowError('')
    setUsernameError && setUsernameError(null)
    if (username && !username.trim() && setUsernameError) {
      setUsernameError('t("backoffice.Login.errorUsernameRequired")')
      return
    }
    if (password && !password.trim() && setShowError) {
      setShowError('t("backoffice.Login.errorAllFields")')
      return
    }
    try {
      let response
      if (username && password) {
        response = await adminLogin({
          username,
          password,
        })
      }
      setProfile(response?.profile)
      setIsAuthenticated(true)
      localStorage.setItem('isAuthenticated', 'true')
      setCollaborator(response)
      if (response?.profile === 'ADMIN') {
        navigate('/management')
      }
    } catch (err: any) {
      setProfile(null)
      setIsAuthenticated(false)
      localStorage.setItem('isAuthenticated', 'false')
    }
  }

  return {
    handleLogin,
    handleAdminLogin,
    isLoginPending,
    isLoading,
  }
}
