import { FC, HTMLProps, ReactNode } from "react";
import s from "./breadcrumb.module.scss";
import clsx from "clsx";
interface BreadcrumbProps extends Partial<HTMLProps<HTMLDivElement>> {
  children: ReactNode;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  variant: "orange" | "blur" | "transparent";
  borderRadius?: string;
  type: "image" | "text";
  className?: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({
  variant,
  children,
  position,
  borderRadius = "20px",
  type,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        s.breadcrumb,
        s[variant],
        s[position],
        s[type],
        className
      )}
      style={{ borderRadius }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Breadcrumb;
