import { FC, memo } from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import s from "../card.module.scss";

interface IsNewProps {
  is_new: boolean;
}

const IsNew: FC<IsNewProps> = memo(({ is_new }) => {
  if (!is_new) {
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
});

export default IsNew;
