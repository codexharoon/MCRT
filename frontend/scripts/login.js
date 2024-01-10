// admin login

// localStorage.setItem("admin", "false");

window.addEventListener("load", function () {
  this.document
    .getElementById("login-form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (email && password) {
        try {
          await axios
            .post("http://localhost:8000/api/admin/adminLogin", {
              email,
              password,
            })
            .then(function (response) {
              console.log(response);
              if (response.data.success) {
                localStorage.setItem("admin", "true");
                window.location.href = "http://localhost:5173/Dashboard.html";
              } else {
                document.getElementById("login-error-msg").innerHTML =
                  "Invalid credentials";
              }
            });
        } catch (error) {
          console.log(error);
          document.getElementById("login-error-msg").innerHTML =
            "Invalid credentials";
        }
      } else {
        document.getElementById("login-error-msg").innerHTML =
          "Please fill all the fields";

        setTimeout(() => {
          document.getElementById("login-error-msg").innerHTML = "";
        }, 5000);
      }
    });
});
