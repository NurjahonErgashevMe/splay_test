import { FC, ReactNode } from "react";

interface ElementShowerProps {
  show?: boolean;
  children: ReactNode;
}

const ElementShower: FC<ElementShowerProps> = ({ children, show = false }) => {
  if (!show) {
    return;
  }
  return children;
};

export default ElementShower;
