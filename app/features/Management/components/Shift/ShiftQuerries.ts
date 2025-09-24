import { useMutation, useQuery } from '@tanstack/react-query'
import type { ShiftRequest } from '../../../../types/shift.type'
import { publicApi } from '../../../../config/publicApi'
import { toaster } from '../../../../components/shared/toaster'
import { extractDate, extractTime, parseDuration } from '../../../../utils/trannsformDate'

export const fetchShiftsApi = async ({ queryKey }: any) => {
  try {
    const [, filter] = queryKey
    const res = await publicApi.get(
      `/shift/pagination?size=${filter?.size}&page=${filter?.currentPage - 1}&collaboratorId=${filter?.collaboratorId}&status=${filter?.status}&startDate=${filter?.startDate}&endDate=${filter?.endDate}`
    )
    return res.data
  } catch (error) {
    throw error
  }
}

export const createShiftApi = async (payload: ShiftRequest) => {
  try {
    const { data } = await publicApi.post(`/shift`, payload)
    return data
  } catch (error) {
    throw error
  }
}

export const fetchShiftDurationApi = async ({ queryKey }: any) => {
  try {
    const [, filter] = queryKey
    const res = await publicApi.get(
      `/shift/durations?size=${filter?.size}&page=${filter?.currentPage - 1}&collaboratorId=${filter?.collaboratorId}&date=${filter?.date}`
    )
    return res.data
  } catch (error) {
    throw error
  }
}

export const updateShiftApi = async (payload: ShiftRequest) => {
  try {
    const { data } = await publicApi.post(`/shift/update/${payload.id}`, payload)
    return data
  } catch (error) {
    throw error
  }
}

export const fetchAllActiveCollaboratorApi = async () => {
  try {
    const res = await publicApi.get(`/collaborator/active`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const fetchAllCollaboratorApi = async () => {
  try {
    const res = await publicApi.get(`/collaborator`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const useFetchShiftsQuery = (params: any) => {
  return useQuery({
    queryKey: ['page-shift', params],
    queryFn: fetchShiftsApi,

    select: (data: any) => {
      const transformedContent = data?.content?.map((item: any) => ({
        ...item,
        lastname: item?.collaborator?.lastname,
        firstname: item?.collaborator?.firstname,
        shiftDate: extractDate(item?.shiftDate),
        shiftHour: extractTime(item?.shiftDate),
        sens: item?.status,
        serialNumber: item?.machine?.serialNumber,
      }))

      return {
        content: transformedContent,
        totalElements: data?.totalElements || 0,
      }
    },
  })
}

export const useCreateShiftQuery = () => {
  return useMutation({
    mutationFn: createShiftApi,
    onSuccess: () => {
      toaster.create({
        type: 'success',
        title: 'Création réussie !',
        description: 'Nouveau pointage a bien été ajoutée.',
        meta: { closable: false },
      })
    },
    onError: () => {
      toaster.create({
        type: 'error',
        title: 'Échec de création d’un pointage',
        description: 'Impossible de créer le pointage, vérifiez les informations saisies.',
        meta: { closable: false },
      })
    },
  })
}

export const useFetchShiftDurationQuery = (params: any) => {
  return useQuery({
    queryKey: ['page-shift-duration', params],
    queryFn: fetchShiftDurationApi,

    select: (data: any) => {
      const transformedContent = data?.content?.map((item: any) => ({
        ...item,
        durationFormatted: parseDuration(item?.durationMinutes)?.formatted,
        durationHours: parseDuration(item?.durationMinutes)?.hours,
        morningCheckIn: extractTime(item?.morningCheckIn),
        eveningCheckOut: extractTime(item?.eveningCheckOut),
        lunchCheckOut: extractTime(item?.lunchCheckOut),
        lunchCheckIn: extractTime(item?.lunchCheckIn),
      }))

      return {
        content: transformedContent,
        totalElements: data?.totalElements || 0,
      }
    },
  })
}

export const useUpdateShiftQuery = () => {
  return useMutation({
    mutationFn: updateShiftApi,
    onSuccess: () => {
      toaster.create({
        type: 'success',
        title: 'Modification réussie !',
        description: 'Vos changements ont été appliqués',
        meta: { closable: false },
      })
    },
    onError: () => {
      toaster.create({
        type: 'error',
        title: 'échec de modification',
        description: 'Impossible de sauvegarder vos modifications.',
        meta: { closable: false },
      })
    },
  })
}

export const useFetchAllActiveCollaboratorQuery = () => {
  return useQuery({
    queryKey: ['all-active-collaborator'],
    queryFn: fetchAllActiveCollaboratorApi,
    select: (data: any) =>
      data?.map((item: any) => ({
        value: item.id,
        label: `${item?.firstname} ${item?.lastname}`,
      })),
  })
}

export const useFetchAllCollaboratorQuery = () => {
  return useQuery({
    queryKey: ['all-collaborator'],
    queryFn: fetchAllCollaboratorApi,
    select: (data: any) =>
      data?.map((item: any) => ({
        value: item.id,
        label: `${item?.firstname} ${item?.lastname}`,
      })),
  })
}
