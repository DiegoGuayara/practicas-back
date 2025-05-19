const login = () => {
  const form = document.getElementById("form-login");
  const mensaje = document.getElementById("mensaje");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const url = "http://localhost:10101/user/login";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };

      const response = await fetch(url, options);

      const data = await response.json();

      mensaje.textContent = `Usuario logueado: ${data.user.name}`;
      mensaje.style.color = "green";
      form.reset();
    } catch (error) {
      mensaje.textContent = `No se pudo iniciar sesion`;
      mensaje.style.color = "red";
    }
  });
};

document.addEventListener("DOMContentLoaded", login);
