export async function getSprite(name = "bulbasaur", shiny = false, setter) {
  try {
    const response =
      name === "furfrou"
        ? await fetch("https://pokeapi.co/api/v2/pokemon-form/furfrou-natural/")
        : name === "alcremie"
        ? await fetch(
            "https://pokeapi.co/api/v2/pokemon-form/alcremie-vanilla-cream/"
          )
        : name === "unown"
        ? await fetch("https://pokeapi.co/api/v2/pokemon-form/unown-a/")
        : name === "burmy"
        ? await fetch("https://pokeapi.co/api/v2/pokemon-form/burmy-plant/")
        : name === "cherrim"
        ? await fetch(
            "https://pokeapi.co/api/v2/pokemon-form/cherrim-sunshine/"
          )
        : name === "shellos"
        ? await fetch("https://pokeapi.co/api/v2/pokemon-form/shellos-east/")
        : name === "gastrodon"
        ? await fetch("https://pokeapi.co/api/v2/pokemon-form/gastrodon-east/")
        : name === "arceus"
        ? await fetch("https://pokeapi.co/api/v2/pokemon-form/arceus-normal/")
        : name === "deerling"
        ? await fetch("https://pokeapi.co/api/v2/pokemon-form/deerling-spring/")
        : name === "sawsbuck"
        ? await fetch("https://pokeapi.co/api/v2/pokemon-form/sawsbuck-spring/")
        : name === "vivillon"
        ? await fetch("https://pokeapi.co/api/v2/pokemon-form/vivillon-meadow/")
        : name === "flabebe"
        ? await fetch("https://pokeapi.co/api/v2/pokemon-form/flabebe-red/")
        : name === "floette"
        ? await fetch("https://pokeapi.co/api/v2/pokemon-form/floette-red/")
        : name === "florges"
        ? await fetch("https://pokeapi.co/api/v2/pokemon-form/florges-red/")
        : name === "xerneas"
        ? await fetch("https://pokeapi.co/api/v2/pokemon-form/xerneas-active/")
        : name === "silvally"
        ? await fetch("https://pokeapi.co/api/v2/pokemon-form/silvally-normal/")
        : name === "sinistea"
        ? await fetch("https://pokeapi.co/api/v2/pokemon-form/sinistea-phony/")
        : name === "polteageist"
        ? await fetch("https://pokeapi.co/api/v2/pokemon-form/polteageist-phony/")
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
