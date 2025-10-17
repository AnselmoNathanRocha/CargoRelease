import { ExternalToast, toast } from "sonner";

class ToastService {
  success(message: string, data?: ExternalToast) {
    toast.success(message, data);
  }

  error(message: string, data?: ExternalToast) {
    toast.error(message, data);
  }
}

export const toastService = new ToastService();