import {
  Register,
  RegisterFilter,
  RegisterData,
} from "@/models/register";
import { Page, Pageable } from "@/models/pagination";
import { httpClient } from "./http-client";

class RegisterService {
  async getAll({
    term,
    page,
    size,
  }: RegisterFilter): Promise<Page<Register>> {
    const { data } = await httpClient.get("/register", {
      params: {
        term,
        ...new Pageable({ page, size }),
      },
    });
    return data;
  }

  async create(data: RegisterData) {
    await httpClient.post("/register", data);
  }

  async update(id: string, data: RegisterData) {
    await httpClient.put(`/register/${id}`, data);
  }

  async delete(id: string) {
    await httpClient.delete(`/register/${id}`);
  }
}

export const registerService = new RegisterService();