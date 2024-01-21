import "./App.css";
import movies from "./mocks/movies";
import CardsWrapper from "./components/CardsWrapper/CardsWrapper";
import { Suspense } from "react";
import Card from "./components/Card/Card";

const video_src : string = `https://d3v55qvjb2v012.cloudfront.net/Ae7e/2024/01/19/14/22/cZVq23VJZz4/sc.mp4?srcid=cZVq23VJZz4&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kM3Y1NXF2amIydjAxMi5jbG91ZGZyb250Lm5ldC9BZTdlLzIwMjQvMDEvMTkvMTQvMjIvY1pWcTIzVkpaejQvc2MubXA0P3NyY2lkPWNaVnEyM1ZKWno0IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA1OTU4NTE4fX19XX0_&Signature=RjXqNhSaE793Wb2voyIN3u5qgNWXZiAK-WJidNjK-pQTVWJjoySxzxz9RkRWWrn3cH444B2rfLaPHoY8B~MK~3BF~TgDTYpzsDI8B~o~3tee0J~qb0IEBsBz10YUsc9q6TDdHQGhQH~QuwAzHDNIjdSqb89O~AMmY05TEhWKA8A_&Key-Pair-Id=APKAI4E2RN57D46ONMEQ`;

const cardItem_1 = movies[0].contents[3];
const cardItem_2 = movies[0].contents[5];

const LOREM_TEXT : string = `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo amet nemo voluptatibus vel id consequatur! Cum corporis, nam temporibus modi perferendis laborum illo sit quae expedita qui reiciendis consequuntur numquam pariatur, officiis tenetur veritatis, itaque ipsa similique! Ducimus repellat delectus quis a voluptate tempora odit modi, at, provident dolorum facilis?`;

function App() {
  return (
    <Suspense fallback={<h3>LOADING...</h3>}>
      <div className="container" style={{ display: "flex", gap: 10 }}>
        <Card
          {...cardItem_1}
          country={["Россия"]}
          description={LOREM_TEXT}
          image_src={cardItem_1?.poster_h?.medium ?? ""}
          id={1}
          is_saved={false}
          title={"The Lorem Man"}
          video_src={video_src}
          year={2023}
          style={{ maxWidth: 300 }}
          withModal
        />
        <Card
          {...cardItem_2}
          country={["Россия"]}
          description={LOREM_TEXT}
          image_src={cardItem_2?.poster_h?.medium ?? ""}
          id={1}
          is_saved={false}
          title={"The Lorem Man"}
          video_src={video_src}
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
