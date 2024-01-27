import { CSSProperties, FC, memo } from "react";
import s from "../card.module.scss";
import Button from "@/components/Button/Button";
import getIcon from "@/helpers/getIcon";
import { useSaved } from "@/store";
import { isSaved } from "@/store/saved";

export interface DescriptionProps {
  withModal: boolean;
  styles: CSSProperties;
  title: string;
  age_restrictions: number;
  country: string[];
  year: number;
  id: string | number;
}

const Description: FC<DescriptionProps> = memo(
  ({ title, withModal, styles, age_restrictions, country, year, id }) => {
    const { saved, toggleSaved } = useSaved((state) => state);

    if (!withModal) {
      return <></>;
    }

    const IconSave = getIcon("SAVE") ?? <></>;

    const splitingWithSlash = (text: (string | number)[]) => text.join(" / ");

    const tags = splitingWithSlash([age_restrictions, ...country, year]);

    const save = () => {
      toggleSaved(id);
      console.log(saved, "save");
    };

    return (
      <div
        className={s.description}
        style={{
          ...styles,
        }}
      >
        <h2 className={s.title}>{title}</h2>
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
            <IconSave
              stroke="#fff"
              fill={isSaved(saved, id) ? "#fff" : "transparent"}
            />
          </button>
        </div>
      </div>
    );
  }
);

export default Description;
