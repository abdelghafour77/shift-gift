import { createSystem, defaultConfig } from "@chakra-ui/react";
import colors from "./colors";
import fonts from "./typography";
import { buttonRecipe } from "./components/Button";
import { customTabsSlotRecipe } from "./components/Customtabs";
import { customSelectSlotRecipe } from "./components/CustomSelect";
import { customMenuSlotRecipe } from "./components/CustomMenu";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: { colors, fonts },
    recipes: {
      button: buttonRecipe,
    },
    slotRecipes: {
      tabs: customTabsSlotRecipe,
      select: customSelectSlotRecipe,
      menu: customMenuSlotRecipe,
    },
  },
});
