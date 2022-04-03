import "../css/header.css";
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
  const refUl = useRef();

  const handleToggleMenu = (e,data)=>{
    if(data == 'NavLink'){
      document.title = e.target.textContent;
      console.log(e);
    }
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
    <nav ref={refNav} className="navContainer">
      <div className="d-flex align-items-center">
        <button onClick={handleToggleMenu} ref={refMenuBtn} className="btnToggle"><i ref={refIconToggle} className="bi bi-list fs-1"></i></button>
        <h1 className="title">{document.title}</h1>
      </div>
      <div ref={refMenu} className="ulContainer">
        <ul ref={refUl} className="ulItems">
          <li><NavLink onClick={(e)=>handleToggleMenu(e,'NavLink')} className={({isActive})=>isActive?'active':''} to='/'>Inicio</NavLink></li>
          <li><NavLink onClick={(e)=>handleToggleMenu(e,'NavLink')} className={({isActive})=>isActive?'active':''} to='/account'>Cuenta</NavLink></li>
          <li><NavLink onClick={(e)=>handleToggleMenu(e,'NavLink')} className={({isActive})=>isActive?'active':''} to='/products'>Productos</NavLink></li>
          <li><NavLink onClick={(e)=>handleToggleMenu(e,'NavLink')} className={({isActive})=>isActive?'active':''} to='/categories'>Categorias</NavLink></li>
          <li><button style={{
            border:'none',
            backgroundColor:'transparent',
            padding:'0'
          }} onClick={()=>logOut(setLogged)}><span className="text-logout">Log Out</span> <i className="bi bi-power fs-2 icon-logout"></i></button></li>
        </ul>

      </div>
    </nav>
    </>
  );
};
