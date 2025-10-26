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

const prependIfNotExists = <T extends { id: number }>(
  array: T[],
  item?: T | null,
  minLength?: number,
): T[] => {
  if (!item) return array;

  if (minLength !== undefined && array.length < minLength) {
    return array;
  }

  if (array.some(({ id }) => id === item.id)) {
    return array;
  }

  return [item, ...array];
}

const getNumberOrDefault = (value: string | null, defaultValue: number) => {
  const parsedValue = Number(value);
  return !value || isNaN(parsedValue) ? defaultValue : parsedValue;
}

const isDate = (obj: any) => {
  return Object.prototype.toString.call(obj) === "[object Date]";
}

const hasData = (data: any) => {
  if (!data) return false;

  if (Array.isArray(data)) {
    return data.length > 0;
  }

  if (typeof data === "object") {
    return JSON.stringify(data) !== "{}";
  }

  return !!data;
}

const removeEmptyProperties = (
  obj: Record<string, any>,
): Record<string, any> => {
  if (!obj || typeof obj !== "object" || isDate(obj)) {
    return obj;
  }

  return Object.entries(obj)
    .filter(([_, value]) => hasData(removeEmptyProperties(value)))
    .reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, any>,
    );
}

const toDeep = (source: Record<string, any>, prefix?: string) => {
  return Object.entries(source)
    .filter(([_, value]) => hasData(removeEmptyProperties(value)))
    .reduce(
      (acc, [key, value]) => {
        if (typeof value === "object" && !isDate(value)) {
          acc = {
            ...acc,
            ...toDeep(value, `${prefix ? prefix + "." : ""}${key}`),
          };
        } else {
          acc[`${prefix ? prefix + "." : ""}${key}`] = value;
        }
        return acc;
      },
      {} as Record<string, any>,
    );
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
  prependIfNotExists,
  getNumberOrDefault,
  toDeep,
  removeEmptyProperties,
}