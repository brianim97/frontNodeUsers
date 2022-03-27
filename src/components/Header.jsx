import "./header.css";
import { NavLink} from "react-router-dom";
import { useState,useRef, useContext } from "react";
import { LoginContext } from "../context/LoginContext";


export const Header = () => {
  const { logged, setLogged } = useContext(LoginContext);

  const logOut = (setLogged) => {
    setLogged(false);
    window.localStorage.clear();
    location.reload();
  };
  
  const [menuToggle, setMenuToggle] = useState(false);
  const refMenu = useRef();
  const refMenuBtn = useRef();
  const refNav = useRef();
  const refIconToggle = useRef();

  const handleToggleMenu = ()=>{
    if(menuToggle){
      setMenuToggle(false)
      refMenu.current.style.top = '-100%';
      refIconToggle.current.classList.replace('bi-x-lg','bi-list') 
    }else{
      setMenuToggle(true)
      const calculate = refNav.current.offsetTop + refNav.current.clientHeight-1;
      console.log(calculate);
      refMenu.current.style.top = calculate+'px';
      refIconToggle.current.classList.replace('bi-list','bi-x-lg') 
    }
}
  return (
    <>
    <div className="topNav"></div>
    <nav ref={refNav} className="navContainer">
      <button onClick={handleToggleMenu} ref={refMenuBtn} className="btnToggle"><i ref={refIconToggle} className="bi bi-list fs-1"></i></button>
      <ul ref={refMenu} className="ulItems">
        <li><NavLink className={({isActive})=>isActive?'active':''} to='/'>Home</NavLink></li>
        <li><NavLink className={({isActive})=>isActive?'active':''} to='/account'>Account</NavLink></li>
        <li><NavLink className={({isActive})=>isActive?'active':''} to='/products'>Products</NavLink></li>
        <li><NavLink className={({isActive})=>isActive?'active':''} to='/categories'>Categories</NavLink></li>
        <li><button style={{
          border:'none',
          backgroundColor:'transparent',
          padding:'0'
        }} onClick={()=>logOut(setLogged)}><span className="text-logout">Log Out</span> <i className="bi bi-power fs-2 icon-logout"></i></button></li>
      </ul>
    </nav>
    </>
  );
};
