import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Projects from "./routes/Projects/Projects";
import Contact from "./routes/Contact/Contact";
import TatMap from "./routes/TatMap/TatMap";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={"/projects"} />,
    },
    {
      path: "/projects",
      element: <Projects />,
    },
    {
      path: "/projects/tatmap",
      element: <TatMap />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
