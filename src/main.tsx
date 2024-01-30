import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import NiceModal from "@ebay/nice-modal-react";
import { MantineProvider } from "@mantine/core";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <NiceModal.Provider>
        <App />
      </NiceModal.Provider>
    </MantineProvider>
  </React.StrictMode>
);
