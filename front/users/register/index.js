const userRegistration = () => {
  const form = document.getElementById("form-usuario");
  const mensaje = document.getElementById("mensaje");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const url = "http://localhost:10101/user/register";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };

      const response = await fetch(url, options);
      const data = await response.json();

      mensaje.textContent = `Usuario registrado: ${data.user.name}`;
      mensaje.style.color = "green";
      form.reset();

      const li = document.createElement("li");
      li.textContent = `${data.user.name} - ${data.user.email}`;
      document.getElementById("listaUsuarios").appendChild(li);
    } catch (error) {
      mensaje.textContent = `No se pudo registrar el usuario`;
      mensaje.style.color = "red";
    }
  });
};

const userList = () => {
  fetch("http://localhost:10101/user/getUser")
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo obtener los datos");
      }

      return response.json();
    })
    .then((data) => {
      const lista = document.getElementById("listaUsuarios");

      data.users.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = `${user.name} - ${user.email}`;
        lista.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  userRegistration();
  userList();
});
