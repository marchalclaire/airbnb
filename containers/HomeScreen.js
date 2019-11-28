import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet
} from "react-native";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

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

              const stars = [];

              for (let i = 0; i < 5; i++) {
                if (i < item.ratingValue) {
                  stars.push(
                    <Ionicons key={i} name="ios-star" color="gold" size={20} />
                  );
                } else {
                  stars.push(
                    <Ionicons key={i} name="ios-star" color="grey" size={20} />
                  );
                }
              }

              return (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Profile", { id: item._id });
                    }}
                  >
                    <Image
                      style={{
                        height: 240,
                        width: 373,
                        margin: 20,
                        position: "relative"
                      }}
                      source={{ uri: item.photos[0] }}
                    />

                    <Text style={styles.price}>{item.price} €</Text>

                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1 }}>
                        <Text numberOfLines={1} style={styles.title}>
                          {item.title}
                        </Text>

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginLeft: 20
                          }}
                        >
                          {stars}
                          <Text style={{ marginLeft: 10 }}>
                            {item.reviews} reviews
                          </Text>
                        </View>
                      </View>
                      <Image
                        style={styles.picUser}
                        source={{ uri: item.user.account.photos[0] }}
                      />
                    </View>
                  </TouchableOpacity>
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
  price: {
    backgroundColor: "rgba(0,0,0,0.7)", //opacité = 0.7
    color: "white",
    lineHeight: 65,
    width: 100,
    fontSize: 25,
    paddingLeft: 18,
    position: "absolute",
    top: 185,
    left: 30
  },
  title: {
    fontSize: 20,
    marginHorizontal: 20,
    marginBottom: 10
  },
  reviews: {
    color: "grey",
    fontSize: 20,
    marginHorizontal: 20,
    marginBottom: 20
  },
  underline: {
    backgroundColor: "grey",
    height: 1,
    marginHorizontal: 20,
    width: 370
  },
  picUser: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    right: 20,
    top: -12
  }
});
