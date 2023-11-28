import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Signout from "../components/Logout";
import CreateCommunity from "../components/CreateComunity";
import Chat from "../pages/Chat";

export const routes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "login",
    Component: Login,
  },
  {
    path: "register",
    Component: Register,
  },
  {
    path: "/signout",
    Component: Signout,
  },
  {
    path: "/community",
    Component: CreateCommunity,
  },
  {
     path : "/communityChat/:id",
     Component : Chat,
  }
]);
