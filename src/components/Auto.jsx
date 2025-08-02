import React, { useState, useEffect } from 'react';
import api from '../api/apiService';
import "../styles/Autos.css"

function Auto({ user }) {
  const [autos, setAutos] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    placa: '',
    modelo: '',
    marca: '',
    year: '',
    color: '',
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchAutos();
  }, []);

  // Autos filtrados por placa o modelo
  const filteredAutos = autos.filter((auto) =>
    auto.placa.toUpperCase().includes(searchTerm.toUpperCase()) ||
    auto.modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchAutos = async () => {
    try {
      const data = await api.fetchAutos();
      setAutos(data);
    } catch (error) {
      console.error("Error al obtener autos:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await api.updateAuto(formData.placa, formData);
      } else {
        await api.createAuto(formData);
      }

      fetchAutos();
      setFormData({ placa: '', modelo: '', marca: '', year: '', color: '' });
      setEditMode(false);
    } catch (error) {
      console.error("Error al guardar auto:", error);
    }
  };

  const handleDelete = async (placa) => {
    try {
      await api.deleteAuto(placa);
      fetchAutos();
    } catch (error) {
      console.error("Error al eliminar auto:", error);
    }
  };

  const handleEdit = (auto) => {
    setFormData({ ...auto });
    setEditMode(true);
  };

  return (
    <div className="auto-container">
      <h2>Gestión de Autos</h2>

      {/* Buscador */}
      <input
        type="text"
        className="search-input"
        placeholder="Buscar por placa o modelo"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Formulario */}
      <form className="auto-form" onSubmit={handleSubmit}>
        <input name="placa" value={formData.placa} onChange={handleChange} placeholder="Placa" required disabled={editMode} />
        <input name="marca" value={formData.marca} onChange={handleChange} placeholder="Marca" required />
        <input name="modelo" value={formData.modelo} onChange={handleChange} placeholder="Modelo" required />
        <input name="year" type="number" value={formData.year} onChange={handleChange} placeholder="Año" required />
        <input name="color" value={formData.color} onChange={handleChange} placeholder="Color" required />
        <button type="submit">{editMode ? "Actualizar" : "Crear"}</button>
        {editMode && <button type="button" onClick={() => {
          setEditMode(false);
          setFormData({ placa: '', modelo: '', marca: '', year: '', color: '' });
        }}>Cancelar</button>}
      </form>

      {/* Tabla de autos */}
      <table className="auto-table">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Color</th>
            <th>Año</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredAutos.map((auto) => (
            <tr key={auto.placa}>
              <td>{auto.placa}</td>
              <td>{auto.marca}</td>
              <td>{auto.modelo}</td>
              <td>{auto.color}</td>
              <td>{auto.year}</td>
              <td className="action-buttons">
                <button className="edit-btn" onClick={() => handleEdit(auto)}>Editar</button>
                <button className="delete-btn" onClick={() => handleDelete(auto.placa)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Auto;
