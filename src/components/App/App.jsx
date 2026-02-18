import { Routes, Route } from "react-router-dom";
import  Header  from "../Header/Header";
import Home from "../../pages/HomePage";
import Demo from "../../pages/DemoPage";
import Footer from "../Footer/Footer"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
