import { SafeAreaView, View, Text } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="mx-4">
      <Text className="text-red-500 font-bold ">Hello World!</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
