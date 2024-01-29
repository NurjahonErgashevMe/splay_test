import "./App.css";
import movies from "./mocks/movies";
import CardsWrapper from "./components/CardsWrapper/CardsWrapper";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type TNotificationGet = {
  title: string;
  description: string;
  id: string;
};

type TNotification = Omit<TNotificationGet, "id">;

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notification, setNotification] = useState<TNotification>();
  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);
  useEffect(() => {
    socket?.on("getNotification", (data) => console.log(data));
  }, [socket]);
  const handeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket?.emit("sendNotification", notification);
  };

  const handleClear = () => {
    socket?.emit("clearNotification");
  };

  return (
    <Suspense fallback={<h3>LOADING...</h3>}>
      <form onSubmit={handeSubmit}>
        <input
          type="text"
          name="title"
          onChange={(e) =>
            setNotification((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <input
          type="text"
          name="description"
          onChange={(e) =>
            setNotification((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
        <button type="submit">submit</button>
      </form>
      <button onClick={handleClear}>clear notifications</button>
      {movies?.map((item) => (
        <CardsWrapper {...item} key={item.id} />
      ))}
    </Suspense>
  );
}

export default App;
