import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    color: "white",
    rounded: "3xl",
    textTransform: "uppercase",
    fontWeight: 400,
  },
  variants: {
    variant: {
      primary: {
        bgGradient: "linear-gradient(to right, #B02736, #634959)",
      },

      secondary: {
        bgColor: "#F2EDF0",
        color: "RAM.purple",
        border: "1px solid",
        borderColor: "RAM.purple",
      },

      tertiary: {
        bgColor: "RAM.purple",
      },

      quaternary: {
        textAlign: "left",
        borderColor: "#EEEEEE",
        borderWidth: "1px",
        bgColor: "white",
        border: "1px solid #EEEEEE",
        color: "black",
      },

      quinary: {
        textAlign: "left",
        bgGradient: "linear-gradient(to right, #B02736, #634959)",
        color: "white",
        fontWeight: 600,
      },

      disabled: {
        bg: "#AAAAAA",
        color: "white",
        boxShadow: "0px 2px 2px 0px #00000040 inset",
      },

      inputButton: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: "1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F9F7F5",
        w: "54px",
        h: "40px",
        borderLeftRadius: "5px",
        borderRightRadius: "0",
        border: "1px solid #EEEEEE",
        borderRight: "none",
        p: "0",
        _hover: { border: "none" },
        _active: { border: "none" },
        _focus: { boxShadow: "none", outline: "none", border: "none" },
      },
    },
  },
});
