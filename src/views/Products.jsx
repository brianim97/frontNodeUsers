import { useContext, useState, useEffect } from "react";
import { Form } from "../components/Form";
import { Table } from "../components/Table";
import { LoginContext } from "../context/LoginContext";
import "../css/products.css";

export const Products = () => {
  const [products, setProducts] = useState(null);
  const { logged, setLogged } = useContext(LoginContext);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loader, setLoader] = useState(false);

  const findData = () => {
    setLoader(true)
    fetch("https://brianiriarte.herokuapp.com/api/products", {
      headers: { "x-token": logged },
    })
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
        setLoader(false)
      });
  };
  useEffect(() => {
    findData();
  }, []);

  const createData = (data) => {
    setLoader(true)
    let status = null;
    fetch("https://brianiriarte.herokuapp.com/api/products", {
      method: "post",
      headers: {
        "x-token": logged,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status == 200) {
          status = 200;
        }
        return res.json();
      })
      .then(async(res) => {
        if (status == 200) {
          if (data.img) {
            let formData = new FormData();
            formData.append("archivo", data.img);
            await fetch("https://brianiriarte.herokuapp.com/api/uploads/products/" +
                res._id,
              {
                method: "put",
                headers: {
                  "x-token": logged,
                },
                body: formData,
              }
            ).then(res=>{
              if(res.status == 200){
                findData()
                setLoader(false)
              }
            })
          }
          setLoader(false)
        }
      });
      
  };
  const updateData = (data) => {
    fetch("https://brianiriarte.herokuapp.com/api/products/" + data._id, {
      method: "put",
      headers: {
        "x-token": logged,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status == 200) {
        findData();
      } else {
        alert(res.json());
      }
    });
  };
  const deleteData = (id) => {
    fetch("https://brianiriarte.herokuapp.com/api/products/" + id, {
      method: "delete",
      headers: {
        "x-token": logged,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status == 200) {
        findData();
      } else {
        alert(res.json());
      }
    });
  };
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
          {loader ?
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-blue" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          :
            <Table
              data={products}
              deleteData={deleteData}
              setDataToEdit={setDataToEdit}
            />
          }

          </div>
        </div>
      </div>
    </>
  );
};
