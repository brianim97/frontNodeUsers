import { useEffect, useState } from "react";
import "../css/listProducts.css";

export const ListProducts = ({ logged, setIsEdit,products }) => {
 

  return (
    <>
      <div className="text-end text-secondary"><span className="border-bottom">Total: &nbsp;{products&& products.total}</span></div>
      <div className="table-responsive">
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
            {products ? (
              products.products.map((el) => (
                <tr key={el._id}>
                  <td>{el.name}</td>
                  <td>{el.categorie.name}</td>
                  <td>
                    <img src={el.img} className="w-25" alt="" />
                  </td>
                  <td>{el.price}</td>
                  <td>
                    <div className="d-flex justify-content-between">
                      <button onClick={() => setIsEdit(true)} className="btn ">
                        Editar
                      </button>
                      <button className="btn ">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center text-secondary">
                <td colSpan="5">Sin resultados..</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

//module.exports = {}
