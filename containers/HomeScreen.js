import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import RoomCard from "../components/RoomCard";
import { View, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import axios from "axios";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://airbnb-api.now.sh/api/room?city=paris"
        );

        // Est-ce que j'ai bien reçu un tableau rooms
        if (response.data.rooms) {
          setRooms(response.data.rooms);
          setIsLoading(false);
        } else {
          alert("An error occurred");
        }
      } catch (e) {
        alert("An error occurred");
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {isLoading === true ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <View>
          <FlatList
            data={rooms}
            renderItem={({ item }) => {
              // alert(JSON.stringify(obj));

              return (
                <>
                  <RoomCard item={item}></RoomCard>
                  <View style={styles.underline}></View>
                </>
              );
            }}
            keyExtractor={room => {
              return room._id;
            }}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  underline: {
    backgroundColor: "grey",
    height: 1,
    marginHorizontal: 20,
    width: 370
  }
});
