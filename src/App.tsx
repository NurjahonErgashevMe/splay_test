import "./App.css";
import movies from "./mocks/movies";
import CardsWrapper from "./components/CardsWrapper/CardsWrapper";
import { Suspense } from "react";
import Card from "./components/Card/Card";

const video_src: string = `https://gemootest.s3.us-east-2.amazonaws.com/s/res/598911471630778368/fe87e6f75f8488891cb76e2560a77bad.mp4?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARLZICB6QQHKRCV7K%2F20240123%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20240123T045021Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=cf51a6e5bea96dab14e9cca33bed2f57c9ad72a11152e6e3c26a86406302be95`;

const cardItem_1 = movies[0].contents[3];
const cardItem_2 = movies[0].contents[5];

const LOREM_TEXT: string = `
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
