import { PropsWithChildren, useState } from "react";
import { CardContext, ICardContext } from "./context";

function CardContextProvider({ children }: PropsWithChildren) {
  const [viewElement, setViewElement] =
    useState<ICardContext["viewElement"]>("image");

  const [muted, setMuted] = useState<boolean>(true);

  const [opened, setOpened] = useState<boolean>(false);

  const defaultStates: ICardContext = {
    viewElement,
    setViewElement,
    muted,
    setMuted,
    opened,
    setOpened,
  };
  return (
    <CardContext.Provider value={defaultStates}>
      {children}
    </CardContext.Provider>
  );
}

export default CardContextProvider;
