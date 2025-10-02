
export type CepResult = {
  cep: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade: string;
  uf: string;
  ddd?: string;
  erro?: boolean;
};
export type WeatherResult = { temperatureC: number | null; weatherText?: string };
export type HistoryRecord = {
  tsISO: string;
  cep: string;
  cidade: string;
  estado: string;
  temperatureC: number | null;
};
