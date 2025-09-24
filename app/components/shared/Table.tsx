import { Flex, Image, Table, Switch, Center, Box } from "@chakra-ui/react";
import { useEffect, useState, type ReactNode } from "react";
import type { ColumnDef, ColumnsDef } from "../../types/columnDef.type";
import { editIcon } from "../../assets/svg";
import { FailedIcon, StatusIcon } from "../icons";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

export interface TableRow {
  [key: string]: ReactNode | string | number | boolean | undefined;
}

interface TableBackofficeProps {
  columnsDef: ColumnsDef;
  dataTable: any[];
  onDeleteClick?: (rowData: any) => void;
  onUpdateClick?: (rowData: any) => void;
  withSwitch?: boolean;
  onToggleSwitch?: (rowData: any, checked: boolean) => void;
  isSettingTable?: boolean;
}

export const TableBackoffice = ({
  columnsDef,
  dataTable,
  onDeleteClick,
  onUpdateClick,
  withSwitch = false,
  onToggleSwitch,
  isSettingTable,
}: TableBackofficeProps) => {
  const [data, setData] = useState<TableRow[]>([]);

  useEffect(() => {
    const rows = dataTable?.map((r: any) => {
      const isChecked =
        r?.active === true || r?.sens === "ENTREE" || r?.omission === true;
      return {
        ...r,
        actions: r.customActions ?? (
          <Flex justifyContent="center" gap={2}>
            {/*  Update */}
            <Image
              src={editIcon}
              cursor="pointer"
              onClick={() => onUpdateClick?.(r)}
            />
            {/*  Switch */}
            {withSwitch && (
              <Switch.Root
                key={`switch-${r.id}-${isChecked}`}
                size="sm"
                checked={isChecked}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleSwitch?.(r, !isChecked);
                }}
              >
                <Switch.HiddenInput />
                <Switch.Control _checked={{ bg: "green.500" }}>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch.Root>
            )}
          </Flex>
        ),
        active: (
          <Center>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"52px"}
              w={"fit-content"}
              p={"1px 8px"}
              gap={"5px"}
              fontSize={"12px"}
              fontWeight={"600"}
              bg={isChecked === true ? "#CEEFCE" : "#FEE6E6"}
              color={isChecked === true ? "#008000" : "#FF2C2C"}
              textTransform={"uppercase"}
            >
              {isChecked === true ? (
                <StatusIcon size={14} color="#008000" />
              ) : (
                <FailedIcon boxSize={5} color="#FF2C2C" />
              )}
              {isChecked === true ? "active" : "inactive"}
            </Flex>
          </Center>
        ),
        sens: (
          <Center>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"52px"}
              w={"fit-content"}
              p={"1px 8px"}
              gap={"5px"}
              fontSize={"12px"}
              fontWeight={"600"}
              bg={isChecked === true ? "#CEEFCE" : "#FEE6E6"}
              color={isChecked === true ? "#008000" : "#FF2C2C"}
              textTransform={"uppercase"}
            >
              {isChecked === true ? (
                <LuArrowLeft color={"#008000"} size={14} />
              ) : (
                <LuArrowRight size={14} color="#FF2C2C" />
              )}
              {isChecked === true ? "Entrée" : "Sortie"}
            </Flex>
          </Center>
        ),
        durationFormatted: (
          <Center>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"52px"}
              w={"fit-content"}
              p={"1px 8px"}
              gap={"5px"}
              fontSize={"12px"}
              fontWeight={"600"}
              bg={r.durationHours > 8 ? "#CEEFCE" : "#FEE6E6"}
              color={r.durationHours > 8 ? "#008000" : "#FF2C2C"}
            >
              {r.durationFormatted}
            </Flex>
          </Center>
        ),
        omission: (
          <Center>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"52px"}
              w={"fit-content"}
              p={"1px 8px"}
              gap={"5px"}
              fontSize={"12px"}
              fontWeight={"600"}
              bg={isChecked === true ? "#FEE6E6" : ""}
              color={isChecked === true ? "#FF2C2C" : ""}
              textTransform={"uppercase"}
            >
              {isChecked === true && <LuArrowRight size={14} color="#FF2C2C" />}
              {isChecked === true ? "Omission de Sortie" : "-"}
            </Flex>
          </Center>
        ),
      };
    });
    setData(rows);
  }, [dataTable, onDeleteClick, onUpdateClick, withSwitch, onToggleSwitch]);

  return (
    <Box borderRadius={"10px"} w={"100%"} backgroundColor={"white"} p={"5px"}>
      <Table.Root size="sm" interactive striped>
        <Table.Header borderBottom="1.5px solid #B9B9B9 !important">
          <Table.Row>
            {columnsDef.map((item: ColumnDef) => (
              <Table.ColumnHeader
                key={item.accessorKey}
                fontWeight="600"
                fontSize="14px"
                color="#454545"
                w={item.width}
                h={"50px"}
                textAlign={item.center ? "center" : "start"}
              >
                {item.header}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.map((row, rowIndex) => (
            <Table.Row key={rowIndex}>
              {columnsDef.map((column, colIndex) => (
                <Table.Cell
                  key={colIndex}
                  h={"40px"}
                  color={
                    column?.color
                      ? column.color
                      : column.accessorKey === "service" ||
                          column.accessorKey === "price"
                        ? "rgba(0, 139, 96, 1)"
                        : column.accessorKey === "serviceStatus"
                          ? row[column.accessorKey] === "REQUESTED"
                            ? "#FFA500"
                            : row[column.accessorKey] === "PAID"
                              ? "#0066CC"
                              : row[column.accessorKey] === "ISSUED"
                                ? "#008000"
                                : "#333"
                          : isSettingTable
                            ? "rgba(69, 69, 69, 1)"
                            : "#333333"
                  }
                  fontWeight={
                    column.accessorKey === "pnr" ||
                    column.accessorKey === "serviceStatus"
                      ? "600"
                      : isSettingTable
                        ? "600"
                        : "500"
                  }
                  fontSize={isSettingTable ? "12px" : "13px"}
                  style={{
                    maxWidth: column.width ? column.width : "fit-content",
                    minWidth: column.width ? column.width : "fit-content",
                    textAlign: column.center ? "center" : "start",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row[column.accessorKey] ?? "-"}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};
