import "./App.css";
import movies from "./mocks/movies";
import CardsWrapper from "./components/CardsWrapper/CardsWrapper";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<h3>LOADING...</h3>}>
      {movies?.map((item) => (
        <CardsWrapper {...item} key={item.id} />
      ))}
    </Suspense>
  );
}

export default App;
