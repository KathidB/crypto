const LINK = "https://api.cryptorank.io/v1/currencies?api_key=";
const APIKEY = "aa82a291dee8c12608c52b1401f3d6396cb81b1919ac2093f586f4fb0531";
const tBody = document.querySelector("tbody");
const btnLoadMore = document.querySelector(".load-more");
const btnLoadLess = document.querySelector(".load-less");
let newTr;
let newTd;
let pageOne = 10;
let pageTwo = 10;

//funkcja dodaje dynamicznie kolejne pola do tabeli po wciśnięciu
// buttona.

const addMoreTableData = () => {
  for (let i = 0; i < pageOne; i++) {
    for (let i = 0; i < 10; i++) {
      newTr = document.createElement("tr");
    }
    for (let i = 0; i < 7; i++) {
      newTd = document.createElement("td");
      newTr.appendChild(newTd);
      tBody.appendChild(newTr);
    }
  }
};

//Główna funkcja, która odpowiada za pobieranie danych z API
// i przekazywanie ich do odpowiednich pól w tabeli.
const fetchDataToTable = () => {
  const places = document.querySelectorAll("tbody tr td:nth-child(1)");
  const names = document.querySelectorAll("tbody tr td:nth-child(2)");
  const prices = document.querySelectorAll("tbody tr td:nth-child(3)");
  const changes = document.querySelectorAll("tbody tr td:nth-child(4)");
  const marketCap = document.querySelectorAll("tbody tr td:nth-child(5)");
  const volume = document.querySelectorAll("tbody tr td:nth-child(6)");
  const supply = document.querySelectorAll("tbody tr td:nth-child(7)");

  async function getCrypto() {
    try {
      const res = await fetch(LINK + APIKEY);
      const data = await res.json();

      for (let i = 0; i < pageTwo; i++) {
        // pozycja crypto
        places[i].textContent = data.data[i].rank;
        //nazwy crypto
        names[i].innerText = `${(names[i] = data.data[i].name)} | ${
          data.data[i].symbol
        }`;
        //ceny crypto
        prices[i].textContent =
          data.data[i].values.USD.price
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " USD";
        // zmiana 24h
        changes[i].textContent =
          data.data[i].values.USD.percentChange24h + " %";
        if (data.data[i].values.USD.percentChange24h > 0) {
          changes[i].style.color = "#33cc33";
        } else if ((data.data[i].values.USD.percentChange24h = 0)) {
          changes[i].style.color = "black";
        } else {
          changes[i].style.color = "#ff4d4d";
        }
        //market cap
        marketCap[i].textContent =
          data.data[i].values.USD.marketCap
            .toFixed(1)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "$";

        //wolumen24h
        volume[i].textContent =
          data.data[i].values.USD.volume24h
            .toFixed(1)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "$";

        // circ supply
        supply[i].textContent = data.data[i].circulatingSupply
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      window.scrollTo(0, document.body.scrollHeight);
    } catch {
      console.error("ERROR 404");
    }
  }
  getCrypto();
};
fetchDataToTable();

const loadMoreDataOnClick = () => {
  if (pageTwo >= 100) {
  } else if (pageTwo >= 91) {
  } else {
    pageTwo += 10;
    addMoreTableData();
    fetchDataToTable();
  }
  window.scrollTo(0, document.body.scrollHeight);
};

const deleteDataRow = () => {
  deleteSome = document.querySelectorAll("tbody tr:last-child");
  deleteSome.forEach((el) => {
    pageTwo -= 1;
    el.remove();
  });
};

btnLoadMore.addEventListener("click", loadMoreDataOnClick);
btnLoadLess.addEventListener("click", deleteDataRow);
