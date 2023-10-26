import './App.css'
import AddClothes from './addclothes';
import Home from './home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addClothes" element={<AddClothes />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
