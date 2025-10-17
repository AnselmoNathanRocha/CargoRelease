export interface ProblemDetails {
  status: number;
  message: string;
  errors?: Record<string, string>;
}