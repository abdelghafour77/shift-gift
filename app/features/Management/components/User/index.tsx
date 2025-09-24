import { Center, Flex, Image, Text } from "@chakra-ui/react";
import type { ColumnsDef } from "../../../../types/columnDef.type";
import { TableBackoffice } from "../../../../components/shared/Table";
import CustomLoadingSpinner from "../../../../components/shared/CustomLoadingSpinner";
import CustomButton from "../../../../components/shared/CustomButton";
import PopUp from "../../../../components/shared/PopUp";
import { useMemo, useState } from "react";
import type { InputDefinition } from "../../../../types/baseInput.type";
import { addIcon } from "../../../../components/icons";
import CustomPagination from "../../../../components/shared/Pagination";
import {
  useCreateCollaboratorQuery,
  useFetchCollaboratorsQuery,
  useUpdateCollaboratorQuery,
  useUpdateStateCollaboratorQuery,
} from "./CollaboratorQuerries";
import { useFetchAllMachineQuery } from "../Machine/MachineQuerries";
import { CustomSelect } from "../../../../components/shared/CustomSelect";
import { LuRefreshCw } from "react-icons/lu";

const columnsDef: ColumnsDef = [
  { accessorKey: "lastname", header: "Nom", center: true },
  { accessorKey: "firstname", header: "Prénom", center: true },
  { accessorKey: "profile", header: "Profile", center: true },
  {
    accessorKey: "serialNumber",
    header: "Le numéro de série de la machine",
    center: true,
  },
  { accessorKey: "username", header: "Username", center: true },
  { accessorKey: "active", header: "Status", center: true },
  { accessorKey: "actions", header: "Action", center: true },
];

const params = {
  profile: "",
  active: "",
};

