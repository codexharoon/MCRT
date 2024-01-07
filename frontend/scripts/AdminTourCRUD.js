import axios from "axios";

// Function to display cards based on the selected menu
const displayCards = async () => {
  const cardContainer = document.getElementById("cardContainer");

  const response = await axios.get(
    "http://localhost:8000/api/tour/getAllTours"
  );
  const data = response.data.data;
  console.log(data);
  //   let cardHTML = "";
  cardContainer.innerHTML = "";
  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("bg-white", "p-4", "rounded", "shadow");
    cardHTML += `
          <img src="${item.ImageUrl}" alt="${item.Title}" class="h-32 w-full object-cover mb-4">
          <h2 class="text-lg font-semibold">${item.Title}</h2>
          <p class="text-sm text-gray-600 mb-2">${item.Description}</p>
          <p class="text-sm font-semibold">${item.Price}</p>
          <div class="mt-4">
            <button class="bg-blue-500 text-white px-2 py-1 rounded mr-2 editBtn">Edit</button>
            <button class="bg-red-500 text-white px-2 py-1 rounded deleteBtn">Delete</button>
          </div>
        `;
    cardContainer.innerHTML = cardHTML;

    // Edit button click event
    card.querySelector(".editBtn").addEventListener("click", () => {
      document.getElementById("form").classList.remove("hidden");
      document.getElementById("title").value = item.title;
      document.getElementById("description").value = item.description;
      document.getElementById("price").value = item.price;
      document.getElementById("image").value = item.image;
    });

    // Delete button click event
    card.querySelector(".deleteBtn").addEventListener("click", () => {
      if (data === tours) {
        tours.splice(tours.indexOf(item), 1);
      } else if (data === cars) {
        cars.splice(cars.indexOf(item), 1);
      }
      displayCards();
    });
  });
};

// Show Tours by default
module.exports = displayCards;

// Toggle form visibility and populate data on Edit button click
document.getElementById("toursBtn").addEventListener("click", () => {
  document.getElementById("form").classList.add("hidden");
  displayCards(tours);
});

document.getElementById("carsBtn").addEventListener("click", () => {
  document.getElementById("form").classList.add("hidden");
  displayCards(cars);
});

// Show/hide form on Cancel button click
document.getElementById("cancelBtn").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("form").classList.add("hidden");
});

// Form submission for adding/editing data
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    image: document.getElementById("image").value,
  };

  if (
    formData.title &&
    formData.description &&
    formData.price &&
    formData.image
  ) {
    if (data === tours) {
      tours.push({ id: Date.now(), ...formData });
    } else if (data === cars) {
      cars.push({ id: Date.now(), ...formData });
    }
    displayCards(data);
    document.getElementById("form").classList.add("hidden");
  } else {
    alert("Please fill in all fields!");
  }
});

// Logout button action (dummy action)
document.getElementById("logoutBtn").addEventListener("click", () => {
  alert("Logout clicked");
  // Perform logout functionality here
});

// Function to handle adding a new record
function addRecord(data) {
  document.getElementById("form").classList.remove("hidden");
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image").value = "";

  // Save button for adding a new record
  document.getElementById("saveBtn").innerText = "Add";

  document.getElementById("saveBtn").addEventListener("click", function (e) {
    e.preventDefault();
    const formData = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      price: document.getElementById("price").value,
      image: document.getElementById("image").value,
    };

    if (
      formData.title &&
      formData.description &&
      formData.price &&
      formData.image
    ) {
      if (data === tours) {
        tours.push({ id: Date.now(), ...formData });
      } else if (data === cars) {
        cars.push({ id: Date.now(), ...formData });
      }
      displayCards(data);
      document.getElementById("form").classList.add("hidden");
    } else {
      alert("Please fill in all fields!");
    }
  });
}

// Add button click event to add new record
document.getElementById("addRecordBtn").addEventListener("click", () => {
  addRecord(tours); // You can choose to add to 'tours' or 'cars'
});

// ... (rest of your existing event listeners and code)

// Delete button click event
function deleteRecord(data, item) {
  if (data === tours) {
    tours.splice(tours.indexOf(item), 1);
  } else if (data === cars) {
    cars.splice(cars.indexOf(item), 1);
  }
  displayCards(data);
}
