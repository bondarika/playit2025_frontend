import { Route, BrowserRouter } from "react-router-dom";
import "./App.scss";
import TabBar from "./components/TabBar/TabBar";
import WebApp from "@twa-dev/sdk";

export default function App() {
  WebApp.expand()
  return (
    <BrowserRouter>
        <Route element={<TabBar />} />
    </BrowserRouter>
  );
}
