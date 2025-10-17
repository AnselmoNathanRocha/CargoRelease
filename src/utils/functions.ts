import { AxiosError } from "axios";
import dayjs from "dayjs";

const keepOnlyNumbers = (text: string) => {
  return text.replace(/\D/g, "");
}

const formatDate = (
  date?: Date | string,
  format = "YYYY-MM-DD",
): string | undefined => {
  if (!date) {
    return undefined;
  }
  return dayjs(date).format(format);
}

const extractMessageFromAxiosErrorOrDefault = (
  error: any,
  defaultMessage: string,
) => {
  if (error instanceof AxiosError && error.response?.data) {
    return error.response.data.error ?? error.response.data.message;
  }

  return defaultMessage;
}

const noOp: () => void = () => null;

const calculatePageNumbersToShow = (
  maxVisibleButtons: number,
  totalPages: number,
  actualPage: number,
) => {
  let maxLeft = actualPage - Math.floor(maxVisibleButtons / 2);
  let maxRight = totalPages + Math.floor(maxVisibleButtons / 2);

  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = maxVisibleButtons;
  }

  maxRight = maxLeft + (maxVisibleButtons - 1);

  if (maxRight > totalPages) {
    maxRight = totalPages;
    maxLeft = Math.max(totalPages - maxVisibleButtons + 1, 1);
  }

  return {
    maxLeft: maxLeft,
    maxRight: maxRight,
  };
}

const removeAccents = (text?: string) => {
  return text?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const simpleSearch = (text = "", search = "") =>
  removeAccents(text)!
    .toLowerCase()
    .includes(removeAccents(search)!.toLowerCase());

const onlyFirstLetterCapitalized = (text: string) => {
  return text.charAt(0).toUpperCase() + text.toLowerCase().slice(1);
}

const getDeep = (source: any, property: string) => {
  return property.split(".").reduce((actual, prop) => actual?.[prop], source);
}

export {
  keepOnlyNumbers,
  formatDate,
  extractMessageFromAxiosErrorOrDefault,
  noOp,
  calculatePageNumbersToShow,
  simpleSearch,
  onlyFirstLetterCapitalized,
  getDeep,
}