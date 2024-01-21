import { PictureSizes } from "./shared/pictureSizes";

interface Collection {
  id: number;
  title: string;
  picture: Partial<PictureSizes>;
}

type Collections = Collection[];

export type { Collection, Collections };
