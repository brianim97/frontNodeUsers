import React from "react";

export const Table = ({ data, setDataToEdit, deleteData }) => {
  return (
    <div className="table-responsive">
      <table className="table table-dark">
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
                <td><a href={el.img}><img src={el.img} className='w-1' alt="" /></a></td>
                <td>
                  <div className="d-flex flex-column text-center">
                    <span className="btnEditarTable" onClick={()=>setDataToEdit(el)}>Editar</span>
                    <span className="btnEliminarTable mt-1"  onClick={()=>deleteData(el._id)} >Eliminar</span>
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
