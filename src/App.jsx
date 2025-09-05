import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Videos from "./components/Videos";
import Home from "./components/Home";
import RealTodo from "./components/RealTodo";
import History from "./components/History";
import About from "./components/About";
import Authentication from "./components/Authentication";
import Footer from "./components/Footer";
import YoutubeNav from "./components/YoutubeNav";
import Navbar from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>
      <YoutubeNav />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playground" element={<RealTodo />} />
        <Route path="/history" element={<History />} />
        <Route path="/about" element={<About />} />
        <Route path="/LoginSignup" element={<Authentication />} />
        <Route path="/videos" element={<Videos />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
