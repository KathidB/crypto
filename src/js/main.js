const LINK = "https://api.cryptorank.io/v1/currencies?api_key=";
const APIKEY = "b4d86d0f60d52a771a90036a62200f884de15e5f0d494c8613ff500a4b9e";
const tBody = document.querySelector("tbody");
const btnLoadMore = document.querySelector(".load-more");
const btnLoadLess = document.querySelector(".load-less");
const btnToTheTop = document.querySelector(".to-the-top");
const btnSortChange = document.querySelector(".changeSort");

let newTr;
let newTd;
let mainPageRows = 10;
let pageTwo = 10;

//funkcja dodaje dynamicznie kolejne pola do tabeli po wciśnięciu
// buttona.

async function addMoreTableData() {
  for (let i = 0; i < mainPageRows; i++) {
    for (let i = 0; i < 10; i++) {
      newTr = document.createElement("tr");
    }
    for (let i = 0; i < 7; i++) {
      newTd = document.createElement("td");
      newTr.appendChild(newTd);
      tBody.appendChild(newTr);
    }
  }
}

// funkcja, która odpowiada za pobieranie danych z API
// i przekazywanie ich do odpowiednich pól w tabeli
// wraz z tymi juz dynamicznie stworzonymi.

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
        places[i].textContent = data.data[i].rank;

        names[i].innerText = `${(names[i] = data.data[i].name)} | ${
          data.data[i].symbol
        }`;

        prices[i].textContent =
          data.data[i].values.USD.price
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " USD";

        if (data.data[i].values.USD.percentChange24h === undefined) {
          changes[i].textContent = "no data";
          changes[i].style.color = "#ff4d4d";
        } else {
          changes[i].textContent =
            data.data[i].values.USD.percentChange24h.toFixed(2) + " %";
          if (data.data[i].values.USD.percentChange24h > 0) {
            changes[i].style.color = "#33cc33";
          } else if (data.data[i].values.USD.percentChange24h == 0) {
            changes[i].style.color = "white";
          } else {
            changes[i].style.color = "#ff4d4d";
          }
        }

        marketCap[i].textContent =
          data.data[i].values.USD.marketCap
            .toFixed(1)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "$";

        volume[i].textContent =
          data.data[i].values.USD.volume24h
            .toFixed(1)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "$";

        supply[i].textContent = data.data[i].circulatingSupply
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      window.scrollTo(0, document.body.scrollHeight);
    } catch (e) {
      console.error(e);
    }
  }
  getCrypto();
};
fetchDataToTable();

const checkIfReachedMaxRows = () => {
  if (pageTwo >= 91) {
  } else {
    pageTwo += 10;
    addMoreTableData();
    fetchDataToTable();
  }
};

const deleteDataRow = () => {
  if (pageTwo === 10) {
  } else {
    deleteSome = document.querySelectorAll("tbody tr:nth-last-child(-n+10)");
    deleteSome.forEach((el) => {
      pageTwo -= 1;
      el.remove();
    });
  }
};

btnLoadMore.addEventListener("click", checkIfReachedMaxRows);
btnLoadLess.addEventListener("click", deleteDataRow);
