import { FC, ReactNode } from "react";
import s from "./breadcrumb.module.scss";
import clsx from "clsx";
interface BreadcrumbProps {
  children: ReactNode;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  variant: "orange" | "blur";
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
    >
      {children}
    </div>
  );
};

export default Breadcrumb;
