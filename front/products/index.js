const productRegistration = () => {
  // Formulario de registro de productos
  const form = document.getElementById("form-producto");
  const mensaje = document.getElementById("mensaje");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const producto = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      codeBar: formData.get("codeBar"),
    };

    try {
      const url = "http://localhost:10102/products/register";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      };

      const response = await fetch(url, options);
      const result = await response.json();

      mensaje.textContent = `Producto registrado: ${result.product.name}`;
      mensaje.style.color = "green";
      form.reset();

      const li = document.createElement("li");
      li.textContent = `${result.product.name} - ${result.product.description} - ${result.product.price}`;
      document.getElementById("lista-productos").appendChild(li);
    } catch (error) {
      console.error("Error:", error);
      mensaje.textContent = `Este producto ya existe`;
      mensaje.style.color = "red";
    }
  });
};

const productsList = () => {
  // Obtener productos
  fetch("http://localhost:10102/products/getProducts")
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo obtener los datos");
      }

      return response.json();
    })
    .then((data) => {
      const lista = document.getElementById("lista-productos");

      data.forEach((producto) => {
        const li = document.createElement("li");
        li.textContent = `${producto.name} - ${producto.description} - ${producto.price}`;
        lista.appendChild(li);
      });
    })
    .catch((error) => {
      mensaje.textContent = `Error al obtener los productos`;
      mensaje.style.color = "red";
      console.error("Error:", error);
    });
};

const deleteProduct = () => {
  const form = document.getElementById("delete-producto");
  const mensaje = document.getElementById("mensaje2");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
ñ
    const formData = new FormData(form);
    const products = {
      name: formData.get("name"),
      description: formData.get("description"),
    };

    try {
      const url = "http://localhost:10102/products/deleteProduct";
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(products),
      };

      const response = await fetch(url, options);
      const result = await response.json();

      mensaje.textContent = `Producto eliminado: ${result.product.name}`;
      mensaje.style.color = "green";
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      mensaje.textContent = `No se pudo eliminar el producto`;
      mensaje.style.color = "red";
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  productRegistration();
  productsList();
  deleteProduct();
});
