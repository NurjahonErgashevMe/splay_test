/// <reference types="vite-plugin-svgr/client" />

//icons
import ArrowLeftIcon from "public/assets/icons/icon_arrow-left.svg?react";
import ArrowRightIcon from "public/assets/icons/icon_arrow-right.svg?react";
import SaveIcon from "public/assets/icons/icon_save.svg?react";
import PlayIcon from "public/assets/icons/icon_play.svg?react";
import PlayWhiteIcon from "public/assets/icons/icon_play--white.svg?react";
import { TIconNames } from "@/types/shared/icons";
import { TSVG } from "@/types/shared/svg";

type TIcons = Record<TIconNames, TSVG>;

const getIcon = (icon: TIconNames) => {
  const ICONS: TIcons = {
    ARROW_LEFT: ArrowLeftIcon,
    ARROW_RIGHT: ArrowRightIcon,
    SAVE: SaveIcon,
    PLAY: PlayIcon,
    "PLAY--WHITE": PlayWhiteIcon,
  };

  return ICONS[icon];
};

export default getIcon;
