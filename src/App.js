import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import "rsuite/styles/index.less";
import "./App.css";
import { ROUTES } from "./constants/routepaths.ts";
import { PokemonProvider } from "./context/pokemonContext/pokemon.provider.tsx";
const HomePage = React.lazy(() => import("./pages/home/home.page.tsx"));
const DetailPage = React.lazy(() => import("./pages/details/details.page.tsx"));

function App() {
  return (
    <>
      <main>
        <PokemonProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path={ROUTES.HOME}
                element={
                  <Suspense fallback={<div>Loading</div>}>
                    <HomePage />
                  </Suspense>
                }
              />
              <Route
                path={ROUTES.DETAILS}
                element={
                  <Suspense fallback={<div>Loading</div>}>
                    <DetailPage />
                  </Suspense>
                }
              />
            </Routes>
          </BrowserRouter>
        </PokemonProvider>
      </main>
    </>
  );
}

export default App;
