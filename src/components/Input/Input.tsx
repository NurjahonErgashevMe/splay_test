import { FC } from "react";
import s from "./input.module.scss";

interface InputProps extends TextInputProps {}

const Input: FC<InputProps> = (props) => {
  return (
    // <input
    //   {...props}
    //   classNames={{
    //     input: s.input,
    //     wrapper: s.inputWrapper,
    //     required: s.required,
    //     error: s.error,
    //     section: s.inputSection,
    //   }}
    // />
    <></>
  );
};

export default Input;
