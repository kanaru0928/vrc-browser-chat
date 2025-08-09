import { useState } from "react";
import { Button } from "./ui/button";
import { Info } from "lucide-react";
import { AppInfoDialog } from "./app-info-dialog";
import { useTranslation } from "react-i18next";

export function AppInfoButton() {
  const [isAppInfoOpen, setIsAppInfoOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Button
        variant="ghost"
        className="cursor-pointer"
        onClick={() => setIsAppInfoOpen(true)}
      >
        <Info size={16} />
        {t("appInfoButton")}
      </Button>
      <AppInfoDialog open={isAppInfoOpen} onOpenChange={setIsAppInfoOpen} />
    </>
  );
}
