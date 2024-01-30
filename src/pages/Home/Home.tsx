import { FC } from "react";
import movies from "@/mocks/movies";
import CardsWrapper from "@/components/CardsWrapper/CardsWrapper";
const Home: FC = () => {
  return (
    <div>
      {movies?.map((item) => (
        <CardsWrapper {...item} key={item.id} />
      ))}
    </div>
  );
};

export default Home;
