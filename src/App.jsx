import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DetailPage from "./pages/DetailPage";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage/>} ></Route>
          <Route path="/detailsPage" element={<DetailPage/>} ></Route>
          <Route path="/cart" element={<Cart/>} ></Route>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
