/**
 * @typedef Artist
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} date
 * @property {string} location
 */

/** === Constants === */
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2602-ashley"; // Make sure to change this!
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

/** === State === */
let partyName = [];
let selectedParty;

async function getParties() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    console.log(result.data);
    partyName = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

async function getParty(id) {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();
    selectedParty = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

/** === Components === */

function PartyListItem(party) {
  const $list = document.createElement("li");
  $list.innerHTML = `
    <a href="#selected">${party.name}</a>
  `;
  const $link = $list.querySelector("a");
  $link.addEventListener("click", () => {
    getParty(party.id);
  });

  return $list;
}

function PartyList() {
  // TODO
  const $list = document.createElement("ul");
  $list.classList.add("lineup");
  for (let i = 0; i < partyName.length; i++) {
    const party = partyName[i];
    const $item = PartyListItem(party);
    $list.append($item);
  }

  return $list;
}

function PartyDetails() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    return $p;
  } else {
    const party = selectedParty;
    const $section = document.createElement("section");
    //$section.classList.add("");
    $section.innerHTML = `
      <h3>${party.name} #${party.id}</h3>
      <br>
  <p>${party.date.slice(0, 10)}</p>
  <p>${party.location}</p>
  <br>
  <p>${party.description}</p>
  `;

    return $section;
  }
}

/** === Render === */

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Lineup</h2>
        <PartyList></PartyList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
      </section>
    </main>
  `;
  $app.querySelector("PartyList").replaceWith(PartyList());
  $app.querySelector("PartyDetails").replaceWith(PartyDetails());
}

async function init() {
  await getParties();
  render();
}

init();
