import { FC } from "react";
import s from "./input.module.scss";
import { TextInput, TextInputProps } from "@mantine/core";

interface InputProps extends TextInputProps {}

const Input: FC<InputProps> = (props) => {
  return (
    <TextInput
      {...props}
      unstyled
      classNames={{
        input: s.input,
        wrapper: s.inputWrapper,
        required: s.required,
        error: s.error,
        section: s.inputSection,
      }}
    />
  );
};

export default Input;
