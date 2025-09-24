import { Center, Flex } from "@chakra-ui/react";
import { LuRefreshCw } from "react-icons/lu";
import type { ColumnsDef } from "../../../../../types/columnDef.type";
import { useState } from "react";
import {
  useFetchAllCollaboratorQuery,
  useFetchShiftDurationQuery,
} from "../ShiftQuerries";
import CustomButton from "../../../../../components/shared/CustomButton";
import { CustomSelect } from "../../../../../components/shared/CustomSelect";
import { CustomInput } from "../../../../../components/shared/CustomInput";
import CustomLoadingSpinner from "../../../../../components/shared/CustomLoadingSpinner";
import { TableBackoffice } from "../../../../../components/shared/Table";
import CustomPagination from "../../../../../components/shared/Pagination";

const today = new Date().toISOString().split("T")[0];

const columnsDef: ColumnsDef = [
  { accessorKey: "lastname", header: "Nom", center: true },
  { accessorKey: "firstname", header: "Prénom", center: true },
  {
    accessorKey: "machineSerial",
    header: "Le numéro de série de la machine",
    center: true,
  },
  {
    accessorKey: "morningCheckIn",
    header: "Entrée matin",
    center: true,
  },
  {
    accessorKey: "lunchCheckOut",
    header: "Sortie déjeuner",
    center: true,
  },
  {
    accessorKey: "lunchCheckIn",
    header: "Entrée déjeuner",
    center: true,
  },
  {
    accessorKey: "eveningCheckOut",
    header: "Sortie soir",
    center: true,
  },
  {
    accessorKey: "omission",
    header: "Cas d'omission",
    center: true,
  },
  {
    accessorKey: "durationFormatted",
    header: "Durée de travail",
    center: true,
  },
];

const params = {
  collaboratorId: "",
  date: today,
};

export function DurationView() {
  const [filter, setFilter] = useState<any>(params);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const currentFilter = filter;

  const { data: durationData, isLoading: isLoadingShiftData } =
    useFetchShiftDurationQuery({
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleReset = () => {
    setFilter(params);
    setCurrentPage(1);
  };

  return (
    <Flex flexDirection={"column"} gap={"12px"} w={"100%"}>
      <Flex w={"100%"} justifyContent={"start"} gap={"10px"} alignItems={"end"}>
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
          value={filter.date}
          type={"date"}
          onChange={(e) => handleDropDownChange("date", e.target.value)}
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
        <Flex maxWidth={"1400px"} margin={"auto"} w={"100%"}>
          <TableBackoffice
            columnsDef={columnsDef}
            dataTable={durationData?.content}
          />
        </Flex>
      )}
      <Center marginTop={"1rem"}>
        <CustomPagination
          onPageChange={handlePageChange}
          totalElements={durationData?.totalElements}
          currentPage={currentPage}
        />
      </Center>
    </Flex>
  );
}
