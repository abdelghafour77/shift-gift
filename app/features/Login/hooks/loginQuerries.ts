import { useMutation } from '@tanstack/react-query'
import { login, loginAdmin } from '../services/authApi'

export const useLoginQuery = () => {
  return useMutation({
    mutationFn: (SN: string) => login(SN),
  })
}

export const useLoginAdminQuery = () => {
  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) => loginAdmin(username, password),
  })
}
