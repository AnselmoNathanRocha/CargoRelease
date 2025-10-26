import { httpClient } from "./http-client";
import { CreateResponsibleData, Responsible, ResponsibleFilter } from "@/models/responsible";

class ResponsibleService {
  async getAll(filter?: ResponsibleFilter): Promise<Responsible[]> {
    const { data } = await httpClient.get("/responsible", {
      params: filter ? {
        name: filter.name,
      } : {},
    });
    return data;
  }

  async create(data: CreateResponsibleData) {
    await httpClient.post("/responsible", data);
  }

  async delete(id: string) {
    await httpClient.delete(`/responsible/${id}`);
  }
}

export const responsibleService = new ResponsibleService();