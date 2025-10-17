import { AxiosResponse } from "axios";

export abstract class BaseService {
  private prepareDownloadFile(response: AxiosResponse<Blob>) {
    const contentDisposition = response.headers["content-disposition"] ?? "";
    const contentType =
      response.headers["content-type"] ?? "application/octet-stream";

    const match = contentDisposition.match(
      /filename\*=UTF-8''(.+)|filename="?([^"]+)"?/,
    );
    const filename = decodeURIComponent(match?.[1] ?? match?.[2] ?? "file");

    return {
      data: response.data,
      filename,
      contentType,
    };
  }

  protected downloadFile(axiosResponse: AxiosResponse<Blob>) {
    const { data, filename, contentType } =
      this.prepareDownloadFile(axiosResponse);

    const blob = new Blob([data], { type: contentType });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  }

  protected openFile(axiosResponse: AxiosResponse<Blob>) {
    const { data, contentType } = this.prepareDownloadFile(axiosResponse);

    const blob = new Blob([data], { type: contentType });
    const url = URL.createObjectURL(blob);

    window.open(url, "_blank", "noopener,noreferrer");

    URL.revokeObjectURL(url);
  }
}