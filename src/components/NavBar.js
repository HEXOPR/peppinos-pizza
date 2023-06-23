import { NavLink } from 'react-router-dom'
import './NavBar.css'
import {
    onAuthStateChanged,
    signOut
    } from "firebase/auth";
    import { db, auth } from '../firebase-config'
import { useState } from 'react';
    
export const NavBar = () => {
    const [user, setUSer] = useState({});
return(
<div className='navbar'>
<NavLink to ={"/"}> HOME </NavLink>
<NavLink to ={"/login"}> LOGIN </NavLink>
<NavLink to ={"/register"}> SIGN UP </NavLink>

</div>




)







}


