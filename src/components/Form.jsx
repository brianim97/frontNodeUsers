import React, { useState, useEffect } from "react";

const initialForm = {
  name: "",
  categorie: "",
  price: "",
  img: "",
  user: localStorage.getItem("uid"),
  id: null,
};

export const Form = ({
  createData,
  updateData,
  dataToEdit,
  logged,
  setDataToEdit,
}) => {
  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    if (dataToEdit) {
      const dataAux = {
        _id: dataToEdit._id,
        name: dataToEdit.name,
        categorie: dataToEdit.categorie._id,
        price: dataToEdit.price,
        img: "",
      };

      console.log(dataAux);
      setForm(dataAux);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  useEffect(() => {
    fetch("https://brianiriarte.herokuapp.com/api/categories", {
      headers: { "x-token": logged },
    })
      .then((res) => res.json())
      .then((res) => {
        setCategories(res.categories);
        console.log(res);
        setForm({ ...form, categorie: res.categories[0]._id });
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) {
      alert("Es necesario el campo nombre");
      return;
    }
    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }
    handleReset();
  };
  const handleFileChange = (e) => setForm({...form, [e.target.name]: e.target.files[0]})

  const handleReset = (e) => {
    setForm({ ...initialForm, categorie: categories[0]._id });
    setDataToEdit(null);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="p-5">
        <label htmlFor="">Nombre *</label>
        <input
          onChange={handleChange}
          value={form.name}
          name="name"
          className="form-control"
          type="text"
        />
        <label className="mt-2" htmlFor="">Categoria *</label>
        <select
          onChange={handleChange}
          value={form.categorie}
          name="categorie"
          className="form-control"
        >
          {categories &&
            categories.map((el) => (
              <option key={el._id} value={el._id}>
                {el.name}
              </option>
            ))}
        </select>
        <label className="mt-2" htmlFor="">Precio</label>
        <input
          onChange={handleChange}
          value={form.price}
          name="price"
          className="form-control"
          type="number"
        />
        <label className="mt-2" htmlFor="">Imagen</label>
        <input
          onChange={handleFileChange}
          name="img"
          className="form-control"
          type="file"
        />
        {form.img && <img src={form.img} className="image-fluid" />}
        <div className="d-flex justify-content-evenly">
          {dataToEdit ? (
            <span
              onClick={handleSubmit}
              type="submit"
              className="f-s btnEditar mt-2"
            >
              Editar
            </span>
          ) : (
            <span
              onClick={handleSubmit}
              type="submit"
              className="f-s btnAgregar mt-2"
            >
              Agregar
            </span>
          )}
          <span
            onClick={handleReset}
            type="reset"
            className="f-s btnLimpiar mt-2 ms-1"
          >
            Limpiar
          </span>
        </div>
      </form>
    </div>
  );
};
