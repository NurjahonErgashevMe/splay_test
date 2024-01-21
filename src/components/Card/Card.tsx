import { CSSProperties, FC, useEffect, useState } from "react";
import s from "./card.module.scss";
import { MovieContent } from "@/types/movies";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import getImage from "@/helpers/getImage";
import { ImageNames } from "@/types/shared/imagesNames";
import clsx from "clsx";
import { useDelayedHover } from "@/shared/hooks/useDelayHover";
import Button from "../Button/Button";
import getIcon from "@/helpers/getIcon";
import { prominent } from "color.js";
interface CardProps extends MovieContent {
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
  const [opened, setOpened] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [viewElement, setViewElement] = useState<"image" | "video">("image");
  const [muted, setMuted] = useState<boolean>(true);
  const [shadowColor, setShadowColor] = useState<string>("");
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

  const cardClose = () => {
    setMuted(() => true);
    setShadowColor(() => "");
    setViewElement(() => "image");
    setOpened(() => false);
  };

  const getExtractorColor = async (image: string) => {
    const color = await prominent(image, { amount: 1, format: "hex" });
    return color;
  };

  useEffect(() => {
    if (!opened) {
      return cardClose();
    }
    if (opened) {
      if (props.video_src) {
        setTimeout(() => {
          setViewElement(() => "video");
        }, 2000);
      }
      if (props.withModal) {
        getExtractorColor(props.image_src).then((color) =>
          setShadowColor(() => color as string)
        );
      }
    }
  }, [opened, props.image_src, props.video_src, props.withModal]);

  const { openDropdown, closeDropdown } = useDelayedHover({
    open,
    close,
    openDelay: 1000,
    closeDelay: 100,
  });

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

  const WithModal: FC = () => {
    if (!props.withModal) {
      return <></>;
    }
    return (
      <div
        className={clsx(s.description, opened ? s.show : s.hidden)}
        style={{ boxShadow: !opened ? `` : `0 15px 20px 5px ${shadowColor}` }}
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

  return (
    <div
      onPointerEnter={() => {
        if (props.withModal) {
          openDropdown();
        }
      }}
      onPointerLeave={() => {
        if (props.withModal) {
          closeDropdown();
        }
        cardClose();
      }}
      className={clsx(s.card, props.className, {
        [s.withModal]: props.withModal && opened,
      })}
      style={{
        ...props.style,
        boxShadow: !opened ? `` : `0 15px 20px 5px ${shadowColor}`,
      }}
    >
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
          <video
            width={"100%"}
            height={"auto"}
            src={props.video_src ?? ""}
            playsInline
            autoPlay
            loop
            muted={muted}
          ></video>
        )}
        {viewElement === "video" ? (
          <Breadcrumb
            type="image"
            position="bottom-right"
            variant="transparent"
            onClick={mute}
            className={s.mute}
          >
            <IconVolumeOrMuted />
          </Breadcrumb>
        ) : null}
        <IsCompany />
      </div>
      <WithModal />
    </div>
  );
};

export default Card;
