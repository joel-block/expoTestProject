const spriteBaseURL = "https://pokeapi.co/api/v2/pokemon-form";

function getSpriteURL(name) {
  let url = "";
  switch (name) {
    case "furfrou":
      url = `${spriteBaseURL}/furfrou-natural`;
      break;
    case "alcremie":
      url = `${spriteBaseURL}/alcremie-vanilla-cream`;
      break;
    case "unown":
      url = `${spriteBaseURL}/unown-a`;
      break;
    case "burmy":
      url = `${spriteBaseURL}/burmy-plant`;
      break;
    case "cherrim":
      url = `${spriteBaseURL}/cherrim-sunshine`;
      break;
    case "shellos":
      url = `${spriteBaseURL}/shellos-east`;
      break;
    case "gastrodon":
      url = `${spriteBaseURL}/gastrodon-east`;
      break;
    case "arceus":
      url = `${spriteBaseURL}/arceus-normal`;
      break;
    case "deerling":
      url = `${spriteBaseURL}/deerling-spring`;
      break;
    case "sawsbuck":
      url = `${spriteBaseURL}/sawsbuck-spring`;
      break;
    case "vivillon":
      url = `${spriteBaseURL}/vivillon-meadow`;
      break;
    case "flabebe":
      url = `${spriteBaseURL}/flabebe-red`;
      break;
    case "floette":
      url = `${spriteBaseURL}/floette-red`;
      break;
    case "florges":
      url = `${spriteBaseURL}/florges-red`;
      break;
    case "xerneas":
      url = `${spriteBaseURL}/xerneas-active`;
      break;
    case "silvally":
      url = `${spriteBaseURL}/silvally-normal`;
      break;
    case "sinistea":
      url = `${spriteBaseURL}/sinistea-phony`;
      break;
    case "polteageist":
      url = `${spriteBaseURL}/polteageist-phony`;
      break;
    default:
      url = `${spriteBaseURL}/${name}`;
  }
  return url;
}

export async function getSprite(name = "bulbasaur", shiny = false, setter) {
  try {
    const response = await fetch(getSpriteURL(name));
    const pokemonForm = await response.json();
    const imageURL = shiny
      ? pokemonForm.sprites.front_shiny
      : pokemonForm.sprites.front_default;
    setter(imageURL);
  } catch (error) {
    console.error(error);
  }
}

function firstCapitalized(string) {
  if (string.includes("-")) {
    let capitalizedStrings = string.split("-").map((word) => {
      return firstCapitalized(word);
    });
    return capitalizedStrings.join("-");
  } else {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

export async function getList(setter) {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
    );
    const { results } = await response.json();
    const listOfNames = await results.map((mon) => {
      return { name: firstCapitalized(mon.name), lowerName: mon.name };
    });
    setter(listOfNames);
  } catch (error) {
    console.error(error);
  }
}
