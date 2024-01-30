/* eslint-disable react-refresh/only-export-components */
import Layout from "@/future/Layout";
import { Suspense, lazy } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";

//pages
const HomePage = lazy(() => import("@/pages/Home/Home"));
const AddNotificationPage = lazy(
  () => import("@/pages/AddNotification/AddNotification")
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<h2>LOADING...</h2>}>
        <Layout>
          <Outlet></Outlet>
        </Layout>
      </Suspense>
    ),
    loader: () => <h2>LOADER LOADING...</h2>,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "add-notification",
        element: <AddNotificationPage />,
      },
    ],
  },
]);

export default routes;
