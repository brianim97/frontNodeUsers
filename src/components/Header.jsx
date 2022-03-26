import "./header.css";
import { Link} from "react-router-dom";
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
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/account'>Account</Link></li>
        <li><Link to='/products'>Products</Link></li>
        <li><Link to='/categories'>Categories</Link></li>
        <li><button style={{
          border:'none',
          backgroundColor:'transparent'
        }} onClick={()=>logOut(setLogged)}>Log Out</button></li>
      </ul>
    </nav>
    </>
  );
};
