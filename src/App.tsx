import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
const Home = lazy(() => import('./components/Home'));
const CountryInfo = lazy(() => import('./components/CountryInfo'));



const App: React.FC = () => {
  return (
    <div className='app' data-testid ="app">
      <Suspense fallback={<p>Loading...</p>}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home></Home>}> </Route>
            <Route path='/country/:name' element={<CountryInfo></CountryInfo>}></Route>
          </Routes>
        </BrowserRouter>
      </Suspense>

    </div>
  );
};

export default App;

