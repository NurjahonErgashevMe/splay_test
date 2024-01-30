import "./App.css";
import { RouterProvider } from "react-router-dom";
import routes from "./shared/routes/routes";

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
