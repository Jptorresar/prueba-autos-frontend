const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/';

// credenciales de autenticación básica
// Puedes usar estas credenciales para autenticarte en el backend si es necesario
const credentials = btoa(`${process.env.REACT_APP_API_USERNAME}:${process.env.REACT_APP_API_PASSWORD}`);

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` }),
    };
  }

  async fetch(endpoint, method = 'GET', body = null) {
    const options = {
      method,
      headers: this.getHeaders(),
      credentials: 'include',
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return response.json();
  }


  // Métodos basicos para interactuar con la API
  fetchUsers() {
    return this.fetch("/users");
  }

  fetchUserById(id) {
    return this.fetch(`/users/${id}`);
  }

  fetchUserAutos(id) {
    return this.fetch(`/users/${id}/autos`);
  }

  fetchAllAutos() {
    return this.fetch("/autos/all");
  }

  fetchAutoByPlaca(placa) {
    return this.fetch(`/autos/${placa}`);
  }

  //Inicio de sesión
  login(formData) {
    return this.fetch("/auth/login", 'POST', formData);
  }

  //Autos CRUD
  fetchAutos() {
    return this.fetch("/autos/");
  }

  createAuto(auto) {
    return this.fetch("/autos/", "POST", auto);
  }

  deleteAuto(placa) {
    return this.fetch(`/autos/${placa}`, "DELETE");
  }

  updateAuto(placa, autoData) {
  return this.fetch(`/autos/${placa}`, 'PUT', autoData);
}
}


export default new ApiService();
