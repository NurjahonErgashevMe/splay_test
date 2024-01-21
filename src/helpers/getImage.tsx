/// <reference types="vite-plugin-svgr/client" />

//icons
import SPlayLogo from "public/assets/images/LOGO.svg?react";
import AmediatekaLogo from "public/assets/images/amediateka.svg?react";
import StartLogo from "public/assets/images/start.svg?react";
import PremierLogo from "public/assets/images/premier.png";
import { TSVG } from "@/types/shared/svg";
import { ImageNames } from "@/types/shared/imagesNames";

type TImages = Record<ImageNames, TSVG | string>;

const getImage = (image: ImageNames) => {
  const IMAGES: TImages = {
    AMEDIATEKA: AmediatekaLogo,
    LOGO: SPlayLogo,
    START: StartLogo,
    PREMIER: PremierLogo,
  };

  return IMAGES[image];
};

export default getImage;
