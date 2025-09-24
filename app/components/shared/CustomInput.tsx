import { Field, Input } from "@chakra-ui/react";

interface CustomInputProps {
  label?: string;
  placeholder: string;
  value?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomInput = ({
  placeholder,
  label,
  value,
  isDisabled,
  isRequired,
  type,
  onChange,
}: CustomInputProps) => {
  return (
    <Field.Root required disabled={isDisabled}>
      {label && (
        <Field.Label fontWeight={"600"} fontSize={"14px"} color={"#454545"}>
          {label} {isRequired && <Field.RequiredIndicator color={"#454545"} />}
        </Field.Label>
      )}
      <Input
        placeholder={placeholder}
        type={type ?? "text"}
        value={value}
        backgroundColor={"white"}
        onChange={onChange}
      />
    </Field.Root>
  );
};
