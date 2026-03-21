import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Map from './components/Map';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          
          {/* public routes */}
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/Login" element={<SignIn/>}></Route>
          <Route path="/SignUp" element={<SignUp/>}></Route>
          <Route path="/Map" element={<Map/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
