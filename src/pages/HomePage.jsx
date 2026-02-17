import "./Pages.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="page">
      <h1 className="pageTitle">Home Page</h1>
      <button className="demoButton"
        onClick={() => {
          navigate("/demo");
        }}
      >
        Demo
      </button>
    </div>
  );
}

export default Home;