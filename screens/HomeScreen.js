import React, { useEffect, useState, useReducer, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
import { Picker, onOpen } from "react-native-actions-sheet-picker";
import { useNavigation } from "@react-navigation/native";
import { getList, getSprite } from "./HomeScreen.service";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState({
    name: "Bulbasaur",
    lowerName: "bulbasaur",
  });
  const [pokemonImageURL, setPokemonImageURL] = useState(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  );
  const [query, setQuery] = useState("");
  const [isShiny, toggleIsShiny] = useReducer((state) => {
    return !state;
  }, false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    getSprite(selectedPokemon.lowerName, isShiny, setPokemonImageURL);
    getList(setPokemonList);
  }, [isShiny, selectedPokemon]);

  const filteredPokemonList = useMemo(() => {
    if (pokemonList && pokemonList.length > 0) {
      return pokemonList.filter((item) =>
        item.name
          .toLocaleLowerCase("en")
          .includes(query.toLocaleLowerCase("en"))
      );
    }
  }, [pokemonList, query]);

  const onSearch = (text) => {
    setQuery(text);
  };

  return (
    <SafeAreaView>
      <View className="items-center">
        <View className="m-4 flex-row justify-center items-center space-x-3">
          <Pressable onPress={toggleIsShiny}>
            <Image
              source={{
                uri: pokemonImageURL,
              }}
              className="h-10 w-10 p-10 bg-white rounded-full flex-1"
              onPress={toggleIsShiny}
            />
          </Pressable>
          <View>
            <Text>Your Partner Pokémon is {selectedPokemon.name}!</Text>
            <Text className="text-sm text-gray-400">
              What happens if you poke it?
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="border border-gray-600 bg-gray-500 p-4 rounded-lg"
          onPress={() => {
            onOpen("list");
          }}
        >
          <Text className="text-white font-bold">Select Partner Pokémon</Text>
        </TouchableOpacity>
      </View>
      <Picker
        id="list"
        data={filteredPokemonList}
        inputValue={query}
        searchable={true}
        label="Select Partner Pokémon"
        setSelected={setSelectedPokemon}
        onSearch={onSearch}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
