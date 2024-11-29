// Importar los metodos de api.js
import { getAlmacenropa, getAlmacenropaByID, updateRopa, deleteRopa } from "./api.js";

// Traer todos los productos y mostrarlos en la pagina principal
document.addEventListener("DOMContentLoaded", async () => {
    const ropaList = document.getElementById ("ropa-list");

    const products = await getAlmacenropa();
    ropaList.innerHTML = products.map(ropa => `
      <div class="col-xs-12 col-sm-6 col-md-3 card">
      <img class="card-img-top" src="${ropa.imgUrl}">
        <div class="card-body d-flex flex-column justify-content-end">
            <h5 class="card-title">${ropa.name}</h5>
            <p class="card-text">${ropa.price}</p>
            <a onclick="viewRopa(${ropa.id})" class=btn btn-primary">Ver mas<a/>
        </div>
    </div>
    `).join("");
});

// Crear la vista de detalles para cada producto de ropa al dar click en el boton ver más
window.viewAlmacenropa = async (id) => {
    const ropa = await getAlmacenropaByID(id);
    const ropaDetails = `
      <div class="col">
        <img class="img-fluid" src="${ropa.imgUrl}">
        <h3>${ropa.name}</h3>
        <p>${ropa.description}</p>
        <p>Precio: ${new Intl.NumberFormat('en-ES', { style: 'currency', currency: 'USD' }).format(ropa.price)}</p>
        <button class="btn btn-warning" onclick="enableEdit(${ropa.id})">Editar</button>
        <button class="btn btn-danger" onclick="deleteProduct(${ropa.id})">Eliminar</button>
      </div>
      `;
    document.getElementById('almacenropa-list').innerHTML = ropaDetails;
  };
  
  // Habilitamos el formulario para editar la ropa
window.enableEdit = async (id) => {
    const ropa = await getAlmacenropaByID(id);
    const editForm = `
      <div class="row gap-3">
        <input type="text" id="name" value="${ropa.name}">
        <textarea id="description">${ropa.description}</textarea>
        <input type="number" id="price" value="${ropa.price}">
        <input type="text" id="imgUrl" value="${ropa.imgUrl}">
        <button class="btn btn-success" onclick="saveEdit(${id})">Guardar</button>
      </div>
      `;
    document.getElementById('almacenropa-list').innerHTML = editForm;
  };

  // Guardamos la nueva información en nuestra base de datos
window.saveEdit = async (id) => {
    const updatedRopa = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      price: parseFloat(document.getElementById('price').value),
      imgUrl: document.getElementById('imgUrl').value
    };
    await updateRopa(id, updatedRopa);
    location.reload();
  };
  
  // Función para borrar el producto seleccionado
  window.deleteRopa = async (id) => {
    await deleteRopa(id);
    location.reload();
  };
