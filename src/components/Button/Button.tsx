import { FC } from "react";

import s from "./button.module.scss";

import { TIconNames } from "@/types/shared/icons";
import getIcon from "@/helpers/getIcon";
import Colors from "@/shared/color";
import clsx from "clsx";
import ElementShower from "../ElementShower/ElementShower";

import {
  Button as MantineButton,
  ButtonProps as MantineButtonProps,
} from "@mantine/core";

interface Icon {
  name: TIconNames;
  fill?: keyof typeof Colors | string;
  stroke?: string;
}

interface ButtonProps extends MantineButtonProps {
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
  type,
  ...props
}) => {
  const MyIcon = icon ? getIcon(icon.name) : "svg";

  return (
    <MantineButton
      type={type}
      {...props}
      className={clsx(s.button, s[styleVariant], className)}
    >
      <ElementShower show={!!icon}>
        <MyIcon fill={icon?.fill} stroke={icon?.stroke} className={s.icon} />
      </ElementShower>
      {children}
    </MantineButton>
  );
};

export default Button;
