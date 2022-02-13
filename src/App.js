import {Routes, Route} from "react-router-dom";
import {IndexPage} from "./pages/IndexPage/IndexPage";
import {Header} from "./components/Header/Header";

import s from './App.module.scss'
import {GamePage} from "./pages/GamePage/GamePage";

export const App = () => {
  return (
      <div className={s.app}>
          <Header />
          <Routes>
              <Route path="/" element={<IndexPage />}/>
              <Route path="/game/:slug" element={<GamePage />}/>
          </Routes>
      </div>
  );
}