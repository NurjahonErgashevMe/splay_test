import {
  CSSProperties,
  FC,
  memo,
  useContext,
  useEffect,
  useState,
} from "react";
import Modal from "react-modal";

import { MovieContent } from "@/types/movies";

import { useDelayedHover } from "@/shared/hooks/useDelayHover";

import { LazyLoadImage } from "react-lazy-load-image-component";

import { Rect, useRect } from "react-use-rect";
import getBreakpoint from "@/helpers/getBreakpoint";
("");

import s from "./card.module.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";

import clsx from "clsx";

import NiceModal from "@ebay/nice-modal-react";

import { useWindowScroll } from "@/shared/hooks/useWindowScroll";
import breakpoints from "@/shared/breakpoints";
import { useViewportSize } from "@/shared/hooks/useWindowSize";
import CardContextProvider from "./context/ContextProvider";
import { CardContext } from "./context/context";
import IsCompany from "./components/IsCompany";
import IsNew from "./components/IsNew";
import ModalContent from "../CardModal/ModalContent/ModalContent";
import CardModal from "../CardModal/CardModal";

export interface CardProps extends MovieContent {
  image_src: string;
  video_src: string | null;
  country: string[];
  year: number;
  is_saved: boolean;
  description: string;
  title: string;
  className?: string;
  withModal?: boolean;
  style?: CSSProperties;
}

Modal.setAppElement("#root");

const CardContent: FC<CardProps> = memo((props) => {
  const { width: viewportWidth } = useViewportSize();
  const cardContext = useContext(CardContext);
  const [opened, setOpened] = useState<boolean>(false);
  const [rect, setRect] = useState<Rect | null>(null);
  const [rectRef, revalidate] = useRect(setRect);
  const [scroll] = useWindowScroll();

  const open = (): void => {
    setOpened(() => true);
  };
  const close = (): void => {
    setOpened(() => false);
  };

  const { openDropdown, closeDropdown } = useDelayedHover({
    open,
    close,
    openDelay: 1000,
    closeDelay: 0,
  });

  useEffect(() => {
    closeDropdown();
    return () => NiceModal.remove("card-modal");
  }, [scroll]);

  // const showModal = useCallback(() => {
  //   if (!opened || !rect || !props.withModal) {
  //     return;
  //   } else if (getBreakpoint(breakpoints, viewportWidth) === breakpoints.xs)
  //     return;
  //   NiceModal.show("card-modal", {
  //     ...props,
  //     rect,
  //     opened,
  //   });
  // }, [opened, rect, viewportWidth, cardContext?.viewElement, props.video_src]);

  // showModal();

  return (
    <div
      className={s.cardWrapper}
      onPointerLeave={() => {
        if (props.withModal) {
          closeDropdown();
        }
        cardContext?.setViewElement("image");
      }}
      onPointerEnter={() => {
        if (props.withModal) {
          openDropdown();
        }
        revalidate();
      }}
      ref={rectRef}
    >
      <div className={clsx(s.card, props.className)}>
        <div className={s.imageWrapper}>
          <IsNew is_new={props.is_new} />
          <LazyLoadImage
            className={s.image}
            src={props.image_src}
            placeholderSrc={props.image_src}
            width={"100%"}
            height={"auto"}
            effect="blur"
            alt={props.title}
            loading="lazy"
            sizes="100vw"
          />
          <IsCompany company={props.company} title={props.title} />
        </div>
      </div>

      {/* modal */}
      {rect ? (
        <CardModal
          isVisible={opened}
          cardModalContent={{ ...props, video_src: props.video_src ?? "" }}
          rect={rect}
          image_src={props.image_src}
          heading=""
          onClickCloseBtn={() => console.log("close")}
        >
          <ModalContent {...props} withModal={true} styles={{}} />
        </CardModal>
      ) : null}
    </div>
  );
});

const Card: FC<CardProps> = (props) => {
  return (
    <CardContextProvider>
      <CardContent {...props} />
    </CardContextProvider>
  );
};

export default Card;
