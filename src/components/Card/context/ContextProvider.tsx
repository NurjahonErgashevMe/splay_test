import { PropsWithChildren, useState } from "react";
import { CardContext, ICardContext } from "./context";

function CardContextProvider({ children }: PropsWithChildren) {
  const [viewElement, setViewElement] =
    useState<ICardContext["viewElement"]>("image");

  const [muted, setMuted] = useState<boolean>(true);

  const defaultStates: ICardContext = {
    viewElement,
    setViewElement,
    muted,
    setMuted,
  };
  return (
    <CardContext.Provider value={defaultStates}>
      {children}
    </CardContext.Provider>
  );
}

export default CardContextProvider;
