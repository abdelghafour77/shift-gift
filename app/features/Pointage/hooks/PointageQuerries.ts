import { useMutation, useQuery } from '@tanstack/react-query'
import { createShiftApi, fetchDurationApi, fetchShiftsApi, type CreateShiftResponse } from '../services/pointageApi'
import { extractDate, extractTime } from '../../../utils/trannsformDate'
import type { Shift } from '../../../types'

export const useCreateShiftQuery = (SN: string) => {
  return useMutation({
    mutationFn: () => createShiftApi(SN),
  })
}

export const useFetchShiftsQuery = (params: any) => {
  return useQuery<
    { content: CreateShiftResponse[]; totalElements: any },
    Error,
    { content: Shift[]; totalElements: any }
  >({
    queryKey: ['collaborator-shifts', params, params.SN],
    queryFn: fetchShiftsApi,
    select: (data) => {
      const transformedContent = data.content.map((shift) => ({
        ...shift,
        shiftDate: extractDate(shift.shiftDate),
        shiftHour: extractTime(shift.shiftDate),
        sens: shift.status,
      }))

      return {
        content: transformedContent,
        totalElements: data.totalElements || 0,
      }
    },
  })
}

export const useFetchDurationQuery = (SN: string) => {
  return useQuery({
    queryKey: ['collaborator-duration'],
    queryFn: () => fetchDurationApi(SN),
  })
}
