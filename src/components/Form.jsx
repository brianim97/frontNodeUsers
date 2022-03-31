import React, {useState,useEffect} from "react";

const initialForm = {
    name:'',
    categorie:'',
    price:'',
    img:'',
    user:localStorage.getItem('uid'),
    id:null
}

export const Form = ({createData, updateData, dataToEdit,logged}) => {
    const [form, setForm] = useState(initialForm);
    const [categories, setCategories] = useState(null);
    

    useEffect(() => {
        fetch("https://brianiriarte.herokuapp.com/api/categories", {
      headers: { "x-token": logged },
    })
      .then((res) => res.json())
      .then((res) => {
        setCategories(res.categories);
        console.log(res);
        setForm({...form,categorie:res.categories[0]._id})
      });
    }, []);

    const handleChange = (e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!form.name){
            alert('Es necesario el campo nombre');
            return
        }
        if(form.id === null){
            createData(form)
        }else{
            updateData(form)
        }
        handleReset();
    }

    const handleReset = (e)=>{
        setForm({...initialForm,categorie:categories[0]._id});
    }
  return (
    <div>
      <h3>Agregar</h3>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={form.name} name="name" className="form-control mt-2" type="text" />
        <select onChange={handleChange} value={form.categorie} name="categorie" className="form-control mt-2">
            {categories && categories.map(el=>(
                <option key={el._id} value={el._id}>{el.name}</option>
            ))}
        </select>
        <input onChange={handleChange} value={form.price} name="price" className="form-control mt-2" type="number" />
        <input onChange={handleChange} value={form.img} name="img" className="form-control mt-2" type="file" />
        <div className="d-flex">
            <button onClick={handleSubmit} type="submit" className="btn btn-dark mt-2 w-100">Agregar</button>
            <button onClick={handleReset} type="reset" className="btn btn-info mt-2 ms-1">Limpiar</button>
        </div>
      </form>
    </div>
  );
};
