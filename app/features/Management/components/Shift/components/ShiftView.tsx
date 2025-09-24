import { Center, Flex, Image, Text } from "@chakra-ui/react";
import { LuRefreshCw } from "react-icons/lu";
import type { ColumnsDef } from "../../../../../types/columnDef.type";
import { useMemo, useState } from "react";
import {
  useCreateShiftQuery,
  useFetchAllCollaboratorQuery,
  useFetchShiftsQuery,
  useUpdateShiftQuery,
} from "../ShiftQuerries";
import type { InputDefinition } from "../../../../../types/baseInput.type";
import CustomButton from "../../../../../components/shared/CustomButton";
import { addIcon } from "../../../../../components/icons";
import { CustomSelect } from "../../../../../components/shared/CustomSelect";
import { CustomInput } from "../../../../../components/shared/CustomInput";
import CustomLoadingSpinner from "../../../../../components/shared/CustomLoadingSpinner";
import { TableBackoffice } from "../../../../../components/shared/Table";
import CustomPagination from "../../../../../components/shared/Pagination";
import PopUp from "../../../../../components/shared/PopUp";

const columnsDef: ColumnsDef = [
  { accessorKey: "lastname", header: "Nom", center: true },
  { accessorKey: "firstname", header: "Prénom", center: true },
  {
    accessorKey: "serialNumber",
    header: "Le numéro de série de la machine",
    center: true,
  },
  { accessorKey: "shiftDate", header: "Date de pointage", center: true },
  { accessorKey: "shiftHour", header: "Heure de pointage", center: true },
  { accessorKey: "sens", header: "Sens", center: true },
  { accessorKey: "actions", header: "Action", center: true },
];

const params = {
  collaboratorId: "",
  status: "",
  startDate: "",
  endDate: "",
};

export function ShiftView() {
  const [filter, setFilter] = useState<any>(params);
  const [modalType, setModalType] = useState<"CREATE" | "UPDATE" | undefined>();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const currentFilter = filter;

  const createShiftMutate = useCreateShiftQuery();
  const updateShiftMutate = useUpdateShiftQuery();

  const {
    data: shiftData,
    isLoading: isLoadingShiftData,
    refetch,
  } = useFetchShiftsQuery({
    ...currentFilter,
    currentPage: currentPage,
    size: 10,
  });

  const { data: collaboratorData, isLoading: isLoadingCollaboratorData } =
    useFetchAllCollaboratorQuery();

  const handleDropDownChange = (name: string, value: string | number) => {
    setFilter((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmCreate = async (formValues: Record<string, any>) => {
    await createShiftMutate
      .mutateAsync({
        shiftDate: formValues.shiftDate,
        shiftHour: formValues.shiftHour,
        collaboratorId: formValues.collaboratorId,
        status: formValues.status,
      })
      .then(() => {
        refetch();
        handleCloseConfirmModal();
      });
  };

  const handleConfirmUpdate = async (formValues: Record<string, any>) => {
    await updateShiftMutate
      .mutateAsync({
        id: formValues.id,
        shiftDate: formValues.shiftDate,
        shiftHour: formValues.shiftHour,
        collaboratorId: formValues.collaborator.id,
        status: formValues.status,
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
        shiftDate: rowData.shiftDate,
        shiftHour: rowData.shiftHour,
        collaboratorId: rowData.collaborator?.id,
        collaborator: rowData?.collaborator,
        status: rowData.status,
      });
    }
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setModalType(undefined);
    setFormValues({});
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleReset = () => {
    setFilter(params);
    setCurrentPage(1);
  };

  const listInput: InputDefinition[] = useMemo(() => {
    return [
      {
        id: "collaboratorId",
        type: "select",
        label: "Collaborateur*",
        placeholder: "Sélectionner un collaborateur",
        span: "span 1",
        options: collaboratorData,
        isLoading: isLoadingCollaboratorData,
        isDisabled: modalType === "UPDATE",
      },
      {
        id: "shiftDate",
        type: "text",
        typeInput: "date",
        label: "Date de pointage*",
        placeholder: "",
        span: "span 1",
      },
      {
        id: "shiftHour",
        type: "text",
        typeInput: "time",
        label: "Heure de pointage*",
        placeholder: "",
        span: "span 1",
      },
      {
        id: "status",
        type: "radio",
        label: "Sens*",
        placeholder: "",
        options: [
          { label: "Entrée", value: "ENTREE" },
          { label: "Sortie", value: "SORTIE" },
        ],
      },
    ];
  }, [collaboratorData, isLoadingCollaboratorData, modalType]);

  return (
    <>
      <Flex flexDirection={"column"} gap={"12px"} w={"100%"}>
        <Flex
          justifyContent={"end"}
          alignItems={"start"}
          w={"100%"}
          mt={"-63px"}
          mb={"20px"}
        >
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
              {"Ajouter un pointage"}
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
            label={"Collaborateur"}
            placeholder={"Sélectionner"}
            data={collaboratorData}
            selectedValue={filter.collaboratorId}
            withSearch={true}
            isLoading={isLoadingCollaboratorData}
            onChange={(e) => handleDropDownChange("collaboratorId", e)}
          />
          <CustomInput
            label={"Date"}
            placeholder={"Type here"}
            value={filter.startDate}
            type={"date"}
            onChange={(e) => handleDropDownChange("startDate", e.target.value)}
          />
          <CustomInput
            placeholder={"Type here"}
            value={filter.endDate}
            type={"date"}
            onChange={(e) => handleDropDownChange("endDate", e.target.value)}
          />
          <CustomSelect
            label={"Sens"}
            placeholder={"Sélectionner"}
            data={[
              { value: "ENTREE", label: "Entrée" },
              { value: "SORTIE", label: "Sortie" },
            ]}
            selectedValue={filter.status}
            withSearch={true}
            onChange={(e) => handleDropDownChange("status", e)}
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
        {isLoadingShiftData ? (
          <Flex justifyContent={"center"} alignItems={"center"} w={"100%"}>
            <CustomLoadingSpinner />
          </Flex>
        ) : (
          <TableBackoffice
            columnsDef={columnsDef}
            dataTable={shiftData?.content}
            onUpdateClick={(row) => handleOpenConfirmModal("UPDATE", row)}
          />
        )}
        <Center marginTop={"1rem"}>
          <CustomPagination
            onPageChange={handlePageChange}
            totalElements={shiftData?.totalElements}
            currentPage={currentPage}
          />
        </Center>
      </Flex>
      <PopUp
        title={
          modalType === "CREATE"
            ? "Ajouter un nouveau pointage"
            : "Update un pointage"
        }
        message={"Veuillez remplir les champs en dessous"}
        btnMessage={
          modalType === "CREATE" ? "Ajouter un pointage" : "Update un pointage"
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
