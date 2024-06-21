import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DetailPage from "./pages/DetailPage";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage/>} ></Route>
          <Route path="/detailsPage" element={<DetailPage/>} ></Route>
        </Routes>
        {/* <Footer/> */}
      </Router>
    </>
  );
}

export default App;
