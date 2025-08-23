import React, { useState, useEffect } from "react";
import api from "../api/apiService";
import "../styles/Autos.css";
import placeholderAuto from "../resources/auto.png";
import { Save, X, Trash2, Pencil } from "lucide-react";

function Auto({ user }) {
  const [autos, setAutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    placa: "",
    modelo: "",
    marca: "",
    year: "",
    color: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null); // placa del auto a eliminar

  useEffect(() => {
    fetchAutos();
  }, []);

  const fetchAutos = async () => {
    try {
      const data = await api.fetchAutos();
      setAutos(data);
    } catch (error) {
      console.error("Error al obtener autos:", error);
    }
  };

  const filteredAutos = autos.filter(
    (auto) =>
      auto.placa.toUpperCase().includes(searchTerm.toUpperCase()) ||
      auto.modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      resetForm();
    } catch (error) {
      console.error("Error al guardar auto:", error);
    }
  };

  const handleEdit = (auto) => {
    setFormData({ ...auto });
    setEditMode(true);
  };

  const resetForm = () => {
    setFormData({ placa: "", modelo: "", marca: "", year: "", color: "" });
    setEditMode(false);
  };

  const confirmDeleteAuto = (placa) => {
    setConfirmDelete(placa);
  };

  const handleDelete = async () => {
    try {
      await api.deleteAuto(confirmDelete);
      fetchAutos();
      setConfirmDelete(null);
    } catch (error) {
      console.error("Error al eliminar auto:", error);
    }
  };

  return (
    <div className="autos-page-green">
      <div className="autos-container">
        {/* ====== FORMULARIO ====== */}
        <div className="form-card">
          <h3 className="form-title">
            {editMode ? "Editar Automóvil" : "Nuevo Automóvil"}
          </h3>
          <form onSubmit={handleSubmit} className="auto-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Placa</label>
                <input
                  type="text"
                  name="placa"
                  value={formData.placa}
                  onChange={handleChange}
                  placeholder="Placa"
                  required
                />
              </div>
              <div className="form-group">
                <label>Marca</label>
                <input
                  type="text"
                  name="marca"
                  value={formData.marca}
                  onChange={handleChange}
                  placeholder="Marca"
                  required
                />
              </div>
              <div className="form-group">
                <label>Modelo</label>
                <input
                  type="text"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  placeholder="Modelo"
                  required
                />
              </div>
              <div className="form-group">
                <label>Año</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="Año"
                  required
                />
              </div>
              <div className="form-group">
                <label>Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="Color"
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn primary">
                <Save className="icon" />
                {editMode ? "Actualizar" : "Guardar"}
              </button>
              {editMode && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn cancel"
                >
                  <X className="icon" />
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="form-card">{/* ====== TABLA ====== */}
          <div className="table-section">
            <h2>Gestión de Autos</h2>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar por placa o modelo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <table className="auto-table">
              <thead>
                <tr>
                  <th>Foto</th>
                  <th>Placa</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Color</th>
                  <th>Año</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredAutos.length > 0 ? (
                  filteredAutos.map((auto) => (
                    <tr key={auto.placa}>
                      <td>
                        <img
                          src={auto.imagen || placeholderAuto}
                          alt={`Imagen de ${auto.marca} ${auto.modelo}`}
                          className="auto-img"
                        />
                      </td>
                      <td>{auto.placa}</td>
                      <td>{auto.marca}</td>
                      <td>{auto.modelo}</td>
                      <td>{auto.color}</td>
                      <td>{auto.year}</td>
                      <td className="action-buttons">
                        <button
                          className="btn small edit"
                          onClick={() => handleEdit(auto)}
                        >
                          <Pencil className="icon" /> Editar
                        </button>
                        <button
                          className="btn small delete"
                          onClick={() => confirmDeleteAuto(auto.placa)}
                        >
                          <Trash2 className="icon" /> Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-data">
                      No se encontraron autos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div></div>


        {/* ====== MODAL CONFIRMACIÓN ====== */}
        {confirmDelete && (
          <div className="modal-overlay">
            <div className="confirm-modal">
              <h3>¿Eliminar auto?</h3>
              <p>¿Seguro que deseas eliminar el auto con placa <b>{confirmDelete}</b>?</p>
              <div className="modal-actions">
                <button className="btn delete" onClick={handleDelete}>
                  Confirmar
                </button>
                <button
                  className="btn cancel"
                  onClick={() => setConfirmDelete(null)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Auto;
