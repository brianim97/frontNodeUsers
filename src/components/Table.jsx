import React from "react";

export const Table = ({ data, setDataToEdit, deleteData }) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data ?
            data.map(el => (
              <tr key={el._id}>
                <td>{el.name}</td>
                <td>{el.categorie.name}</td>
                <td>{el.price}</td>
                <td>{el.img}</td>
                <td>
                  <div className="d-flex flex-column">
                    <button className="btn btn-warning " onClick={()=>setDataToEdit(el)}>Editar</button>
                    <button className="btn btn-danger  mt-1"  onClick={()=>deleteData(el)} >Eliminar</button>
                  </div>
                </td>
              </tr>
            ))
            :
            <tr className="text-center text-secondary"><td colSpan='5'>Sin resultados..</td></tr>
        }
        </tbody>
      </table>
    </div>
  );
};
