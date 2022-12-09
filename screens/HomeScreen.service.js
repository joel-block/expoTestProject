export async function getSprite(name = "bulbasaur", shiny = false, setter) {
  try {
    const response =
      name === "furfrou"
        ? await fetch("https://pokeapi.co/api/v2/pokemon-form/furfrou-natural/")
        : await fetch(`https://pokeapi.co/api/v2/pokemon-form/${name}/`);
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
