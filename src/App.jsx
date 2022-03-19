import 'bootstrap/dist/css/bootstrap.min.css'
import {Header} from './components/Header'
import {BrowserRouter,Route, Routes,useNavigate} from 'react-router-dom';
import { Home } from './views/Home';
import { Account } from './views/Account';
import { Contact } from './views/Contact';
import { Register } from './views/Register';
import {LoginProvider,LoginContext} from './context/LoginContext';
import { Login } from './views/Login';
import {useContext, useState} from 'react'




function App() {
  const [logged, setLogged] = useState(localStorage.getItem('token'));
 

  return (
    <LoginProvider>
      <BrowserRouter>
      {logged && <Header/>}
        <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/account' element={<Account/>}/>
              <Route path='/contact' element={<Contact/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
          </Routes>
      </BrowserRouter>
    </LoginProvider>
  )
}

export default App
