import {
  Alert as ShadAlert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Info, OctagonX } from "lucide-react";

export default function Alert({ variant, title, description }: any) {
  return (
    <ShadAlert variant={variant}>
      {variant == "destructive" && <OctagonX className="h-4 w-4" />}
      {variant == "important" && <Info className="h-4 w-4" />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </ShadAlert>
  );
}
