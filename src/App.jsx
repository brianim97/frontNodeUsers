import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {Header} from './components/Header'
import {BrowserRouter,Route, Routes,Navigate} from 'react-router-dom';
import { Home } from './views/Home';
import { Account } from './views/Account';
import { Contact } from './views/Contact';
import { Register } from './views/Register';
import {LoginProvider,LoginContext} from './context/LoginContext';
import { Login } from './views/Login';
import {useContext, useState, useEffect} from 'react'
import { Products } from './views/Products';
import { Categories } from './views/Categories';
import './css/app.css'

function App() {
  const [logged, setLogged] = useState(localStorage.getItem('token')); 
  const token = localStorage.getItem('token');
 
    if(token){
      fetch('https://brianiriarte.herokuapp.com/api/auth/token-verify',{
      method:'post',
      headers:{
        'x-token': token
      }
    })
    .then(res=>{
      if(res.status == 204){
        setLogged(token)
      }else{
        setLogged(false)
      }
    })

    }
  
    
  
  return (
    <LoginProvider>
      <BrowserRouter>
      {logged?
        <>
        <Header/>
        <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/account' element={<Account/>}/>
              <Route path='/contact' element={<Contact/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/products' element={<Products/>}/>
              <Route path='/categories' element={<Categories/>}/>
              <Route path='/*' element={<Navigate to='/'/>}/>
          </Routes>
        </>
          :
          <>
          {location.pathname != "/login"  ?
              <Login/>
              :
              ''
          }  
         
          
          <Routes>
              <Route path='/login' element={<Login/>}/>
          </Routes>
          
          </>
          }
      </BrowserRouter>
    </LoginProvider>
  )
}

export default App
