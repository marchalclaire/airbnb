import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import axios from "axios";
import RoomCard from "../components/RoomCard";
import MapView from "react-native-maps";

export default function ProfileScreen() {
  const { params } = useRoute();

  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState({});
  const [isDescriptionDisplayed, setIsDescriptionDisplayed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://airbnb-api.now.sh/api/room/" + params.id
        );

        if (response.data) {
          setRoom(response.data);
          setIsLoading(false);
        } else {
          //type erreur = ID n'existe pas
          alert("Id non trouvé");
        }
        //type erreur = pb serveur (éteind, Api qui ne fonctionne pas...)
      } catch (error) {
        console.log(error);
        alert("An error occurred");
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView>
      {isLoading === true ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <RoomCard item={room}></RoomCard>
      )}

      <Text
        onPress={() => {
          // ! permet d'inverser le boolean
          setIsDescriptionDisplayed(!isDescriptionDisplayed);
        }}
        style={{ marginHorizontal: 20 }}
        numberOfLines={isDescriptionDisplayed === false ? 2 : 0}
      >
        {room.description}
      </Text>

      {/* <MapView
        showsUserLocation={false}
        // provider="google"
        style={{ height: 300, marginTop: 50 }}
        initialRegion={{
          latitude: room.loc[1],
          longitude: room.loc[0],
          latitudeDelta: 0.03,
          longitudeDelta: 0.03
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: room.loc[1],
            longitude: room.loc[0]
          }}
        />
      </MapView> */}
    </ScrollView>
  );
}
