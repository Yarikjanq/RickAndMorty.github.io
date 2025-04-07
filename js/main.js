const chatactersHtml = document.getElementById("chatacters");
const searchCharacter = document.getElementById("search");
const searchNothing = document.querySelector(".search-nothing");
const nextPage = document.getElementById("next-page");
const totalPageHtml = document.querySelector(".total-page");
const prevPageHtml = document.getElementById("prev-page");
const selectCharacter = document.getElementById("select");
const selectCount = document.querySelector(".select-count");
const loader = document.getElementById("loader");

let allCharacters = [];
let filteredCharacters = [];
let currentPage = 1;
let totalPages = 0;
let itemsPerPage = 8;
const getRickyCharacter = async () => {
  try {
    loader.classList.remove("none");
    const data = await fetch("https://rickandmortyapi.com/api/character");
    const result = await data.json();
    allCharacters = result.results;
    filteredCharacters = allCharacters;
    renderCharacters(allCharacters);
    paginationPage();
    loader.classList.add("none");
  } catch (error) {
    console.error(error);
  }
};
getRickyCharacter();

function renderCharacters(characters) {
  chatactersHtml.innerHTML = "";
  const rolse = characters
    .map((character) => {
      return `   <div>
            <img class="character-img" src="${character.image}" alt="">
               <ul>
        <li>NAME:${character.name}</li>
  
        <li>STATUS: ${character.status}</li>
        <li>SPECIES: ${character.species}</li>
      </ul> 
      </div>`;
    })
    .join("");
  chatactersHtml.insertAdjacentHTML("beforeend", rolse);
  selectCount.innerHTML = `Count: ${filteredCharacters.length}`;
  totalPageHtml.innerHTML = `${currentPage} / ${totalPages}`;
}

function paginationPage() {
  totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginate = filteredCharacters.slice(start, start + itemsPerPage);
  renderCharacters(paginate);
  window.scrollTo({ top: 0, behavior: "smooth" });
}
const searchCharacterInput = (event) => {
  currentPage = 1;
  const name = event.target.value.toLowerCase();
  filteredCharacters = allCharacters.filter((character) =>
    character.name.toLowerCase().includes(name)
  );

  filteredCharacters.length === 0
    ? searchNothing.classList.remove("search-nothing")
    : searchNothing.classList.add("search-nothing");
  paginationPage();
};

const nextPageBtn = () => {
  if (currentPage < totalPages) {
    currentPage++;
    paginationPage();
  }
};
const PrevPageBtn = () => {
  if (currentPage > 1) {
    currentPage--;
    paginationPage();
  }
};

function changeStatus(event) {
  const status = event.target.value;
  currentPage = 1;
  if (status === "All") {
    filteredCharacters = allCharacters;
  } else {
    filteredCharacters = allCharacters.filter(
      (statuschar) => statuschar.status === status
    );
  }

  paginationPage();
}

selectCharacter.addEventListener("change", changeStatus);
searchCharacter.addEventListener("input", searchCharacterInput);
nextPage.addEventListener("click", nextPageBtn);
prevPageHtml.addEventListener("click", PrevPageBtn);
