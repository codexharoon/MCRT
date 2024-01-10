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
            <div class="rounded-md overflow-hidden shadow-lg">
            <img class="w-full h-[200px] overflow-hidden object-cover" src=${card.ImageUrl} alt=${card.Title}>
            <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">${card.Title}</div>
            <div class="text-sm mb-2">Rs ${card.Price}</div>
            <p class="text-gray-700 text-base">
                ${card.Description}
            </p>
            </div>
            <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#${card.Tag}</span>
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

// getAllTours();
window.addEventListener("load", getAllTours);
