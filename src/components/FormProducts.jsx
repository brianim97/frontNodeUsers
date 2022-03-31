import { useState, useEffect,useRef } from "react";

const formInit = {
    name:'',
    category:'',
    price:0,
    img:''
}

export const FormProducts = ({logged,isEdit,setIsEdit,setProducts, products}) => {
    
    const [data, setData] = useState('');
    const [form, setForm] = useState({
       ...formInit
    })
   
    useEffect(() => {
        fetch('https://brianiriarte.herokuapp.com/api/categories',{
            headers:{'x-token':logged}
        })
        .then(res=>res.json())
        .then(res=>{
            setData(res.categories)
            setForm({...form, category:res.categories[0]._id})
            console.log(res);
        })
    }, []);
    const handleChange = (e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const formResetAndInsert = (e)=>{
        e.preventDefault()
        setForm({
          ...formInit,
          category:form.category
        })
        setIsEdit(false)
    }
    
    const insertarProducto = (e)=>{
        e.preventDefault();
        let imgAux;
        if(form.img){
            imgAux=form.img 
        }else{
            imgAux='https://iwosa.com/wp-content/plugins/marketpress/ui/images/default-product.png'
        }
        let data={
            name:form.name,
            categorie:form.category,
            price:form.price,
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
        .then(res=>{
            if(res.status == 200){
                const {name,categorie,price,img} = data;
                setProducts({...products.products,name,categorie,price,img})
            }
            return res.json()
        })
        .then(res=>console.log(res))
        
    }
  return (
    <form>
      <label>Nombre *</label>
      <input onChange={handleChange} name='name' value={form.name} type="text" className="form-control"/>

      <label className="mt-3">Categoria *</label>
      <select onChange={handleChange} name='category' value={form.category} className="form-control">
      {data && data.map(el=>((
          <option defaultValue={el._id} key={el._id} value={el._id}>{el.name}</option>
      )))}
      </select>

      <label className="mt-3">Precio </label>
      <input onChange={handleChange} name='price' value={form.price} type="number" className="form-control" />

      <label className="mt-3">Imagen</label>
      <input onChange={handleChange} name='img' type="file" value={form.img} className="form-control" />
      <div className="d-flex">
        <button onClick={insertarProducto} className={isEdit? "btn btn-warning w-100 mt-2":"btn btn-dark w-100 mt-2"}>{isEdit? "Editar":"Insertar"}</button>
        <button className="btn btn-success mt-2 ms-1" onClick={formResetAndInsert}>Limpiar</button>
      </div>
    </form>
  );
};
