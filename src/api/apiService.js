const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

// Codifica usuario y contraseña en Base64 desde variables de entorno
const credentials = btoa(`${process.env.REACT_APP_API_USERNAME}:${process.env.REACT_APP_API_PASSWORD}`);

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Basic ${credentials}`,
    };
  }

  async fetch(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: this.headers,
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


  fetchUsers() {
    return this.fetch("/users");
  }

  fetchUserById(id) {
    return this.fetch(`/users/${id}`);
  }

  fetchUserAutos(id) {
    return this.fetch(`/users/${id}/autos`);
  }

  fetchAutos() {
    return this.fetch("/autos");
  }

  fetchAutoByPlaca(placa) {
    return this.fetch(`/autos/${placa}`);
  }
}

export default new ApiService();
