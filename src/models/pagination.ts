import { DEFAULT_PAGE_SIZE } from "@/utils/constants";

export type PageWithoutContent = Omit<Page<unknown>, "content">;

export interface Page<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface IPageable {
  page: number;
  size?: number;
  sort?: string;
}

export class Pageable implements IPageable {
  page: number;
  size: number;
  sort?: string;

  constructor({ page, size, sort }: IPageable) {
    this.page = page ?? 0;
    this.size = size ?? DEFAULT_PAGE_SIZE;
    this.sort = sort;
  }
}