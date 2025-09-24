import { Button, type ButtonProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface CustomButtonProps extends ButtonProps {
  children: ReactNode;
}

function CustomButton({ children, ...rest }: CustomButtonProps) {
  return (
    <Button
      fontSize={"xs"}
      h={"fit-content"}
      w={"fit-content"}
      py={1.5}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
