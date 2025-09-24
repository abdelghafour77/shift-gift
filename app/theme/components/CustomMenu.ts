import { defineSlotRecipe } from "@chakra-ui/react";
import { menuAnatomy } from "@chakra-ui/react/anatomy";

export const customMenuSlotRecipe = defineSlotRecipe({
  slots: menuAnatomy.keys(),

  base: {
    trigger: {
      w: "100%",
      border: "1px solid #DDDDDD",
      bg: "#FBFBFB",
      p: "12px 16px",
      borderRadius: "5px",
      _hover: {
        borderBottom: "1px solid #DDDDDD",
      },
      _focus: {
        borderBottom: "1px solid #DDDDDD",
      },
    },
    indicator: { color: "RAM.purple" },
    positioner: {
      width: "88%",
      padding: "none",
      zIndex: "10000",
      bg: "#FBFBFB !important",
      mt: "-8px",
      borderTopRadius: "none",
      borderBottomRadius: "5px",
      border: "{1px solid #DDDDDD}",
      _hover: {
        bg: "#FBFBFB",
      },
    },
    content: {},
  },
});
