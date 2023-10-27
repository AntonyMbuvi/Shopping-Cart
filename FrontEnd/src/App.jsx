import './static/App.css'
import AddClothes from './addclothes';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './homeCategory';
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
