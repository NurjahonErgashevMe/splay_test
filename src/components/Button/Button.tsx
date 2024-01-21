import { FC } from "react";

import s from "./button.module.scss";

import { TIconNames } from "@/types/shared/icons";
import getIcon from "@/helpers/getIcon";
import Colors from "@/shared/color";
import clsx from "clsx";

interface Icon {
  name: TIconNames;
  fill?: keyof typeof Colors | string;
  stroke?: string | keyof typeof Colors;
}

type ButtonHTMLProp = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface ButtonProps extends ButtonHTMLProp {
  icon: Icon;
  className?: string;
  variant: keyof typeof Colors | "white--orange-onHover";
}

const Button: FC<ButtonProps> = ({
  icon,
  className,
  children,
  variant,
  ...props
}) => {
  const {
    stroke: iconStroke = "whiteColor",
    name,
    fill: fillColor = "whiteColor",
  } = icon;

  const MyIcon = getIcon(name) ?? <></>;

  return (
    <button className={clsx(s.button, s[variant], className)} {...props}>
      <MyIcon
        fill={fillColor ?? Colors?.[fillColor]}
        stroke={iconStroke ?? Colors?.[iconStroke]}
        className={s.icon}
      />
      {children}
    </button>
  );
};

export default Button;
