import {useEffect, useState} from 'react'
import '../css/listProducts.css'

export const ListProducts = ({logged,setIsEdit}) => {
    const [products, setProducts] = useState(null);
   
    useEffect(() => {
        fetch('https://brianiriarte.herokuapp.com/api/products',{
            headers:{'x-token':logged}
        })
        .then(res=>res.json())
        .then(res=>{
            setProducts(res)
            console.log(res);
        })
    }, []);
  
    return (
              <div className='table-responsive'>
                  <table className="table table-hover">
                      <thead>
                          <tr>
                              <th>Nombre</th>
                              <th>Categoria</th>
                              <th>Imagen</th>
                              <th>Precio</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                        {products && products.products.map(el=>(
                          <tr key={el._id}>
                             <td>{el.name}</td>
                              <td>{el.categorie.name}</td>
                              <td><img src={el.img} className='w-25' alt="" /></td>
                              <td>{el.price}</td>
                              <td>
                                <div className='d-flex justify-content-between'>
                                    <button onClick={()=>setIsEdit(true)} className='btn '>Editar</button>
                                    <button className='btn '>Eliminar</button>
                                </div>
                              </td>
                          </tr>))
                        }
                      </tbody>
                  </table>
              </div>
  )
}


//module.exports = {}