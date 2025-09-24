import { useMutation, useQuery } from "@tanstack/react-query";
import type { Machine } from "../../../../types/machine.type";
import { publicApi } from "../../../../config/publicApi";
import { toaster } from "../../../../components/shared/toaster";

export const fetchMachinesApi = async ({ queryKey }: any) => {
  try {
    const [, filter] = queryKey;
    const res = await publicApi.get(
      `/machine/pagination?size=${filter.size}&page=${filter.currentPage - 1}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllMachineApi = async () => {
  try {
    const res = await publicApi.get(`/machine`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createMachineApi = async (payload: Machine) => {
  try {
    const { data } = await publicApi.post(`/machine/create`, payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateMachineApi = async (payload: Machine) => {
  try {
    const { data } = await publicApi.post(
      `/machine/update/${payload.serialNumber}`,
      payload
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateStateMachineApi = async (payload: {
  id: string;
  enabled: boolean;
}) => {
  try {
    const { data } = await publicApi.post(
      `/machine/state/${payload.id}?enabled=${payload.enabled}`,
      payload
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const useFetchMachinesQuery = (params: any) => {
  return useQuery({
    queryKey: ["page-machine", params],
    queryFn: fetchMachinesApi,
  });
};

export const useFetchAllMachineQuery = () => {
  return useQuery({
    queryKey: ["all-machine"],
    queryFn: fetchAllMachineApi,
    select: (data: any) =>
      data?.map((item: any) => ({
        value: item.serialNumber,
        label: item?.serialNumber,
      })),
  });
};

export const useCreateMachineQuery = () => {
  return useMutation({
    mutationFn: createMachineApi,
    onSuccess: () => {
      toaster.create({
        type: "success",
        title: "Création réussie !",
        description: "Nouvelle machine a bien été ajoutée.",
        meta: { closable: false },
      });
    },
    onError: () => {
      toaster.create({
        type: "error",
        title: "Échec de création d’une machine",
        description:
          "Impossible de créer la machine, vérifiez les informations saisies.",
        meta: { closable: false },
      });
    },
  });
};

export const useUpdateMachineQuery = () => {
  return useMutation({
    mutationFn: updateMachineApi,
    onSuccess: () => {
      toaster.create({
        type: "success",
        title: "Modification réussie !",
        description: "Vos changements ont été appliqués",
        meta: { closable: false },
      });
    },
    onError: () => {
      toaster.create({
        type: "error",
        title: "échec de modification",
        description: "Impossible de sauvegarder vos modifications.",
        meta: { closable: false },
      });
    },
  });
};

export const useUpdateStateMachineQuery = () => {
  return useMutation({
    mutationFn: updateStateMachineApi,
    onSuccess: () => {
      toaster.create({
        type: "success",
        title: "Modification réussie !",
        description: "Vos changements ont été appliqués",
        meta: { closable: false },
      });
    },
    onError: () => {
      toaster.create({
        type: "error",
        title: "échec de modification",
        description: "Impossible de sauvegarder vos modifications.",
        meta: { closable: false },
      });
    },
  });
};
