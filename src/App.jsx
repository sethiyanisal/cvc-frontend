import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Layout from './components/Layout';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          
          {/* public routes */}
          <Route path="/" element={<HomePage/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
