import axios from 'axios';
import { useContext,useState,useEffect, useRef } from 'react';
import { Navigate, useNavigate,} from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import '../css/login.css'

export const Login = () => {
  const refError = useRef();
  const { logged, setLogged } = useContext(LoginContext);
  const [mail, setMail] = useState(localStorage.getItem('mail')?localStorage.getItem('mail'):'');
  const [password, setPassword] = useState(localStorage.getItem('pass')?localStorage.getItem('pass'):'');
  const [errors, setErrors] = useState('');

  const handleMail = (e)=>{
    setMail(e.target.value)
  }
  const handlePass = (e)=>{
    setPassword(e.target.value)
  }

  const handlerLogin = (e) => {
    e.preventDefault();
    axios
      .post('https://brianiriarte.herokuapp.com/api/auth/login', {
        mail,
        password,
      })
      .then(function (response) {
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('mail', response.data.user.mail);
        window.localStorage.setItem('pass', response.data.user.password);
        setLogged(true);
        location.reload();
      })
      .catch(function (error) {
        setErrors('Mail o contraseña invalido 😢😢🤷‍♂️🤷‍♀️')
        refError.current.classList.remove('d-none')
        setTimeout(() => {
          refError.current.classList.add('d-none')
        }, 5000);

      });
  };

 

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-md-4 m-auto mt-5'>
          <h4 className='text-center mb-4'>Bienvenid@</h4>
          <input placeholder='Mail..' type='text' className='form-control' value={mail} onChange={(e)=> handleMail(e)} autoComplete='off'/>
          <input
            value={password}
            onChange={(e)=>handlePass(e)}
            placeholder='Password..'
            type='password'
            className='form-control mt-2'
            autoComplete='off'
          />
          <div className='d-flex justify-content-between align-items-center mt-3'>
            <div className='d-flex flex-column'>
              <a className='fw-bold text-decoration-none text-dark' href='#'>
                Olvidaste tu contraseña?
              </a>
              <a className='fw-bold text-decoration-none text-dark' href='#'>
                Registrarme
              </a>
            </div>
            <button className='btn btn-dark p-2' onClick={handlerLogin}>
              INGRESAR
            </button>
          </div>
            
            
           
            <h6 ref={refError} className='alert alert-danger mt-3 text-center d-none'>{errors}</h6>
        </div>
      </div>
    </div>
  );
};