export function CollaboratorPage() {
  const [filter, setFilter] = useState<any>(params);
  const [modalType, setModalType] = useState<"CREATE" | "UPDATE" | undefined>();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedProfile, setSelectedProfile] = useState<string | undefined>();
  const currentFilter = filter;

  const createCollaboratorMutate = useCreateCollaboratorQuery();
  const updateCollaboratorMutate = useUpdateCollaboratorQuery();
  const updateCollaboratorStateMutate = useUpdateStateCollaboratorQuery();

  const {
    data: collaboratorData,
    isLoading: isLoadingCollaboratorData,
    refetch,
  } = useFetchCollaboratorsQuery({
    ...currentFilter,
    currentPage: currentPage,
    size: 10,
  });

  const {
    data: machineData,
    isLoading: isLoadingMachineData,
    refetch: refetchMachines,
  } = useFetchAllMachineQuery();

  const handleDropDownChange = (name: string, value: string | number) => {
    setFilter((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmCreate = async (formValues: Record<string, any>) => {
    await createCollaboratorMutate
      .mutateAsync({
        lastname: formValues.lastname,
        firstname: formValues.firstname,
        username: formValues.username,
        password: formValues.password,
        active: formValues.active,
        profile: formValues.profile,
        serialNumber: formValues?.machine?.serialNumber,
        machine: { serialNumber: formValues.serialNumber },
      })
      .then(() => {
        refetch();
        refetchMachines();
        handleCloseConfirmModal();
      });
  };

  const handleConfirmUpdate = async (formValues: Record<string, any>) => {
    await updateCollaboratorMutate
      .mutateAsync({
        id: formValues.id,
        lastname: formValues.lastname,
        firstname: formValues.firstname,
        username: formValues.username,
        password: formValues.password,
        active: formValues.active,
        profile: formValues.profile,
        serialNumber: formValues?.machine?.serialNumber,
        machine: { serialNumber: formValues.serialNumber },
      })
      .then(() => {
        refetch();
        handleCloseConfirmModal();
      });
  };

  const handleOpenConfirmModal = (type: "CREATE" | "UPDATE", rowData?: any) => {
    setIsConfirmModalOpen(true);
    setModalType(type);
    if (type === "UPDATE" && rowData) {
      setFormValues({
        id: rowData.id,
        lastname: rowData.lastname,
        firstname: rowData.firstname,
        username: rowData.username,
        password: rowData.password,
        active: rowData.active,
        profile: rowData.profile,
        serialNumber: rowData?.machine?.serialNumber,
        machine: { serialNumber: rowData.machine },
      });

      setSelectedProfile(rowData.profile);
    }
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setModalType(undefined);
    setFormValues({});
    setSelectedProfile(undefined);
  };

  const handleRequestToggle = async (item: any, checked: boolean) => {
    await updateCollaboratorStateMutate
      .mutateAsync({
        id: item.id,
        enabled: checked,
      })
      .then(() => {
        refetch();
        handleCloseConfirmModal();
      });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleReset = () => {
    setFilter(params);
    setCurrentPage(1);
  };

  const listInput: InputDefinition[] = useMemo(() => {
    const baseFields: InputDefinition[] = [
      {
        id: "firstname",
        type: "text",
        label: "Prénom*",
        placeholder: "Ecrire ici",
        span: "span 1",
      },
      {
        id: "lastname",
        type: "text",
        label: "Nom*",
        placeholder: "Ecrire ici",
        span: "span 1",
      },
      {
        id: "profile",
        type: "radio",
        label: "Profile*",
        placeholder: "",
        options: [
          { label: "Collaborateur", value: "COLLABORATOR" },
          { label: "Admin", value: "ADMIN" },
        ],
      },
      {
        id: "active",
        type: "radio",
        label: "Status*",
        placeholder: "",
        options: [
          { label: "Active", value: "true" },
          { label: "Inactive", value: "false" },
        ],
        span: "span 1",
      },
    ];

    const collaboratorFields: InputDefinition[] = [
      {
        id: "serialNumber",
        type: "select",
        label: "Le numéro de série de la machine*",
        placeholder: "Sélectionner une machine",
        span: "span 2",
        options: machineData,
        isLoading: isLoadingMachineData,
        isDisabled: modalType === "UPDATE",
      },
    ];

    const adminFields: InputDefinition[] = [
      {
        id: "username",
        type: "text",
        typeInput: "email",
        label: "Username*",
        placeholder: "Ecrire ici",
        span: "span 1",
        isDisabled: modalType === "UPDATE",
      },
    ];

    const adminPswdFields: InputDefinition[] = [
      {
        id: "password",
        type: "text",
        typeInput: "password",
        label: "Mot de passe*",
        placeholder: "Ecrire ici",
        span: "span 1",
      },
    ];

    if (selectedProfile === "COLLABORATOR") {
      return [...baseFields, ...collaboratorFields];
    }
    if (selectedProfile === "ADMIN") {
      if (modalType === "CREATE") {
        return [...baseFields, ...adminFields, ...adminPswdFields];
      } else {
        return [...baseFields, ...adminFields];
      }
    }

    return baseFields;
  }, [machineData, isLoadingMachineData, modalType, selectedProfile]);

  return (
    <>
      <Flex flexDirection={"column"} gap={"12px"} w={"100%"}>
        <Flex justifyContent={"space-between"}>
          <Text
            fontSize={"18px"}
            fontWeight={"700"}
            textTransform={"uppercase"}
            color={"#B02736"}
          >
            Liste des collaborateurs
          </Text>
          <CustomButton
            background={
              "linear-gradient(94.28deg, #B02736 10.37%, #634959 107.35%)"
            }
            p={"10px 16px"}
            gap={"8px"}
            borderRadius={"52px"}
            boxShadow={"0px 2px 2px 0px #00000040 inset"}
            textTransform={"none"}
            onClick={() => handleOpenConfirmModal("CREATE")}
          >
            <Image src={addIcon} />
            <Text color={"#F7F7F7"} fontWeight={"600"} fontSize={"13px"}>
              {"Ajouter un collaborateur"}
            </Text>
          </CustomButton>
        </Flex>

        <Flex
          w={"100%"}
          justifyContent={"start"}
          gap={"10px"}
          alignItems={"end"}
        >
          <CustomSelect
            label={"Profile"}
            placeholder={"Sélectionner"}
            data={[
              { value: "COLLABORATOR", label: "Collaborateur" },
              { value: "ADMIN", label: "Administrateur" },
            ]}
            selectedValue={filter.profile}
            withSearch={true}
            onChange={(e) => handleDropDownChange("profile", e)}
          />
          <CustomSelect
            label={"Status"}
            placeholder={"Sélectionner"}
            data={[
              { value: "true", label: "Active" },
              { value: "false", label: "Inactive" },
            ]}
            selectedValue={filter.active}
            withSearch={true}
            onChange={(e) => handleDropDownChange("active", e)}
          />
          <CustomButton
            color="white"
            fontWeight="400"
            bgColor={"RAM.purple"}
            w={"fit-content"}
            fontSize={"11px"}
            textTransform={"none"}
            borderRadius={"2px"}
            h={"40px"}
            boxShadow={"0px 2px 2px 0px #00000040 inset"}
            onClick={handleReset}
          >
            <LuRefreshCw color="white" />
            {"Réinitialiser"}
          </CustomButton>
        </Flex>
        {isLoadingCollaboratorData ? (
          <Flex justifyContent={"center"} alignItems={"center"} w={"100%"}>
            <CustomLoadingSpinner />
          </Flex>
        ) : (
          <TableBackoffice
            columnsDef={columnsDef}
            dataTable={collaboratorData?.content}
            withSwitch={true}
            onUpdateClick={(row) => handleOpenConfirmModal("UPDATE", row)}
            onToggleSwitch={(item: any, checked: boolean) =>
              handleRequestToggle(item, checked)
            }
          />
        )}
        <Center marginTop={"1rem"}>
          <CustomPagination
            onPageChange={handlePageChange}
            totalElements={collaboratorData?.totalElements}
            currentPage={currentPage}
          />
        </Center>
      </Flex>
      <PopUp
        title={
          modalType === "CREATE"
            ? "Ajouter un nouveau collaborateur"
            : "Update un collaborateur"
        }
        message={"Veuillez remplir les champs en dessous"}
        btnMessage={
          modalType === "CREATE"
            ? "Ajouter un collaborateur"
            : "Update un collaborateur"
        }
        isOpen={isConfirmModalOpen}
        listInput={listInput}
        initialValues={formValues}
        onSubmit={
          modalType === "CREATE" ? handleConfirmCreate : handleConfirmUpdate
        }
        onClose={handleCloseConfirmModal}
        onProfileChange={(profile) => setSelectedProfile(profile)}
      />
    </>
  );
}
