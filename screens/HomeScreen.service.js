const spriteBaseURL = "https://pokeapi.co/api/v2/pokemon";

export async function getSprite(id = 1, shiny = false, setter) {
  try {
    const response = await fetch(`${spriteBaseURL}/${id}`);
    const pokemon = await response.json();
    const imageURL = shiny
      ? pokemon.sprites.front_shiny
      : pokemon.sprites.front_default;
    setter(imageURL);
  } catch (error) {
    console.error(error);
  }
}

export function firstCapitalized(string) {
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
      let id = +mon.url.split("/")[6];

      return {
        name: firstCapitalized(mon.name),
        lowerName: mon.name,
        id,
      };
    });
    setter(listOfNames);
  } catch (error) {
    console.error(error);
  }
}
