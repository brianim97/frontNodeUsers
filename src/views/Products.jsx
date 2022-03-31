import { useContext, useState, useEffect } from "react";
import { Form } from "../components/Form";
import { FormProducts } from "../components/FormProducts";
import { ListProducts } from "../components/ListProducts";
import { Table } from "../components/Table";
import { LoginContext } from "../context/LoginContext";

export const Products = () => {
  const [products, setProducts] = useState(null);
  const { logged, setLogged } = useContext(LoginContext);
  const [dataToEdit, setDataToEdit] = useState(false);

  const findData = () => {
    fetch("https://brianiriarte.herokuapp.com/api/products", {
      headers: { "x-token": logged },
    })
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
        console.log(res);
      });
  };
  useEffect(() => {
    findData();
  }, []);

  const createData = (data) => {
    console.log(data);
    fetch("https://brianiriarte.herokuapp.com/api/products", {
      method:'post',
      headers: { 
        "x-token": logged,
        "Content-Type": "application/json"
      },
      body:JSON.stringify(data)
    })
      .then((res) => {
        if(res.status == 200){
          findData()
        }else{
          alert(res.json())
        }
      })
  };
  const updateData = () => {};
  const deleteData = () => {};
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-4 mt-5">
            <Form
              logged={logged}
              createData={createData}
              updateData={updateData}
              dataToEdit={dataToEdit}
              setDataToEdit={setDataToEdit}
            />
            {/* <FormProducts logged={logged} isEdit={isEdit} setProducts={setProducts} products={products} setIsEdit={setIsEdit}/> */}
          </div>
          <div className="col-12 col-md-8 mt-5">
            {/* <ListProducts logged={logged} products={products} setIsEdit={setIsEdit}/> */}
            <Table data={products} deleteData={deleteData} setDataToEdit={setDataToEdit} />
          </div>
        </div>
      </div>
    </>
  );
};
