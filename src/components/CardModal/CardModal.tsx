import NiceModal, { NiceModalHocProps, useModal } from "@ebay/nice-modal-react";
import { CSSProperties, FC, ReactNode, useContext, useRef } from "react";
import clsx from "clsx";

import s from "./cardModal.module.scss";
import sCard from "../Card/card.module.scss";

import { Rect } from "react-use-rect";
import { useColor } from "color-thief-react";
import { CardContext } from "../Card/context/context";
import { LazyLoadImage } from "react-lazy-load-image-component";
import getIcon from "@/helpers/getIcon";
import getBreakpoint from "@/helpers/getBreakpoint";
import { Transition } from "../Transition";

import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Description, { DescriptionProps } from "../Card/components/Description";
import CardContextProvider from "../Card/context/ContextProvider";

import { useDelayedHover } from "@/shared/hooks/useDelayHover";
import { useViewportSize } from "@/shared/hooks/useWindowSize";
interface ModalProps extends ModalContentProps {
  rect: Rect;
  children: ReactNode;
  image_src: string;
}

interface ModalContentProps extends DescriptionProps {
  className: string;
  style: CSSProperties;
  image_src: string;
  title: string;
  video_src: string;
}

const ModalContent: FC<ModalContentProps> = ({
  className,
  style,
  image_src,
  title,
  video_src,
  ...props
}) => {
  // const [snapshots, setSnapshots] = useState<HTMLCanvasElement[]>([]);
  const cardContext = useContext(CardContext);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // const outputRef = useRef<HTMLCanvasElement | null>(null);
  const modal = useModal();

  // const scaleFactor = 0.25;

  // function canvasToImage(canvas: HTMLCanvasElement): HTMLImageElement {
  //   const img = new Image();

  //   img.onload = () => {
  //     canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
  //     canvas.getContext("2d")?.drawImage(img, 0, 0);
  //     URL.revokeObjectURL(img.src);
  //     img.crossOrigin = "anonymus";
  //   };

  //   const url = canvas.toDataURL("image/png");
  //   img.src = url;

  //   return img;
  // }

  // const capture = (video: HTMLVideoElement) => {
  //   const canvas = outputRef?.current;
  //   if (!canvas) {
  //     return;
  //   }
  //   const w = video.videoWidth * scaleFactor;
  //   const h = video.videoHeight * scaleFactor;
  //   canvas.width = w;
  //   canvas.height = h;
  //   canvas?.getContext("2d")?.drawImage(video, 0, 0, w, h);
  //   return canvas;
  // };
  // const shoot = async () => {
  //   const video = videoRef.current;
  //   const output = outputRef.current;
  //   if (video && output) {
  //     const canvas = capture(video);
  //     const canvasImageSrc = canvasToImage(output);
  //     console.log(canvasImageSrc);
  //   }
  // };

  // if (cardContext?.viewElement === "video") {
  //   setInterval(() => {
  //   }, 1000);
  //     shoot();
  // }

  const mute = () => {
    cardContext?.setMuted((prev) => !prev);
  };

  const IconVolumeOrMuted = getIcon(
    cardContext?.muted ? "MUTED" : "VOLUME"
  ) ?? <></>;

  const viewElementOpen = (): void => {
    cardContext?.setViewElement("video");
  };
  const viewElementCLose = () => {
    cardContext?.setViewElement(() => "image");
  };

  const {
    openDropdown: viewElementChangerOpen,
    closeDropdown: viewElementChangerCLose,
  } = useDelayedHover({
    open: viewElementOpen,
    close: viewElementCLose,
    openDelay: 3000,
    closeDelay: 0,
  });

  if (cardContext?.viewElement === "image") {
    viewElementChangerOpen();
  }

  return (
    <div
      className={clsx(sCard.card, className, sCard.withModal)}
      style={{
        ...style,
      }}
      onPointerLeave={() => {
        modal.hide();
        modal.remove();
        cardContext?.setViewElement("image");
        viewElementChangerCLose();
      }}
    >
      {/* <canvas ref={outputRef}></canvas>
      <button onClick={shoot}>go</button> */}
      <div className={sCard.imageWrapper}>
        {cardContext?.viewElement === "image" ? (
          <LazyLoadImage
            className={sCard.image}
            src={image_src}
            placeholderSrc={image_src}
            width={"100%"}
            height={"auto"}
            effect="blur"
            alt={title}
            loading="lazy"
            sizes="100vw"
          />
        ) : (
          <>
            <video
              width={"100%"}
              height={"auto"}
              playsInline
              autoPlay
              loop
              muted={cardContext?.muted}
              ref={videoRef}
            >
              <source src={video_src ?? ""} type="video/mp4"></source>
            </video>
            <Breadcrumb
              type="image"
              position="bottom-right"
              variant="transparent"
              onClick={mute}
              className={sCard.mute}
            >
              <IconVolumeOrMuted />
            </Breadcrumb>
          </>
        )}
      </div>
      <Transition
        mounted={true}
        keepMounted
        duration={500}
        exitDuration={200}
        transition={"fade"}
      >
        {(styles) => (
          <Description
            title={title}
            id={props.id}
            withModal={props.withModal ?? false}
            year={props.year}
            styles={styles}
            age_restrictions={props.age_restrictions}
            country={props.country}
          />
        )}
      </Transition>
    </div>
  );
};

const Modal: FC<ModalProps & NiceModalHocProps> = NiceModal.create(
  ({ rect, image_src, ...props }) => {
    const { width: viewportWidth, height: viewportHeight } = useViewportSize();
    const {
      loading: boxColorloading,
      data: boxColor,
      error,
    } = useColor(image_src, "rgbString", {
      crossOrigin: "anonymus",
      quality: 100,
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
        <CardContextProvider>
          <ModalContent {...props} image_src={image_src} />
        </CardContextProvider>
      </div>
    );
  }
);

export default Modal;
