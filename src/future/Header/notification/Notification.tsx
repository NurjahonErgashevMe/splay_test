import { FC, useEffect, useState } from "react";
import s from "./notification.module.scss";
import { Center, Tooltip } from "@mantine/core";

import getIcon from "@/helpers/getIcon";
import { useHover } from "@/shared/hooks";

import ElementShower from "@/components/ElementShower/ElementShower";

import { Socket, io } from "socket.io-client";

const Notification: FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notificationLength, setNotificationLength] = useState<number | null>(
    null
  );
  const { hovered, ref } = useHover<HTMLButtonElement>();
  const ICON = getIcon("NOTIFICATION");

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    socket?.on("getNotification", (data) => {
      const dataLength = data?.length;
      setNotificationLength(dataLength);
    });
  }, [socket]);

  return (
    <Tooltip
      label="Уведомления"
      withArrow
      color="#2C2D35"
      position="bottom"
      opened={hovered}
      transitionProps={{ transition: "fade", duration: 100 }}
    >
      <button ref={ref} className={s.notification}>
        <ICON />
        <ElementShower show={!!notificationLength}>
          <Center className={s.quantity}>{notificationLength}</Center>
        </ElementShower>
      </button>
    </Tooltip>
  );
};

export default Notification;
