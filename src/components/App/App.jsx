import { Routes, Route } from "react-router-dom";
import  Header  from "../Header/Header";
import Home from "../../pages/HomePage";
import Demo from "../../pages/DemoPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </>
  );
}

export default App;
