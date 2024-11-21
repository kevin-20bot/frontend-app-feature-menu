const API_URL = "http://localhost:3000/api/products";

// Obtener todos los productos
export const getAlmacenropa = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

//Obtener Ropa por ID
export const getAlmacenropaByID = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
};

//Crear un Producto
export const addRopa = async (ropa) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ropa)
     });
    return response.json();
};

// Atualizar la ropa
export const updateRopa = async (id, ropa) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ropa)
    });
    return response.json();
};

//Borrar un Producto
export const deleteRopa = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    return response.json();
};
