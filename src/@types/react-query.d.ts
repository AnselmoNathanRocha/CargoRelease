import { ProblemDetails } from "@/models/problem-details";
import { AxiosError } from "axios";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<ProblemDetails?>;
  }
}