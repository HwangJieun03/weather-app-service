import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Error from "./components/common/Error";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GeolocationProvider } from "./components/context/GeolocationContext";

const queryClient = new QueryClient();

const routeList = [
  {
    path: "/",
    element: <Home />,
  },
];

const router = createBrowserRouter(
  routeList.map((item) => {
    return {
      ...item,
      element: <Layout>{item.element}</Layout>,
      errorElement: <Error />,
    };
  })
);

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <GeolocationProvider>
          <RouterProvider router={router} />
        </GeolocationProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
