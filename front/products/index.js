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

      if (!response.ok) {
        mensaje.textContent = `Error: ${result.error}`;
        mensaje.style.color = "red";
        return;
      }

      mensaje.textContent = `Producto registrado: ${result.product.name}`;
      mensaje.style.color = "green";
      form.reset();

      const li = document.createElement("li");
      li.textContent = `${result.product.name} - ${result.product.description} - ${result.product.price}`;
      document.getElementById("lista-productos").appendChild(li);
    } catch (error) {}
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
      console.error("Error:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  productRegistration();
  productsList()
});
