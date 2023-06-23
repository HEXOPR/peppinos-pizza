import './Login.css'
import { useState } from 'react'
import {auth} from '../firebase-config.js'
import { signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {


    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const login =  async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            console.log(user)
        } catch (error) {
            //console.log(error.message)
            setLoginError(error.message)
        }
    }



    return(
         <div className='registerPage'>
            
            <h1 className='registerTitle'> login PAGE</h1>
            <div className='registerForm'>
            <h5> Your email</h5>
            <input onChange={(event) => setLoginEmail(event.target.value)} placeholder='your email' type='text'></input>
            <h5> Your password</h5>
            <input onChange={(event) => setLoginPassword(event.target.value)} type='password' placeholder='password'></input>
            <p className='errorText'> {loginError} </p>
            </div>
            <button onClick={login}> Log me in!</button>
        </div>
    )
}