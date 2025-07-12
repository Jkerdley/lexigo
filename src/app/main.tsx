import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./styles/index.css";
import App from "./App.tsx";
import { store } from "../core/store/store.ts";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App />
    </Provider>
);
