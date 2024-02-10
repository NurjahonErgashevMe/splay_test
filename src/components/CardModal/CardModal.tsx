import { FC, PropsWithChildren, useId } from "react";

import s from "./cardModal.module.scss";

import { Rect } from "react-use-rect";
import { useColor } from "color-thief-react";
import getBreakpoint from "@/helpers/getBreakpoint";

import { useViewportSize } from "@/shared/hooks/useWindowSize";

import { ClientSidePortal } from "../ClientSidePortal";

import { ModalContentProps } from "./ModalContent/ModalContent";
import {
  AnimatePresence,
  AnimationProps,
  useReducedMotion,
  motion,
} from "framer-motion";

import clsx from "clsx";
import { Transition } from "../Transition";

export type ModalProps = PropsWithChildren<{
  rect: Rect;
  image_src: string;
  isVisible: boolean; // Modal visibility
  heading: string; // Modal heading
  onClickCloseBtn: (e: React.MouseEvent) => void; // Callback when the close button is clicked
  onClickBackdrop?: (e: React.MouseEvent) => void; // Callback when the backdrop is clicked
  onPressEscKey?: (e: KeyboardEvent) => void; // Callback when the ESC key is clicked
  modalClassName?: string; // Additional class for the modal
  animation?: AnimationProps; // Alternative modal animation, type imported from framer-motion
  cardModalContent: Partial<ModalContentProps>;
}>;

const scale = {
  xs: 0,
  sm: 1.2,
  md: 1.3,
  lg: 1.5,
  xl: 1.5,
};

const CardModal: FC<ModalProps> = (props) => {
  const { image_src, rect, isVisible, children, modalClassName, animation } =
    props;

  const { width: viewportWidth, height: viewportHeight } = useViewportSize();
  const {
    loading: boxColorloading,
    data: boxColor,
    error,
  } = useColor(image_src, "rgbString", {
    crossOrigin: "anonymus",
    quality: 100,
  });
  // A hook that returns `true` if the current device has Reduced Motion setting enabled
  const shouldReduceMotion = useReducedMotion();

  // Tip: Adding support for the Tab key is very welcome and user-friendly

  // headingId is used to set the "aria-labelledby" attribute of the modal dialog element
  const headingId = useId();

  // Combine the modal class names from the props and the default class names
  const modalMainClassName = clsx(
    s.modal,
    modalClassName,
    !isVisible ? s.modalClose : null
  );

  const modalAnimation = shouldReduceMotion ? {} : animation;

  const description: {
    width: number;
    height: number;
  } = {
    width: rect.width + 45,
    height: rect.height + 40,
  };

  // get scale
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
        value: 20,
      };
    }
    if (left <= 100) {
      return {
        method: "left",
        value: 20,
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

  // console.log(`Colorthief error  : ${error}`);

  return (
    <ClientSidePortal>
      <AnimatePresence>
        <>
          <Transition
            mounted={isVisible}
            keepMounted={false}
            transition={{
              in: {
                scale: 1.1,
                transition: "all .4s ease",
                opacity: 1,
                transform: `translateY(-10%)`,
              },
              out: {
                scale: 0.9,
                transition: "all .4s ease",
                transform: `translateY(-6%)`,
                opacity: 0,
              },
              transitionProperty: "all",
            }}
            duration={300}
            exitDuration={300}
          >
            {(styles) => (
              <motion.div
                key="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby={headingId}
                {...modalAnimation}
                className={modalMainClassName}
                style={{
                  // ...rect,
                  // top: (rect.top + height) / 2,
                  top: rect.top,
                  width,
                  height: rect.height + description.height,
                  position: "fixed",
                  // bottom: bottom > 0 ? `${bottom - height} !important` : bottom,
                  // bottom: bottom - height,
                  ...xStyle,
                  filter: `drop-shadow(${
                    boxColorloading ? "var(--orange-color)" : boxColor
                  } 0rem 0rem 1.875rem)`,
                  ...styles,
                }}
              >
                <div className={s.content}>{children}</div>
              </motion.div>
            )}
          </Transition>
        </>
      </AnimatePresence>
    </ClientSidePortal>
  );
};

export default CardModal;
