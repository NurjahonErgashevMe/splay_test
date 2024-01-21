import { PictureSizes } from ".";
import { ImageNames } from "./shared/imagesNames";

interface MovieContent {
  id: number;
  is_serial: boolean;
  is_russian: boolean;
  poster_h: Partial<PictureSizes>;
  is_new: boolean;
  rating: number;
  age_restrictions: number;
  company?: ImageNames;
}

interface Movie {
  id: number;
  icon: string;
  name: string;
  contents: MovieContent[];
}

type Movies = Movie[];

export type { Movie, MovieContent, Movies };
