import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { PageWithoutContent } from "@/models/pagination";
import { calculatePageNumbersToShow, noOp } from "@/utils/functions";

const MAX_PAGINATION_NUMBERS_TO_SHOW = 5;

interface TablePaginationProps {
  pagination?: PageWithoutContent;
  onChangePage: (page: number) => void;
}

export function Pagination({ pagination, onChangePage }: TablePaginationProps) {
  if (!pagination || pagination.totalElements <= 0) {
    return null;
  }

  const { page: actualPage, totalPages, totalElements } = pagination;

  const isFirstPage = actualPage === 0;
  const isLastPage = actualPage === totalPages - 1;

  const { maxLeft } = calculatePageNumbersToShow(
    MAX_PAGINATION_NUMBERS_TO_SHOW,
    totalPages,
    actualPage + 1,
  );

  const pagesNumberToRender = Array.from({
    length: Math.min(totalPages, MAX_PAGINATION_NUMBERS_TO_SHOW),
  }).map((_, page) => page + maxLeft - 1);

  return (
    <div className="p-4 pt-0">
      <div className="flex w-full flex-col items-center justify-between gap-2 rounded-lg border border-gray-400 bg-white p-1 px-4 text-sm sm:flex-row">
        <span className="whitespace-nowrap">
          PAG {actualPage + 1} DE {totalPages}
        </span>

        <div className="flex gap-1">
          <button
            type="button"
            className={`cursor-pointer flex h-8 w-8 items-center justify-center rounded-md transition-all ${isFirstPage ? "cursor-default text-gray-400" : "hover:scale-125"}`}
            onClick={isFirstPage ? noOp : () => onChangePage(0)}
          >
            <ChevronsLeft size={16} />
          </button>

          <button
            type="button"
            className={`cursor-pointer flex h-8 w-8 items-center justify-center rounded-md transition-all ${isFirstPage ? "cursor-default text-gray-400" : "hover:scale-125"}`}
            onClick={isFirstPage ? noOp : () => onChangePage(actualPage - 1)}
          >
            <ChevronLeft size={16} />
          </button>

          {pagesNumberToRender.map((page) => {
            const isActualPage = page === actualPage;

            return (
              <button
                type="button"
                key={page}
                className={`cursor-pointer flex h-8 w-8 items-center justify-center rounded-md transition-all ${
                  isActualPage
                    ? "border-2 border-blue-700 bg-blue-700 font-bold text-white"
                    : "bg-gray-300 hover:font-bold"
                }`}
                onClick={isActualPage ? noOp : () => onChangePage(page)}
              >
                {page + 1}
              </button>
            );
          })}

          <button
            type="button"
            className={`cursor-pointer flex h-8 w-8 items-center justify-center rounded-md transition-all ${isLastPage ? "cursor-default text-gray-400" : "hover:scale-125"}`}
            onClick={isLastPage ? noOp : () => onChangePage(actualPage + 1)}
          >
            <ChevronRight size={16} />
          </button>

          <button
            type="button"
            className={`cursor-pointer flex h-8 w-8 items-center justify-center rounded-md transition-all ${isLastPage ? "cursor-default text-gray-400" : "hover:scale-125"}`}
            onClick={isLastPage ? noOp : () => onChangePage(totalPages - 1)}
          >
            <ChevronsRight size={16} />
          </button>
        </div>

        <span className="whitespace-nowrap">{totalElements} RESULTADOS</span>
      </div>
    </div>
  );
}