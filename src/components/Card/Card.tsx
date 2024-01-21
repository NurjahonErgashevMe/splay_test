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

  useEffect(() => {}, [opened]);

  const open = (): void => {
    setOpened(() => true);
  };
  const close = (): void => {
    setOpened(() => false);
  };
  const save = () => {
    setSaved((prev) => !prev);
  };

  const { openDropdown, closeDropdown } = useDelayedHover({
    open,
    close,
    openDelay: 1000,
    closeDelay: 100,
  });

  const CompanyLogo = getImage(props.company as ImageNames) ?? null;
  const IconSave = getIcon("SAVE") ?? <></>;

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
      }}
      className={clsx(s.card, props.className, {
        [s.withModal]: props.withModal && opened,
      })}
      style={props.style}
    >
      <div className={s.imageWrapper}>
        <IsNew />
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
        <IsCompany />
      </div>
      {props.withModal ? (
        <div className={clsx(s.description, opened ? s.show : s.hidden)}>
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
      ) : null}
    </div>
  );
};

export default Card;
