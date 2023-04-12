import { Routes, Route, BrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";

import NavBar from "./components/NavBar";
import PageTwo from "./components/PageTwo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="/pageTwo" element={<PageTwo />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
