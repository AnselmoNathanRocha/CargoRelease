import dayjs from "dayjs";
import { registerService } from "@/services/register-service";
import { toastService } from "@/services/toast-service";

// IDs disponíveis para responsibleId
const responsibleIds = [
  "72dc7cb0-6df8-4030-b733-97e87d37266a",
  "9eb34b0f-edd0-4949-ae20-76a465e9337f",
  "abd423a4-082f-4940-8edf-c0edf33c9b72",
  "19b25cf8-9202-4ec8-b8ce-c867e2a0ddb3",
  "5c9556a6-5e01-48e1-b1e1-2d872631784e",
  "d95f5a10-c898-4f23-882f-0d857f76cd77",
  "46683001-f448-45b5-b2b7-683683de2b26",
];

// Gera 25 registros fake no formato desejado
function generateFakeRegisters() {
  const fakeRegisters = [];
  for (let i = 1; i <= 25; i++) {
    const responsibleId = responsibleIds[Math.floor(Math.random() * responsibleIds.length)];
    fakeRegisters.push({
      date: dayjs().subtract(i, "day").format("YYYY-MM-DD"),
      productDescription: `EMULSÃO LIGHT COLOR ${i} VOLUMES`,
      productCode: `PI-${5000 + i}`,
      opNumber: 71867 + i,
      batch: `0${12842000 + i}`,
      coa: false,
      viscosity: i % 3 === 0 ? null : Number((1 + Math.random() * 2).toFixed(2)),
      hydrogenPotential: Number((2 + Math.random() * 2).toFixed(2)),
      density: Number((2 + Math.random() * 2).toFixed(2)),
      active: `${(Math.random() * 5).toFixed(1)}`,
      hours: `${String(Math.floor(Math.random() * 24)).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2,"0")}`,
      notes: "",
      responsibleId,
    });
  }
  return fakeRegisters;
}

// Delay helper
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Popula o DB lentamente, parando no primeiro erro
export async function populateFakeRegistersSlowly() {
  const fakeRegisters = generateFakeRegisters();

  for (const reg of fakeRegisters) {
    try {
      await registerService.create(reg);
      console.log(`Registro OP ${reg.opNumber} criado com sucesso!`);
    } catch (error: any) {
      console.error(`Erro ao criar OP ${reg.opNumber}:`, error.message);
      toastService.error(`Erro ao criar OP ${reg.opNumber}: ${error.message}`);
      break; // para a execução ao primeiro erro
    }
    await delay(1000); // espera 1 segundo antes de criar o próximo
  }

  toastService.success("Processo de criação de registros fake finalizado!");
}
