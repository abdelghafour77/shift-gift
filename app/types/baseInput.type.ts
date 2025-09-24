export type InputType = "select" | "multi-select" | "text" | "number" | "radio";

interface BaseInput<T extends InputType> {
  id: string;
  type: T;
  label: string;
  placeholder: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isVirtual?: boolean;
  span?: string;
}
//RadioInput
export interface RadioInput extends BaseInput<"radio"> {
  options: { label: string; value: string }[];
}

// SELECT
export interface SelectInput extends BaseInput<"select"> {
  options: { label: string; value: string }[];
  onChange?: (value: any) => void;
}

// MULTI-SELECT
export interface MultiSelectInput extends BaseInput<"multi-select"> {
  options: { id: number; option: string }[];
}

// TEXT
export interface TextInput extends BaseInput<"text"> {
  value?: string;
  typeInput?: string;
}

// NUMBER
export interface NumberInput extends BaseInput<"number"> {
  value?: number;
}

// Final input union
export type InputDefinition =
  | SelectInput
  | MultiSelectInput
  | TextInput
  | RadioInput
  | NumberInput;
