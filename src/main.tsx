


import ReactDOM, { type Container } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import RagnarokTheNewWorld from "./Pages/RagnarokTheNewWorld/RagnarokTheNewWorld";
import CrafingCalculator from "./Pages/RagnarokTheNewWorld/CrafingCalculator";
import MainLayout from "./Layouts/MainLayout";

const root = document.getElementById("root") as Container;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
      <MainLayout>
        <Routes>
           <Route path="row">
            <Route index element={<RagnarokTheNewWorld />} />
            <Route path="craftingcalculator" element={<CrafingCalculator />} />
          </Route>
        </Routes>
      </MainLayout>
  </BrowserRouter>,
);
