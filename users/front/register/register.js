const registerForm = document.getElementById("registerForm");
const mensaje = document.getElementById("mensaje");
const submitRegister = document.getElementById("submitRegister");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);
  const data = {
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
      body: JSON.stringify(data),
    };

    const res = await fetch(url, options);
    const json = await res.json();

    if (res.ok) {
      mensaje.textContent = json.message;
      registerForm.reset();
    } else {
      mensaje.textContent = json.message || "Error al registrar el usuario";
    }
  } catch (error) {
    console.error("Error:", error);
    mensaje.textContent = "Error de conexión con el servidor";
  }
});
