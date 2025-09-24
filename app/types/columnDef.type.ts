type ColumnsDef = ColumnDef[];
type ColumnDef = {
  accessorKey: string;
  header: string;
  width?: string;
  center?: boolean;
  color?: string;
  fontWeight?: string;
};

export type { ColumnDef, ColumnsDef };
