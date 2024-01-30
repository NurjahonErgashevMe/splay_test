import { FC, useEffect, useState } from "react";
import s from "./addNotification.module.scss";

import { useForm } from "@mantine/form";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";

import { io, Socket } from "socket.io-client";

interface IForm {
  title: string;
  description: string;
}

const MIN_CHARASTER_WORD: string = `Минимум две буквы`;

const AddNotification: FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  const form = useForm<IForm>({
    initialValues: { title: "", description: "" },

    validate: {
      title: (value) => (value.length < 2 ? MIN_CHARASTER_WORD : null),
      description: (value) => (value.length < 2 ? MIN_CHARASTER_WORD : null),
    },
  });

  const handleSubmit = (e: IForm) => {
    socket?.emit("sendNotification", e);
  };

  return (
    <div className={s.addNotification}>
      <div className={s.container}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Input
            placeholder="Название"
            autoFocus
            {...form.getInputProps("title", {
              withFocus: true,
              withError: true,
              type: "input",
            })}
          />
          <Input
            placeholder="Допольнительно"
            {...form.getInputProps("description")}
          />
          <Button
            variant="default"
            styleVariant="white--orange-onHover"
            type="submit"
          >
            Добавить
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddNotification;
