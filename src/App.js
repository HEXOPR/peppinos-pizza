import logo from './logo.svg';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';



function App() {
return(
<div>
<Routes>


<Route path='/' element={<Home></Home>}></Route>
<Route path='/login' element={<Login></Login>}></Route>
<Route path='/register' element={<Register></Register>}></Route>



</Routes>


</div>

)
  
}

export default App;
