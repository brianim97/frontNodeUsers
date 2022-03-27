import { useState, useEffect } from "react";

export const FormProducts = ({logged,isEdit}) => {
    const [data, setData] = useState(null);
    console.log(data+'camnbiando');
    const [name, setName] = useState(null);
    const [category, setCategory] = useState(null);
    const [price, setPrice] = useState(null);
    const [img, setImg] = useState(null);
   
    useEffect(() => {
        fetch('https://brianiriarte.herokuapp.com/api/categories',{
            headers:{'x-token':logged}
        })
        .then(res=>res.json())
        .then(res=>{
            setData(res.categories)
            console.log(res);
        })
    }, [data]);

    const insertarProducto = (e)=>{
        e.preventDefault();
        let imgAux;
        if(img){
            imgAux=img 
        }else{
            imgAux='https://iwosa.com/wp-content/plugins/marketpress/ui/images/default-product.png'
        }
        let data={
            name,
            categorie:category,
            price,
            img:imgAux,
            user:localStorage.getItem('uid')
        }

        fetch('https://brianiriarte.herokuapp.com/api/products',{
            method:'post',
            headers:{
                'x-token':logged,
                'Content-Type': 'application/json'
        },
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(res=>{
            setData(res.categories)
            console.log(res);
        })
    }
  return (
    <form>
      <label>Nombre *</label>
      <input onChange={(e)=>setName(e.target.value)} type="text" className="form-control"/>

      <label className="mt-3">Categoria *</label>
      <select onChange={(e)=>setCategory(e.target.value)} value={category} className="form-control">
      {data && data.map(el=>((
          <option defaultValue={el._id} key={el._id} value={el._id}>{el.name}</option>
      )))}
      </select>

      <label className="mt-3">Precio *</label>
      <input onChange={(e)=>setPrice(e.target.value)} type="number" className="form-control" />

      <label className="mt-3">Imagen</label>
      <input onChange={(e)=>setImg(e.target.value)} type="file" className="form-control" />
      <button onClick={(e)=>insertarProducto(e)} className={isEdit? "btn btn-warning w-100 mt-2":"btn btn-dark w-100 mt-2"}>{isEdit? "Editar":"Insertar"}</button>
    </form>
  );
};
