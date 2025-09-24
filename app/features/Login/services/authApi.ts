import { publicApi } from '../../../config/publicApi'
import type { Collaborator } from '../../../types'

export async function login(SN: string) {
  const { data } = await publicApi.post<Collaborator>(`/auth/${SN}`)
  return data
}

export async function loginAdmin(username: string, password: string) {
  const { data } = await publicApi.post(`/auth/admin`, { username, password })

  return data
}
