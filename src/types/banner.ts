import { Genries } from "./shared/genries";

interface Banner {
  id: string;
  description: string;
  year: number;
  countries: string[];
  genries: Genries[];
  trailer: string;
  logo?: string;
  fromAge: number;
}

type Banners = Banner[];

export type { Banner, Banners };
