import { CSSProperties, FC, useCallback, useEffect, useState } from "react";
import { MovieContent } from "@/types/movies";
import { ImageNames } from "@/types/shared/imagesNames";

import { Transition } from "../Transition";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Button from "../Button/Button";
import Modal from "../CardModal/CardModal";

import { useDelayedHover } from "@/shared/hooks/useDelayHover";

// import { prominent } from "color.js";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Rect, useRect } from "react-use-rect";
import getBreakpoint from "@/helpers/getBreakpoint";''

import s from "./card.module.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";

import clsx from "clsx";

import getImage from "@/helpers/getImage";
import getIcon from "@/helpers/getIcon";
import NiceModal from "@ebay/nice-modal-react";

import { useWindowScroll } from "@/shared/hooks/useWindowScroll";
import breakpoints from "@/shared/breakpoints";
import { useViewportSize } from "@/shared/hooks/useWindowSize";

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

const Card: FC<CardProps> = (props) => {
  const { width: viewportWidth } = useViewportSize();
  const [opened, setOpened] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [viewElement, setViewElement] = useState<"image" | "video">("image");
  const [muted, setMuted] = useState<boolean>(true);
  const [rect, setRect] = useState<Rect | null>(null);
  const [rectRef, revalidate] = useRect(setRect);
  const [scroll] = useWindowScroll();

  NiceModal.register("card-modal", Modal);

  const open = (): void => {
    setOpened(() => true);
  };
  const close = (): void => {
    setOpened(() => false);
  };
  const save = () => {
    setSaved((prev) => !prev);
  };
  const mute = () => {
    setMuted((prev) => !prev);
  };

  const viewElementOpen = (): void => {
    setViewElement(() => "video");
  };
  const viewElementCLose = () => {
    setViewElement(() => "image");
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

  const { openDropdown, closeDropdown } = useDelayedHover({
    open,
    close,
    openDelay: 1000,
    closeDelay: 0,
  });

  const Description: FC<CSSProperties> = (styles) => {
    if (!props.withModal) {
      return <></>;
    }
    return (
      <div
        className={s.description}
        style={{
          ...styles,
        }}
      >
        <h2 className={s.title}>{props.title}</h2>
        <span className={s.tags}>{tags}</span>
        <div className={s.buttons}>
          <Button
            variant="orangeColor"
            icon={{ name: "PLAY--WHITE" }}
            className={s.watchButton}
          >
            начать смотреть
          </Button>
          <button className={s.saveIcon} onClick={save}>
            <IconSave stroke="#fff" fill={saved ? "#fff" : "transparent"} />
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const func = () => {
      if (!opened) {
        viewElementChangerCLose();
        return;
      }
      if (props.video_src) {
        viewElementChangerOpen();
      }
    };
    return () => func();
  }, [
    opened,
    props.image_src,
    props.video_src,
    props.withModal,
    viewElement,
    viewElementChangerCLose,
    viewElementChangerOpen,
  ]);

  useEffect(() => {
    setOpened(() => false);
    return () => NiceModal.remove("card-modal");
  }, [scroll]);

  const CompanyLogo = getImage(props.company as ImageNames) ?? null;
  const IconSave = getIcon("SAVE") ?? <></>;

  const IconVolumeOrMuted = getIcon(muted ? "MUTED" : "VOLUME") ?? <></>;

  const IS_COMPANY_LOGO_IMAGE: boolean = typeof CompanyLogo === "string";

  const splitingWithSlash = (text: (string | number)[]) => text.join(" / ");

  const tags = splitingWithSlash([
    props.age_restrictions,
    ...props.country,
    props.year,
  ]);

  const IsNew: FC = () => {
    if (!props.is_new) {
      return <></>;
    }
    return (
      <Breadcrumb
        type="text"
        position="top-right"
        variant="orange"
        borderRadius="20px"
        className={s.isNew}
      >
        Новинка
      </Breadcrumb>
    );
  };

  const IsCompany: FC = () => {
    if (!props.company) {
      return <></>;
    }
    return (
      <Breadcrumb
        type="image"
        position="bottom-left"
        variant="blur"
        borderRadius="5px"
        className={s.company}
      >
        {IS_COMPANY_LOGO_IMAGE ? (
          <LazyLoadImage
            className={s.image}
            src={CompanyLogo as string}
            width={63}
            height={12}
            alt={props.title}
            loading="lazy"
          />
        ) : (
          <CompanyLogo width={"100%"} height={15} fill="#fff" />
        )}
      </Breadcrumb>
    );
  };

  const showModal = useCallback(() => {
    if (!opened || !rect || !props.withModal) {
      return;
    } else if (getBreakpoint(breakpoints, viewportWidth) === breakpoints.xs)
      return;

    NiceModal.show("card-modal", {
      children: (
        <div
          className={clsx(s.card, props.className, {
            [s.withModal]: props.withModal,
          })}
          style={{
            ...props.style,
          }}
          onPointerLeave={() => NiceModal.hide("card-modal")}
        >
          <div className={s.imageWrapper}>
            {viewElement === "image" ? (
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
            ) : (
              <>
                <video
                  width={"100%"}
                  height={"auto"}
                  src={props.video_src ?? ""}
                  playsInline
                  autoPlay
                  loop
                  muted={muted}
                ></video>
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
            <Transition
              mounted={opened}
              keepMounted
              duration={500}
              exitDuration={200}
              transition={"fade"}
            >
              {(styles) => <Description {...styles} />}
            </Transition>
          </div>
        </div>
      ),
      rect,
    });
  }, [opened, rect, viewportWidth , viewElement]);

  showModal();

  return (
    <div
      className={s.cardWrapper}
      onPointerLeave={() => {
        if (props.withModal) {
          closeDropdown();
        }
        setOpened(() => false);
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
          <IsNew />
          {viewElement === "image" ? (
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
          ) : (
            <>
              <video
                width={"100%"}
                height={"auto"}
                src={props.video_src ?? ""}
                playsInline
                autoPlay
                loop
                muted={muted}
              ></video>
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
          <IsCompany />
        </div>
      </div>
    </div>
  );
};

export default Card;
