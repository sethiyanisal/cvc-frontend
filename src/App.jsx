import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Layout from './components/Layout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Map from './components/Map';
import Dashboard from './pages/Dashboard';
import PlanterMainPage from './pages/Planter/PlanterMainPage';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import AdminMainPage from './pages/Admin/AdminMainPage';

function App() {

  const ROLES = {
    "Planter": 'Planter',
    "Seller": 'Seller',
    "Admin": 'Admin'
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          
          {/* public routes */}
          {/* <Route path="/" element={<HomePage/>}></Route> */}
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/Login" element={<SignIn/>}></Route>
          <Route path="/SignUp" element={<SignUp/>}></Route>
          <Route path="/Map" element={<Map/>}></Route>

          <Route element={<RequireAuth allowedRole={[ROLES.Planter]}/>}>
                <Route path='/PlanterMainPage' element={<PlanterMainPage/>}></Route>
          </Route>

          <Route element={<RequireAuth allowedRole={[ROLES.Admin]}/>}>
                <Route path='/AdminMainPage' element={<AdminMainPage/>}></Route>
          </Route>

           <Route path='/unauthorized' element={<Unauthorized/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
