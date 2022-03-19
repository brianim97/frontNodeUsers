import './header.css'
import {Link, useNavigate} from 'react-router-dom';
import {useState,useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { logOut } from '../helpers/logOut';



export const Header = () => {
    let navigate = useNavigate();
    const {logged,setLogged} = useContext(LoginContext)
    console.log(logged)
   
    
  return (
        // { !logged ? navigate('/login') 
        //   : ''
        // }
        <div className="container-fluid bg-dark text-light" >
            <div className="row">
                <div className="nav justify-content-end">
                    <ul className="d-flex list-unstyled m-0 p-3 fw-bold link-item">
                        <li className="p-1"><Link className="text-decoration-none" to="/">Home</Link></li>
                        <li className="p-1"><Link className="text-decoration-none" to="/account">Account</Link></li>
                        <li className="p-1"><Link className="text-decoration-none" to="/contact">Contact</Link></li>
                        <li className="p-1"><Link className="text-decoration-none" to="/register">Register</Link></li>
                        <li className="p-1"><button className='btn btn-light' onClick={()=>logOut(setLogged)}>Log Out</button></li>
                    </ul>
                </div>

            </div>
        </div>
       
  )
}
