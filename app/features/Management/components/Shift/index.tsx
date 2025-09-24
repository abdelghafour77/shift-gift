import { useMemo } from "react";
import { CustomSwitch } from "../../../../components/shared/CustomSwitch";
import { ShiftView } from "./components/ShiftView";
import { DurationView } from "./components/DurationView";

export function ShiftPage() {
  const listTabs = useMemo(
    () => [
      {
        id: "shifts",
        title: "Liste des pointages",
        component: <ShiftView />,
      },
      {
        id: "durations",
        title: "Liste des durées",
        component: <DurationView />,
      },
    ],
    []
  );
  return <CustomSwitch listTabs={listTabs} />;
}
