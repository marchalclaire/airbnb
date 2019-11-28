import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

const RoomCard = props => {
  const navigation = useNavigation();
  //à tester avec props
  const { item } = props;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < item.ratingValue) {
      stars.push(<Ionicons key={i} name="ios-star" color="gold" size={20} />);
    } else {
      stars.push(<Ionicons key={i} name="ios-star" color="grey" size={20} />);
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
              <Text style={{ marginLeft: 10 }}>{item.reviews} reviews</Text>
            </View>
          </View>
          <Image
            style={styles.picUser}
            source={{ uri: item.user.account.photos[0] }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

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
  picUser: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    right: 20,
    top: -12
  }
});

export default RoomCard;
