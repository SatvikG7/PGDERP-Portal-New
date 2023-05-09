import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import UserLogin from "./pages/UserLogin";
import FormComponent from './components/formComponent';
import UserRegister from "./pages/UserRegister";
import Coordinator from "./components/Coordinator/coordinator"

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin/>} exact></Route>
        <Route path="/register" element={<UserRegister/>}></Route>
        <Route path="/form" element={<FormComponent/>}></Route>
        <Route path="/coordinator/*" element={<Coordinator/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
