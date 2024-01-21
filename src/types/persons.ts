import { PictureSizes } from "./shared/pictureSizes";

interface Person {
  id: number;
  picture: Partial<PictureSizes>;
  name: string;
}

type Persons = {
  count: number;
  results: Person[];
};

export type { Person, Persons };
