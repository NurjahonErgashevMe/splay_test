import NiceModal, { NiceModalHocProps } from "@ebay/nice-modal-react";
import s from "./cardModal.module.scss";
import { FC, ReactNode } from "react";
import { Rect } from "react-use-rect";
import { useViewportSize } from "@/shared/hooks/useWindowSize";
import getBreakpoint from "@/helpers/getBreakpoint";
import { useColor } from "color-thief-react";

interface ModalProps {
  rect: Rect;
  children: ReactNode;
  image_src: string;
}

const Modal: FC<ModalProps & NiceModalHocProps> = NiceModal.create(
  ({ children, rect, image_src }) => {
    const { width: viewportWidth, height: viewportHeight } = useViewportSize();
    const {
      loading: boxColorloading,
      data: boxColor,
      error,
    } = useColor(image_src, "rgbString", {
      crossOrigin: "anonymus",
      quality: 50,
    });
    const scale = {
      xs: 0,
      sm: 1.2,
      md: 1.3,
      lg: 1.5,
      xl: 1.5,
    };
    const description: {
      width: number;
      height: number;
    } = {
      width: rect.width + 45,
      height: rect.height + 40,
    };

    const currentScale: number = getBreakpoint(scale, viewportWidth);

    const width = rect.width * currentScale;
    const height = (rect.height + description.height) * currentScale;
    const bottom = rect.bottom + height - viewportHeight;
    const right = viewportWidth - rect.right;
    const left = rect.left;

    const x = (): { method: "left" | "right"; value: string | number } => {
      if (right <= 100) {
        return {
          method: "right",
          value: 50,
        };
      }
      if (left <= 100) {
        return {
          method: "left",
          value: 50,
        };
      }
      return {
        method: "left",
        value: rect.x - Math.floor(rect.width / 5),
      };
    };

    const xStyle = {
      right: x().method === "right" ? x().value : "",
      left: x().method === "left" ? x().value : "",
    };

    console.log(`Colorthief error  : ${error}`);

    return (
      <div
        className={s.modal}
        style={{
          position: "fixed",
          ...rect,
          width,
          bottom: bottom > 0 ? `${bottom - height} !important` : bottom,
          ...xStyle,

          filter: `drop-shadow(${
            boxColorloading ? "var(--orange-color)" : boxColor
          } 0rem 0rem 1.875rem)`,
        }}
      >
        {children}
      </div>
    );
  }
);

export default Modal;
