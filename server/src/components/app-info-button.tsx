import { useState } from "react";
import { Button } from "./ui/button";
import { Info } from "lucide-react";
import { AppInfoDialog } from "./app-info-dialog";

export function AppInfoButton() {
  const [isAppInfoOpen, setIsAppInfoOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" className="cursor-pointer" onClick={() => setIsAppInfoOpen(true)}>
        <Info size={16} />
        アプリ情報
      </Button>
      <AppInfoDialog open={isAppInfoOpen} onOpenChange={setIsAppInfoOpen} />
    </>
  );
}
