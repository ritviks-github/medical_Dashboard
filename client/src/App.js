import './App.css';
import {Routes,Route} from 'react-router-dom'
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Dashboard from './screens/Dashboard';
import AuthReq from './screens/AuthReq';
import ViewReports from './screens/ViewReports';
import PatientInfo from './screens/PatientInfo';
import Filter from './screens/Filter';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/authReq' element={<AuthReq />} />
        <Route path='/viewRep' element={<ViewReports />} />
        <Route path='/info' element={<PatientInfo />} />
        <Route path='/filter' element={<Filter />} />
      </Routes>
    </div>
  );
}

export default App;