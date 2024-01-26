import NiceModal, { NiceModalHocProps, useModal } from "@ebay/nice-modal-react";
import s from "./cardModal.module.scss";
import { FC, ReactNode } from "react";
import { Rect } from "react-use-rect";
import { useViewportSize } from "@/shared/hooks/useWindowSize";
import getBreakpoint from "@/helpers/getBreakpoint";

interface ModalProps {
  rect: Rect;
  children: ReactNode;
}

const Modal: FC<ModalProps & NiceModalHocProps> = NiceModal.create(
  ({ children, rect }) => {
    const scale = {
      xs: 0,
      sm: 1.2,
      md: 1.3,
      lg: 1.5,
      xl: 2,
    };

    const description = {
      width: rect.width + 45,
      height: rect.height + 40,
    };
    const { width: viewportWidth, height: viewportHeight } = useViewportSize();
    const modal = useModal();
    const width = rect.width * getBreakpoint(scale, viewportWidth);
    const height =
      (rect.height + description.height) * getBreakpoint(scale, viewportWidth);
    const bottom = rect.bottom + height - viewportHeight;

    return (
      <div
        className={s.modal}
        style={{
          ...rect,
          left: rect.left - Math.floor(rect.width / 6),
          bottom: bottom > 0 ? `${bottom - height} !important` : bottom,
          width,
        }}
        onPointerLeave={() => {
          modal.remove();
        }}
      >
        {children}
      </div>
    );
  }
);

export default Modal;
