import "./style.css";
import axios from "axios";

// tours

const getAllTours = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/tour/getAllTours"
    );
    const toursCardsInfo = response.data.data;
    let cardsHTML = "";

    toursCardsInfo.forEach((card) => {
      cardsHTML += `
            <div class="rounded overflow-hidden shadow-lg">
            <img class="w-full h-[200px] overflow-hidden object-cover" src=${card.ImageUrl} alt=${card.Title}>
            <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">${card.Title}</div>
            <p class="text-gray-700 text-base">
                ${card.Description}
            </p>
            </div>
            <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
            </div>
        </div>
            `;
    });

    document.querySelector(".tours-container").innerHTML = cardsHTML;
  } catch (error) {
    console.log(error);
  }
};

getAllTours();

// admin tour crud

// Function to display cards based on the selected menu
const displayTours = async () => {
  const cardContainer = document.getElementById("cardContainer");

  const response = await axios.get(
    "http://localhost:8000/api/tour/getAllTours"
  );
  const data = response.data.data;
  cardContainer.innerHTML = "";
  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("bg-white", "p-4", "rounded", "shadow");
    card.innerHTML = `
          <img src="${item.ImageUrl}" alt="${item.Title}" class="h-32 w-full object-cover mb-4">
          <h2 class="text-lg font-semibold">${item.Title}</h2>
          <p class="text-sm text-gray-600 mb-2">${item.Description}</p>
          <p class="text-sm font-semibold">${item.Price}</p>
          <div class="mt-4">
            <button class="bg-blue-500 text-white px-2 py-1 rounded mr-2 editBtn">Edit</button>
            <button class="bg-red-500 text-white px-2 py-1 rounded deleteBtn">Delete</button>
          </div>
        `;
    // cardContainer.innerHTML = cardHTML;
    cardContainer.appendChild(card);

    // Edit button click event
    card.querySelector(".editBtn").addEventListener("click", () => {
      document.getElementById("tour-form").classList.remove("hidden");
      document.getElementById("title").value = item.Title;
      document.getElementById("description").value = item.Description;
      document.getElementById("price").value = item.Price;
      document.getElementById("location").value = item.Location;
      document.getElementById("duration").value = item.Duration;
      document.getElementById("schedule").value = item.Schedule;
      document.getElementById("groupSize").value = item.GroupSize;
      document.getElementById("availability").value = item.Availability;
      document.getElementById("tag").value = item.Tag;

      //   document.getElementById("image").value = item.ImageUrl;

      // Save button for editing a record
      document.getElementById("saveBtn").innerText = "Edit";
      document
        .getElementById("saveBtn")
        .addEventListener("click", async function (e) {
          e.preventDefault();

          const formData = new FormData(); // Create a FormData object
          formData.append("Title", document.getElementById("title").value);
          formData.append(
            "Description",
            document.getElementById("description").value
          );
          formData.append("Price", document.getElementById("price").value);
          formData.append(
            "Duration",
            document.getElementById("duration").value
          );
          formData.append(
            "Location",
            document.getElementById("location").value
          );
          formData.append(
            "Schedule",
            document.getElementById("schedule").value
          );
          formData.append(
            "GroupSize",
            document.getElementById("groupSize").value
          );
          formData.append(
            "Availability",
            document.getElementById("availability").value
          );
          formData.append("Tag", document.getElementById("tag").value);
          formData.append("image", document.getElementById("image").files[0]);

          if (!document.getElementById("image").value) {
            alert("Please upload an image!");
            return;
          }

          if (
            formData.get("Title") &&
            formData.get("Description") &&
            formData.get("Price") &&
            formData.get("Duration") &&
            formData.get("Location") &&
            formData.get("Schedule") &&
            formData.get("GroupSize") &&
            formData.get("Availability") &&
            formData.get("Tag") &&
            formData.get("image")
          ) {
            // pass this data to api with axios put
            await axios
              .put(
                `http://localhost:8000/api/tour/updateTour/${item.id}`,
                formData
              )
              .then((response) => {
                // reload window
                window.location.reload();
              })
              .catch((error) => {
                console.error("Error updating tour:", error);
              });
            document.getElementById("tour-form").classList.add("hidden");
          } else {
            alert("Please fill in all fields!");
          }
        });
    });

    // Delete button click event
    card.querySelector(".deleteBtn").addEventListener("click", async () => {
      // asking for confirm
      const confirmDelete = confirm(
        "Are you sure you want to delete this tour?"
      );
      if (confirmDelete) {
        await axios
          .delete(`http://localhost:8000/api/tour/deleteTour/${item.id}`)
          .then((response) => {
            // Handle successful deletion and refresh the display
            displayCards();
          })
          .catch((error) => {
            console.error("Error deleting tour:", error);
          });
      }
    });
  });
};

// Show Tours by default
displayTours();

// Toggle form visibility and populate data on Edit button click
document.getElementById("toursBtn").addEventListener("click", () => {
  document.getElementById("tour-form").classList.add("hidden");
  displayCards();
});

// Show/hide form on Cancel button click
document.getElementById("cancelBtn").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("tour-form").classList.add("hidden");
});

// code starts here for adding a new tour
// Add button click event to add new record
document.getElementById("addTourBtn").addEventListener("click", () => {
  document.getElementById("tour-form").classList.remove("hidden");
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
  document.getElementById("location").value = "";
  document.getElementById("duration").value = "";
  document.getElementById("schedule").value = "";
  document.getElementById("groupSize").value = "";
  document.getElementById("availability").value = "";
  document.getElementById("tag").value = "";

  // Save button for adding a new record
  document.getElementById("saveBtn").innerText = "Add";

  document
    .getElementById("saveBtn")
    .addEventListener("click", async function (e) {
      e.preventDefault();

      const formData = new FormData(); // Create a FormData object

      // Append form field values to the FormData object
      formData.append("Title", document.getElementById("title").value);
      formData.append(
        "Description",
        document.getElementById("description").value
      );
      formData.append("Price", document.getElementById("price").value);
      formData.append("Duration", document.getElementById("duration").value);
      formData.append("Location", document.getElementById("location").value);
      formData.append("Schedule", document.getElementById("schedule").value);
      formData.append("GroupSize", document.getElementById("groupSize").value);
      formData.append(
        "Availability",
        document.getElementById("availability").value
      );
      formData.append("Tag", document.getElementById("tag").value);
      formData.append("image", document.getElementById("image").files[0]);

      if (!document.getElementById("image").value) {
        alert("Please upload an image!");
        return;
      }

      if (
        formData.get("Title") &&
        formData.get("Description") &&
        formData.get("Price") &&
        formData.get("Duration") &&
        formData.get("Location") &&
        formData.get("Schedule") &&
        formData.get("GroupSize") &&
        formData.get("Availability") &&
        formData.get("Tag") &&
        formData.get("image")
      ) {
        // pass this data to api with axios put
        await axios
          .post(`http://localhost:8000/api/tour/addTour`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            // Handle successful update and refresh the display
            displayCards();
          })
          .catch((error) => {
            console.error("Error updating tour:", error);
          });
        document.getElementById("tour-form").classList.add("hidden");
      } else {
        alert("Please fill in all fields!");
      }
    });
});

// Logout button action (dummy action)

document.getElementById("logoutBtn").addEventListener("click", () => {
  alert("Logout clicked");
  // Perform logout functionality here
});
