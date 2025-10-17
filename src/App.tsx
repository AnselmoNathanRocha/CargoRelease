import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";

import "dayjs/locale/pt-br";

import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/contexts";
import { Routes } from "@/routes";

dayjs.locale("pt-br");
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(duration);

export function App() {
  return (
    <div className="size-full">
      <Providers>
        <Routes />
      </Providers>

      <Toaster richColors />
    </div>
  );
}