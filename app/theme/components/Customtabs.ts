import { defineSlotRecipe } from "@chakra-ui/react";
import { tabsAnatomy } from "@chakra-ui/react/anatomy";

export const customTabsSlotRecipe = defineSlotRecipe({
  slots: tabsAnatomy.keys(),
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    list: {
      display: "flex",
      gap: "16px",
    },
    trigger: {},
    indicator: {
      display: "none !important",
    },
    content: {
      borderTop: "1px solid #A6A6A6",
      borderBottomRadius: "10px",
      w: "100%",
      bgSize: "cover",
      boxShadow: "4px 0px 12px 0px #EAEAEA",
      borderX: "1px solid #B4936033",
      borderBottom: "1px solid #B4936033",
      bgColor: "#F9F7F5",
      padding: "30px 50px !important",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
});
