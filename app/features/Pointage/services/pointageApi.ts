import { publicApi } from '../../../config/publicApi'
import type { Collaborator } from '../../../types'
import type { Machine } from '../../../types/machine.type'

export interface CreateShiftResponse {
  collaborator: Collaborator
  machine: Machine
  status: 'ENTREE' | 'SORTIE'
  shiftDate: string
}

export async function createShiftApi(SN: string) {
  const { data } = await publicApi.post<CreateShiftResponse>(`/shift/create/${SN}`)

  return data
}

export async function fetchShiftsApi({ queryKey }: any) {
  const [, filter, SN] = queryKey

  const { data } = await publicApi.get<{
    content: CreateShiftResponse[]
    totalElements: number
  }>(
    `/shift/collaborator/${SN}?size=${filter?.size}&page=${filter?.currentPage - 1}&startDate=${filter?.startDate}&endDate=${filter?.endDate}`
  )

  return data
}

export async function fetchDurationApi(SN: string) {
  const { data } = await publicApi.get<{
    duration: string
  }>(`/collaborator/duration/${SN}`)

  return data
}
