


import ReactDOM, { type Container } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import RagnarokTheNewWorld from "./Pages/RagnarokTheNewWorld/RagnarokTheNewWorld";
import CraftingCalculator from "./Pages/RagnarokTheNewWorld/CraftingCalculator";
import MainLayout from "./Layouts/MainLayout";
import MainPage from "./Pages/MainPage";

const root = document.getElementById("root") as Container;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
      <MainLayout>
        <Routes>
            <Route path="/" index element={<MainPage />} />
           <Route path="row">
            <Route index element={<RagnarokTheNewWorld />} />
            <Route path="craftingcalculator" element={<CraftingCalculator />} />
          </Route>
        </Routes>
      </MainLayout>
  </BrowserRouter>,
);
