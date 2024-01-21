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
      variant="white--orange-onHover"
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
      variant="white--orange-onHover"
      icon={{ name: "ARROW_LEFT" }}
      className={clsx(s.prevButton, s.carouselButton)}
      onClick={props.onClick}
      aria-label="previous-button"
      title="previous"
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
    breakpoint: 1540,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 5,
    },
  },
  {
    breakpoint: 1124,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
    },
  },
];

const Carousel: FC<CarouselProps> = ({ data }) => {
  const { width } = useViewportSize();
  const BigestOption = CAROUSEL_OPTIONS[0];
  const SmallesOption = CAROUSEL_OPTIONS[CAROUSEL_OPTIONS.length - 1];

  const getCurrentResponsiveOption = (): ResponsiveOption => {
    if (width > BigestOption.breakpoint) {
      return {
        breakpoint: 0,
        settings: { slidesToShow: 6, slidesToScroll: 6 },
      };
    } else if (width <= SmallesOption.breakpoint) {
      return SmallesOption;
    }
    return CAROUSEL_OPTIONS?.find(
      (item, index, array) =>
        item.breakpoint >= width && array[index + 1]?.breakpoint <= width
    ) as ResponsiveOption;
  };

  return (
    <div className={clsx(s.carousel, "carousel")}>
      <Slider
        className={s.carouselContainer}
        slidesToScroll={6}
        slidesToShow={6}
        speed={500}
        infinite={false}
        nextArrow={
          <NextButton
            slidesPerView={getCurrentResponsiveOption().settings.slidesToShow}
          />
        }
        prevArrow={<PrevButton />}
        responsive={CAROUSEL_OPTIONS}
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
            video_src={null}
            year={2023}
            className={s.carouselItem}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
