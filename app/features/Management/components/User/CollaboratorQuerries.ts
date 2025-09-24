import { useMutation, useQuery } from "@tanstack/react-query";
import type { Collaborator } from "../../../../types/collaborator.type";
import { publicApi } from "../../../../config/publicApi";
import { toaster } from "../../../../components/shared/toaster";

export const fetchCollaboratorsApi = async ({ queryKey }: any) => {
  try {
    const [, filter] = queryKey;
    const res = await publicApi.get(
      `/collaborator/pagination?size=${filter.size}&page=${filter.currentPage - 1}&profile=${filter.profile}&active=${filter.active}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createCollaboratorApi = async (payload: Collaborator) => {
  try {
    const { data } = await publicApi.post(`/collaborator/create`, payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateCollaboratorApi = async (payload: Collaborator) => {
  try {
    const { data } = await publicApi.post(
      `/collaborator/update/${payload.id}`,
      payload
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateStateCollaboratorApi = async (payload: {
  id: string;
  enabled: boolean;
}) => {
  try {
    const { data } = await publicApi.post(
      `/collaborator/state/${payload.id}?enabled=${payload.enabled}`,
      payload
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const useFetchCollaboratorsQuery = (params: any) => {
  return useQuery({
    queryKey: ["page-collaborator", params],
    queryFn: fetchCollaboratorsApi,

    select: (data: any) => {
      const transformedContent = data?.content?.map((item: any) => ({
        ...item,
        serialNumber: item?.machine?.serialNumber,
      }));

      return {
        content: transformedContent,
        totalElements: data?.totalElements || 0,
      };
    },
  });
};

export const useCreateCollaboratorQuery = () => {
  return useMutation({
    mutationFn: createCollaboratorApi,
    onSuccess: () => {
      toaster.create({
        type: "success",
        title: "Création réussie !",
        description: "Nouveau collaborateur a bien été ajoutée.",
        meta: { closable: false },
      });
    },
    onError: () => {
      toaster.create({
        type: "error",
        title: "Échec de création d’un collaborateur",
        description:
          "Impossible de créer le collaborateur, vérifiez les informations saisies.",
        meta: { closable: false },
      });
    },
  });
};

export const useUpdateCollaboratorQuery = () => {
  return useMutation({
    mutationFn: updateCollaboratorApi,
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

export const useUpdateStateCollaboratorQuery = () => {
  return useMutation({
    mutationFn: updateStateCollaboratorApi,
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
