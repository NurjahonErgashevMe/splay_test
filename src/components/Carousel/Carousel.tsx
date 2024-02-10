import { FC } from "react";
import Slider, { CustomArrowProps } from "react-slick";

import { MovieContent } from "@/types/movies";

import s from "./carousel.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Card from "../Card/Card";
import Button from "../Button/Button";
import clsx from "clsx";
import { useViewportSize } from "@/shared/hooks/useWindowSize";
import breakpoints from "@/shared/breakpoints";

type ResponsiveOption = {
  breakpoint: number;
  settings: {
    slidesToShow: number;
    slidesToScroll: number;
  };
};

interface CarouselProps {
  data: MovieContent[];
}

const NextButton: FC<CustomArrowProps & { slidesPerView: number }> = (
  props
) => {
  const CURRENT_SLIDE: number = props.currentSlide
    ? props.currentSlide + props.slidesPerView
    : 0;

  if (CURRENT_SLIDE === props.slideCount) {
    return <></>;
  }
  return (
    <Button
      styleVariant="white--orange-onHover"
      icon={{ name: "ARROW_RIGHT" }}
      className={clsx(s.nextButton, s.carouselButton)}
      onClick={props.onClick}
    />
  );
};
const PrevButton: FC<CustomArrowProps> = (props) => {
  if (props.currentSlide === 0) {
    return <></>;
  }
  return (
    <Button
      styleVariant="white--orange-onHover"
      icon={{ name: "ARROW_LEFT" }}
      className={clsx(s.prevButton, s.carouselButton)}
      onClick={props.onClick}
      aria-label="previous-button"
      ria-label="Button"
      aria-labelledby="labeldiv"
    />
  );
};

const LOREM_TEXT = `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet distinctio, aperiam dolor voluptatibus odit ratione excepturi molestiae. Quam omnis deleniti aspernatur assumenda rem cumque necessitatibus, unde consequatur quis. Magni enim minus, cum ratione quam similique odit recusandae sit ipsa doloremque vel autem culpa error possimus quaerat beatae assumenda iste repellendus.
`;

const CAROUSEL_OPTIONS: ResponsiveOption[] = [
  {
    breakpoint: breakpoints.xl,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 5,
    },
  },
  {
    breakpoint: breakpoints.md,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
    },
  },
  {
    breakpoint: breakpoints.sm,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
    },
  },
];

const getCurrentResponsiveOption = (
  width: number,
  BigestOption: ResponsiveOption,
  SmallestOption: ResponsiveOption
): ResponsiveOption => {
  if (width > BigestOption.breakpoint) {
    return {
      breakpoint: 0,
      settings: { slidesToShow: 6, slidesToScroll: 6 },
    };
  } else if (width <= SmallestOption.breakpoint) {
    return SmallestOption;
  }
  return CAROUSEL_OPTIONS?.find(
    (item, index, array) =>
      item.breakpoint >= width && array[index + 1]?.breakpoint <= width
  ) as ResponsiveOption;
};

const Carousel: FC<CarouselProps> = ({ data }) => {
  const { width } = useViewportSize();
  const BigestOption = CAROUSEL_OPTIONS[0];
  const SmallestOption = CAROUSEL_OPTIONS[CAROUSEL_OPTIONS.length - 1];

  return (
    <div className={s.carousel}>
      <Slider
        slidesToScroll={6}
        slidesToShow={6}
        speed={500}
        infinite={false}
        nextArrow={
          <NextButton
            slidesPerView={
              getCurrentResponsiveOption(width, BigestOption, SmallestOption)
                .settings.slidesToShow
            }
          />
        }
        prevArrow={<PrevButton />}
        responsive={CAROUSEL_OPTIONS}
        className={s.slider}
      >
        {data?.map((item) => (
          <Card
            key={item.id}
            {...item}
            country={["Россия"]}
            description={LOREM_TEXT}
            image_src={item?.poster_h?.medium ?? ""}
            id={item.id}
            is_saved={false}
            title={"The Lorem Man"}
            video_src={
              "https://www.film.ru/sites/default/files/trailers/50248166/wednesday-season-2-teaser-1.mp4"
            }
            year={2023}
            className={s.carouselItem}
            withModal
          />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
