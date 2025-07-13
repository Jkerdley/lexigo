import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./styles/index.css";
import App from "./App.tsx";
import { store, persistedStore } from "../core/store/store.ts";
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from "react-router-dom";


createRoot(document.getElementById("root")!).render(
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <App />
        </PersistGate>
      </Provider>
    </Router>
);
