// conatct us form / feedback form

document
  .getElementById("contact-submit")
  .addEventListener("click", async (e) => {
    e.preventDefault();

    const userName = document.getElementById("contact-name").value;
    const Email = document.getElementById("contact-email").value;
    const Phone = document.getElementById("contact-phone").value;
    const Message = document.getElementById("contact-message").value;

    if (userName && Email && Phone && Message) {
      document.getElementById("contact-error-msg").innerText = "";
      document.getElementById("contact-submit").innerText = "Sending...";

      const response = await axios
        .post("http://localhost:8000/api/feedback/addFeedback", {
          userName,
          Email,
          Phone,
          Message,
        })
        .then((response) => {
          if (response.status === 201) {
            document.getElementById("contact-submit").innerText = "Submit";

            document.getElementById("contact-name").value = "";
            document.getElementById("contact-email").value = "";
            document.getElementById("contact-phone").value = "";
            document.getElementById("contact-message").value = "";

            document
              .getElementById("contact-error-msg")
              .classList.remove("text-red-500");
            document
              .getElementById("contact-error-msg")
              .classList.add("text-green-500");
            document.getElementById("contact-error-msg").innerText =
              "Message sent!";

            setTimeout(() => {
              document
                .getElementById("contact-error-msg")
                .classList.remove("text-green-500");
              document
                .getElementById("contact-error-msg")
                .classList.add("text-red-500");
              document.getElementById("contact-error-msg").innerText = "";
            }, 3000);
          } else {
            document.getElementById("contact-error-msg").innerText =
              "Something went wrong!";

            setTimeout(() => {
              document.getElementById("contact-error-msg").innerText = "";
            }, 3000);
          }
        });
    } else {
      document.getElementById("contact-error-msg").innerText =
        "Please fill all fields!";
    }
  });
