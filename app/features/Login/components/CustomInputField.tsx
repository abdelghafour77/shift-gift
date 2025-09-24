import { useState, type ChangeEventHandler } from "react";
import {
  Box,
  Input,
  InputGroup,
  IconButton,
  type InputGroupProps,
} from "@chakra-ui/react";
import { SolarEye, MdiEye } from "../../../components/icons";

interface Props extends Omit<InputGroupProps, "children" | "onChange"> {
  type: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  icon: React.ReactNode;
  showPasswordToggle?: boolean;
}

export function CustomInputField({
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  showPasswordToggle = false,
  ...groupProps
}: Props) {
  const [show, setShow] = useState(false);
  const inputType = showPasswordToggle ? (show ? "text" : "password") : type;

  return (
    <InputGroup
      w="100%"
      h={10}
      overflow="visible"
      startElement={<Box>{icon}</Box>}
      endElement={
        showPasswordToggle && (
          <IconButton
            variant="ghost"
            size="sm"
            onClick={() => setShow((prev) => !prev)}
            aria-label={
              show ? "Masquer le mot de passe" : "Afficher le mot de passe"
            }
          >
            {show ? <MdiEye boxSize="6" /> : <SolarEye boxSize="5" />}
          </IconButton>
        )
      }
      {...groupProps}
    >
      <Input
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </InputGroup>
  );
}
