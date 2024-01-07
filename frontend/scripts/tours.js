import axios from 'axios';

const toursCardsInfo = [];

const getAllTours = async () => {
    try {
        const data = await axios.get('http://localhost:8000/api/getAllTours');
        toursCardsInfo = data.data;
        log(toursCardsInfo);
    } catch (error) {
        console.log(error);
    }
}

getAllTours();

let cardsHTML = '';

toursCardsInfo.forEach((card)=>{
    cardsHTML += `
    <div class="rounded overflow-hidden shadow-lg">
    <img class="w-full h-[200px] overflow-hidden object-cover" src=${card.img} alt=${card.title}>
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">${card.title}</div>
      <p class="text-gray-700 text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
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


document.querySelector('.tours-container').innerHTML = cardsHTML;



