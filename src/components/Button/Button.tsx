import { FC, HTMLProps } from "react";

import s from "./button.module.scss";

import { TIconNames } from "@/types/shared/icons";
import getIcon from "@/helpers/getIcon";
import Colors from "@/shared/color";
import clsx from "clsx";
import ElementShower from "../ElementShower/ElementShower";

interface Icon {
  name: TIconNames;
  fill?: keyof typeof Colors | string;
  stroke?: string;
}

interface ButtonProps extends Partial<HTMLProps<HTMLButtonElement>> {
  icon?: Icon;
  className?: string;
  styleVariant?: "white--orange-onHover" | "orange" | "white";
  type?: "submit" | "reset" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({
  icon,
  className,
  children,
  styleVariant = "white",
  ...props
}) => {
  const MyIcon = icon?.name ? getIcon(icon.name) : "svg";

  return (
    <button {...props} className={clsx(s.button, s[styleVariant], className)}>
      <ElementShower show={!!icon?.name}>
        <MyIcon fill={icon?.fill} stroke={icon?.stroke} className={s.icon} />
      </ElementShower>
      {children}
    </button>
  );
};

export default Button;
