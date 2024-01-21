import { Movie } from "@/types/movies";
import { FC } from "react";
import s from "./cardsWrapper.module.scss";
import Carousel from "../Carousel/Carousel";
import clsx from "clsx";

const CardsWrapper: FC<Movie> = ({ contents, name }) => {
  return (
    <div className={clsx(s.cardWrapper, "container")}>
      <div className={s.cardContainer}>
        <div className={s.header}>
          <h3 className={s.cardsName}>{name}</h3>
          {contents.length > 15 ? (
            <a href="#" className={s.more}>
              Посмотреть все
            </a>
          ) : null}
        </div>
        <Carousel data={contents} />
      </div>
    </div>
  );
};

export default CardsWrapper;
