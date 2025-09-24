import { defineSlotRecipe } from "@chakra-ui/react";
import { selectAnatomy } from "@chakra-ui/react/anatomy";

export const customSelectSlotRecipe = defineSlotRecipe({
  slots: selectAnatomy.keys(),

  base: {
    root: {
      width: "100%",
      "--select-trigger-height": "none",
    },
    label: {
      color: "#454545",
      fontWeight: "600",
      fontSize: "14px",
    },
    control: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      w: "100%",
      border: "1px solid #DDDDDD",
      bg: "#FBFBFB",
      borderRadius: "5px",
      _hover: {
        bg: "#F2F2F2",
      },
      _expanded: {
        bg: "#FBFBFB",
        "--mix-background": "unset",
      },
    },
    trigger: {},
    valueText: {
      flexGrow: 1,
      textAlign: "start",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    indicatorGroup: {},
    content: {
      width: "100%",
      bg: "#FBFBFB !important",
      borderRadius: "0 0 5px 5px",
      border: "1px solid #DDDDDD",
      mt: 1,
    },
    item: {
      p: "8px",
      bg: "#FBFBFB",
      _hover: {
        bg: "#F2F2F2",
      },
    },
  },

  variants: {
    variant: {
      default: {
        control: {
          p: "12px 16px",
        },
        valueText: {
          fontSize: "13px",
          textTransform: "capitalize",
          ml: "30px",
        },
      },
      compact: {
        control: {
          p: "8px 12px",
        },
        valueText: {
          fontSize: "13px",
          textTransform: "capitalize",
        },
      },
      monitoring: {
        control: {
          p: "12px 16px",
          bg: "white",
          _focus: {
            border: "1px solid #BDBDBD",
            boxShadow: "0 0 0 1px #BDBDBD",
          },
          _active: {
            border: "1px solid #BDBDBD",
            boxShadow: "0 0 0 1px #BDBDBD",
          },
        },
        valueText: {
          fontSize: "13px",
          textTransform: "capitalize",
          ml: "30px",
        },
      },
    },
    filled: {
      false: {
        valueText: {
          fontStyle: "italic",
        },
      },
      true: {
        valueText: {
          fontStyle: "normal",
        },
      },
    },
  },

  defaultVariants: {
    filled: false,
    variant: "default",
  },
});
