import { Center, Flex, Image, Text } from "@chakra-ui/react";
import type { ColumnsDef } from "../../../../types/columnDef.type";
import { TableBackoffice } from "../../../../components/shared/Table";
import CustomLoadingSpinner from "../../../../components/shared/CustomLoadingSpinner";
import CustomButton from "../../../../components/shared/CustomButton";
import PopUp from "../../../../components/shared/PopUp";
import { useMemo, useState } from "react";
import type { InputDefinition } from "../../../../types/baseInput.type";
import {
  useCreateMachineQuery,
  useFetchMachinesQuery,
  useUpdateMachineQuery,
  useUpdateStateMachineQuery,
} from "./MachineQuerries";
import { addIcon } from "../../../../components/icons";
import CustomPagination from "../../../../components/shared/Pagination";

const columnsDef: ColumnsDef = [
  {
    accessorKey: "serialNumber",
    header: "Le numéro de série de la machine",
    center: true,
  },
  { accessorKey: "active", header: "Status", center: true },
  { accessorKey: "actions", header: "Action", center: true },
];

export function MachinePage() {
  const [modalType, setModalType] = useState<"CREATE" | "UPDATE" | undefined>();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  const createMachineMutate = useCreateMachineQuery();
  const updateMachineMutate = useUpdateMachineQuery();
  const updateMachineStateMutate = useUpdateStateMachineQuery();

  const {
    data: machineData,
    isLoading: isLoadingMachineData,
    refetch,
  } = useFetchMachinesQuery({
    currentPage: currentPage,
    size: 10,
  });

  const handleConfirmCreate = async (formValues: Record<string, any>) => {
    await createMachineMutate
      .mutateAsync({
        serialNumber: formValues.serialNumber,
        active: formValues.active,
      })
      .then(() => {
        refetch();
        handleCloseConfirmModal();
      });
  };

  const handleConfirmUpdate = async (formValues: Record<string, any>) => {
    await updateMachineMutate
      .mutateAsync({
        serialNumber: formValues.serialNumber,
        active: formValues.active,
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
        serialNumber: rowData.serialNumber,
        active: rowData.active,
      });
    }
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setModalType(undefined);
    setFormValues({});
  };

  const handleRequestToggle = async (item: any, checked: boolean) => {
    await updateMachineStateMutate
      .mutateAsync({
        id: item.serialNumber,
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

  const listInput: InputDefinition[] = useMemo(
    () => [
      {
        id: "serialNumber",
        type: "text",
        label: "Le numéro de série de la machine",
        placeholder: "Ecrire ici",
        span: "span 1",
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
    ],
    []
  );

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
            Liste des machines
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
              {"Ajouter une machine"}
            </Text>
          </CustomButton>
        </Flex>
        {isLoadingMachineData ? (
          <Flex justifyContent={"center"} alignItems={"center"} w={"100%"}>
            <CustomLoadingSpinner />
          </Flex>
        ) : (
          <TableBackoffice
            columnsDef={columnsDef}
            dataTable={machineData?.content}
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
            totalElements={machineData?.totalElements}
            currentPage={currentPage}
          />
        </Center>
      </Flex>
      <PopUp
        title={
          modalType === "CREATE"
            ? "Ajouter une nouvelle machine"
            : "Update une machine"
        }
        message={"Veuillez remplir les champs en dessous"}
        btnMessage={
          modalType === "CREATE" ? "Ajouter une machine" : "Update une machine"
        }
        isOpen={isConfirmModalOpen}
        listInput={listInput}
        initialValues={formValues}
        onSubmit={
          modalType === "CREATE" ? handleConfirmCreate : handleConfirmUpdate
        }
        onClose={handleCloseConfirmModal}
      />
    </>
  );
}
