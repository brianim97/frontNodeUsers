import {useContext,useState} from 'react'
import { FormProducts } from '../components/FormProducts';
import { ListProducts } from '../components/ListProducts'
import { LoginContext } from '../context/LoginContext';


export const Products = () => {
  const { logged, setLogged } = useContext(LoginContext);
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-4 mt-5">
          <FormProducts logged={logged} isEdit={isEdit}/>
        </div>
        <div className="col-12 col-md-8 mt-5">
          <ListProducts logged={logged} setIsEdit={setIsEdit}/>
        </div>
      </div>
    </div>
    </>
  )
}
