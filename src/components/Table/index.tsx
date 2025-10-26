import { useScrollBlocker } from "@/hooks/use-scroll-blocker";
import { PageWithoutContent } from "@/models/pagination";
import { cn } from "@/utils/cn";
import { getDeep } from "@/utils/functions";
import { Filter } from "lucide-react";
import { ReactNode, useRef } from "react";
import { Loader } from "../Loader";
import { Overlay } from "../Overlay";
import { Pagination } from "../Pagination";

interface Identifiable {
  id: string;
}

export interface TableHeader<T> {
  property: keyof T | ({} & string);
  label: string;
  columnClassName?: string;
  customElement?: (item: T) => ReactNode;
}

interface TableProps<T> {
  data: T[];
  headers: TableHeader<T>[];
  pagination?: PageWithoutContent | null;
  emptyComponent?: ReactNode;
  onChangePage: (pagina: number) => void;
  loading?: boolean;
}

export function Table<T extends Identifiable>({
  data,
  headers,
  pagination,
  emptyComponent,
  onChangePage,
  loading,
}: TableProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollBlocker({ element: containerRef.current, blocked: !!loading });

  if (!pagination?.totalElements) {
    return loading ? (
      <Overlay>
        <Loader className="size-12 text-blue-700"/>
      </Overlay>
    ) : (
      (emptyComponent ?? (
        <p className="flex flex-col items-center justify-center gap-2 py-16 text-center text-lg text-gray-500">
          <Filter size={80} />
          <span>Nenhum resultado encontrado.</span>
        </p>
      ))
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="relative m-4 min-h-[48dvh] flex-1 overflow-auto rounded-md border border-gray-400 bg-white shadow-md"
      >
        <table className="w-full">
          <thead className="sticky top-0 bg-white shadow">
            <tr className="border-b border-gray-400 uppercase">
              {headers.map(({ label, columnClassName }) => (
                <th
                  key={label}
                  className={cn(
                    "px-4 py-2.5 text-left text-sm font-semibold text-gray-700",
                    columnClassName,
                  )}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b border-zinc-100 transition-all duration-200 ease-in-out"
              >
                {headers.map(
                  ({ property, customElement, columnClassName }, index) => (
                    <td
                      key={index}
                      className={cn("px-4 py-2 text-sm", columnClassName)}
                    >
                      {customElement
                        ? customElement(item)
                        : getDeep(item, property as string)}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {loading && (
          <Overlay>
            <Loader className="size-12 text-blue-700"/>
          </Overlay>
        )}
      </div>

      <div className={cn({ "pointer-events-none opacity-50": loading })}>
        <Pagination pagination={pagination} onChangePage={onChangePage} />
      </div>
    </>
  );
}