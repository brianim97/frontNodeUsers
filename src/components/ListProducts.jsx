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
            setProducts(res.products)
            console.log(res);
        })
    }, []);
  
    return (
        <>
          {products && products.map(el=>(
            <div key={el._id} className="card" style={{width: '18rem'}}>
                <div className="card-body">
                <h5 className="card-title">{el.name}</h5>
                <h6 className='text-secondary'>{el.categorie.name}</h6>
                <img className='img-fluid' src={el.img} alt="" />
                <h5 className="text-center py-2">$&nbsp;{el.price}</h5>
                <div className='d-flex justify-content-between'>
                    <button onClick={()=>setIsEdit(true)} className='btn '>Editar</button>
                    <button className='btn '>Eliminar</button>
                </div>
                </div>
            </div>
          ) )}
        </>
  )
}


//module.exports = {}