let cards = [
  "AscencionSpiral",
  "CaballeroGaia",
  "CapitanMerodeador",
  "CardDestruction",
  "ConstellarOmega",
  "ConstellarPleiades",
  "CristalWing",
  "DragonAladoRa",
  "DragonMilenario",
  "DragonOjiAzul",
  "DragonPulse",
  "EHOcean",
  "ExodiaHead",
  "GuivernoEclipse",
  "GurreroVelocidad",
  "HaneHane",
  "Honest",
  "Kuriboh",
  "MagoOscuro",
  "MagoOscuroCaos",
  "MagoTriPortal",
  "MalganisLefay",
  "MaliciusEdge",
  "Marshmallon",
  "MonsterReborn",
  "Renunciado",
  "RoadWarrior",
  "SincronizadorBasura",
  "SincronizadorCamino",
  "SoldadoCinetico",
  "Utopia",
  "ValkiriaMago",
];

window.addEventListener("load", () => {
  const cardSpaces = document.getElementById("cards");
  let sectioncard = "";
  sort(cards);
  cards = cards.splice(0, 8);
  cards = [...cards, ...cards];
  sort(cards);
  let position = 0;
  for (let file = 0; file < 4; file++) {
    sectioncard += "<div class='flex'>";
    for (let column = 0; column < 4; column++) {
      sectioncard +=
        "<div class='cardback'><img id=" +
        position +
        " onclick='turn(" +
        position +
        ")' class='fondo' src='./assets/images/" +
        cards[position] +
        ".jpg' alt='img' width='150px' height='150px' value='" +
        cards[position] +
        "'/></div>";
      position++;
    }
    sectioncard += "</div>";
  }
  cardSpaces.innerHTML = sectioncard;
});

const dataPlay = document.getElementById("dataplay");
const cardFound = document.getElementById("cardfound");
const btnGame = document.getElementById("buttons");
let cardTurn = 1;
let previusCard = "";
let previusCardValue = "";
let previusCardID = "";
let foundPairs = [];
let attempts = 0;

dataPlay.innerHTML = "Intentos: " + attempts;

function turn(position) {
  let card = document.getElementById(position);
  let cardValue = card.attributes[7].value;
  let cardID = card.attributes[0].value;
  let cardFoundSection = "";
  card.classList.remove("fondo");
  if (cardTurn == 1) {
    previusCard = card;
    previusCardValue = cardValue;
    previusCardID = cardID;
  }
  cardTurn++;
  if (cardTurn >= 3) {
    attempts++;
    if (cardID == previusCardID) {
      alert("no se puede seleccionar la misma carta dos veces");
      card.classList.add("fondo");
      cardTurn = 1;
    }
    if (previusCardValue != cardValue) {
      time(previusCard, card);
      cardTurn = 1;
    }
    if (previusCardValue == cardValue && cardID != previusCardID) {
      card.classList.add("answercorrect");
      previusCard.classList.add("answercorrect");
      foundPairs.push(cardValue);
      cardTurn = 1;
    }
    card = previusCard = "";
    dataPlay.innerHTML = "Intentos: " + attempts;
    foundPairs.forEach((result) => {
      cardFoundSection += "<p>" + result + "</p>";
    });
    foundPairs.length <= 7
      ? (cardFound.innerHTML = cardFoundSection)
      : endGame();
  }
}

function time(previusCard, card) {
  card.classList.add("answerincorrect");
  previusCard.classList.add("answerincorrect");
  setTimeout(() => {
    card.classList.remove("answerincorrect");
    previusCard.classList.remove("answerincorrect");
    card.classList.add("fondo");
    previusCard.classList.add("fondo");
  }, 1000);
}

function sort(cards) {
  cards = cards.sort(() => {
    return Math.random() - 0.5;
  });
}

function endGame() {
  let cardFoundSection = "";
  foundPairs.forEach((result) => {
    cardFoundSection += "<p>" + result + "</p>";
  });
  dataPlay.innerHTML = "Juego terminado en " + attempts + " movimientos.";
  cardFound.innerHTML = "<p>Lista de cartas de esta ronda: </p>"+ cardFoundSection;
  btnGame.innerHTML = "<input type='button' onclick='restartGame()' value='Reiniciar juego'>"
}

function restartGame() {
  window.location.reload();
}
