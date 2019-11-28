import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";
import axios from "axios";

export default function ProfileScreen() {
  const { params } = useRoute();

  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://airbnb-api.now.sh/api/room/" + params.id
        );

        if (response.data) {
          setRoom(response.data);
        } else {
          //à mettre pour différencier : si ID n'existe pas
          alert("Id non trouvé");
        }
        //à mettre pour différencier pb serveur (éteind, Api qui fonctionne pas...)
      } catch (error) {
        console.log(error);
        alert("An error occurred");
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>{room.description}</Text>
    </View>
  );
}
