import { MovieContent } from "@/types/movies";
import { FC } from "react";
import s from "./modal.module.scss";

interface ModalProps extends MovieContent {
  image_url: string;
  video_url?: string | null;
}

const Modal: FC<ModalProps> = (props) => {
  const {
    age_restrictions,
    id,
    is_new,
    is_russian,
    is_serial,
    poster_h,
    rating,
    company,
    image_url,
    video_url,
  } = props;

  return (
    <div className={s.modal}>
      <div className={s.modalContainer}>
        <div
          className={s.imageItem}
          style={{ background: `url(${image_url})` }}
        ></div>
        <div>{age_restrictions}</div>
      </div>
    </div>
  );
};

export default Modal;
