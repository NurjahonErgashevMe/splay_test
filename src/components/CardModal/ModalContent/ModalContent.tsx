import { FC, useContext, useRef } from "react";

import s from "./modalContent.module.scss";

import clsx from "clsx";

import getIcon from "@/helpers/getIcon";
import { useDelayedHover } from "@/shared/hooks/useDelayHover";

import Description, {
  DescriptionProps,
} from "@/components/Card/components/Description";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

import { CardContext } from "@/components/Card/context/context";
import { Transition } from "@/components/Transition";

export type ModalContentProps = DescriptionProps & {
  className?: string;
  image_src: string;
  title: string;
  video_src: string;
};

const ModalContent: FC<ModalContentProps> = ({
  className,
  image_src,
  title,
  video_src,
  ...props
}) => {
  // const [snapshots, setSnapshots] = useState<HTMLCanvasElement[]>([]);
  const cardContext = useContext(CardContext);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // const outputRef = useRef<HTMLCanvasElement | null>(null);

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
      className={clsx(s.card, className, s.withModal)}
      onPointerLeave={() => {
        viewElementChangerCLose();
      }}
    >
      {/* <canvas ref={outputRef}></canvas>
      <button onClick={shoot}>go</button> */}
      <div className={s.imageWrapper}>
        {cardContext?.viewElement === "image" ? (
          <img
            className={s.image}
            src={image_src}
            width={"100%"}
            height={"auto"}
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
              className={s.mute}
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

export default ModalContent;
