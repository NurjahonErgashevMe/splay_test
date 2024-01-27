import { Dispatch, SetStateAction, createContext } from "react";

type TSetState<T> = Dispatch<SetStateAction<T>>;

export interface ICardContext {
  viewElement: "image" | "video";
  setViewElement: TSetState<ICardContext["viewElement"]>;
  muted: boolean;
  setMuted: TSetState<boolean>;
}

export const CardContext = createContext<ICardContext | null>(null);
