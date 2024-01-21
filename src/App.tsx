import "./App.css";
import movies from "./mocks/movies";
import CardsWrapper from "./components/CardsWrapper/CardsWrapper";
import { Suspense} from "react";
import Card from "./components/Card/Card";

function App() {
  const cardItem = movies[0].contents[3];
  return (
    <Suspense fallback={<h3>LOADING...</h3>}>
      <div className="container" style={{ display: "flex", gap: 10 }}>
        <Card
          {...cardItem}
          country={["Россия"]}
          description={`
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo amet nemo voluptatibus vel id consequatur! Cum corporis, nam temporibus modi perferendis laborum illo sit quae expedita qui reiciendis consequuntur numquam pariatur, officiis tenetur veritatis, itaque ipsa similique! Ducimus repellat delectus quis a voluptate tempora odit modi, at, provident dolorum facilis?`}
          image_src={cardItem?.poster_h?.medium ?? ""}
          id={1}
          is_saved={false}
          title={"The Lorem Man"}
          video_src={`https://screenpal.com/watch/cZVq23VJZz4`}
          year={2023}
          style={{ maxWidth: 300 }}
          withModal
        />
        <Card
          {...cardItem}
          country={["Россия"]}
          description={`
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo amet nemo voluptatibus vel id consequatur! Cum corporis, nam temporibus modi perferendis laborum illo sit quae expedita qui reiciendis consequuntur numquam pariatur, officiis tenetur veritatis, itaque ipsa similique! Ducimus repellat delectus quis a voluptate tempora odit modi, at, provident dolorum facilis?`}
          image_src={cardItem?.poster_h?.medium ?? ""}
          id={1}
          is_saved={false}
          title={"The Lorem Man"}
          video_src={null}
          year={2023}
          style={{ maxWidth: 300 }}
          withModal
        />
      </div>
      {movies?.map((item) => (
        <CardsWrapper {...item} key={item.id} />
      ))}
    </Suspense>
  );
}

export default App;
