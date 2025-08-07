import { ROUTES } from '@constants/routepaths';
import { PokemonProvider } from '@context/pokemonContext/pokemon.provider';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'rsuite/dist/rsuite.min.css';
import 'rsuite/styles/index.less';
import './App.css';

// Lazy load components with proper TypeScript typing
const HomePage = React.lazy(() => import('@pages/home/home.page'));

const App: React.FC = () => (
  <main>
    <PokemonProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={ROUTES.HOME}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <HomePage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </PokemonProvider>
  </main>
);

export default App;
