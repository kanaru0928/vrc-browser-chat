import { CheckCircle2, RefreshCcw } from "lucide-react";
import { Alert } from "./ui/alert";
import { Button } from "./ui/button";

export function Status() {
  return (
    <div>
      <Alert className="text-emerald-300 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} />
          Server is running
        </div>
        <div>
          <Button size="icon">
            <RefreshCcw size={16} />
          </Button>
        </div>
      </Alert>
    </div>
  );
}
