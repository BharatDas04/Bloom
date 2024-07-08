import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import plant from "../data/plant.json";
import FontSizeADJ from "../Functions/FontSizeADJ";
import { Colors } from "../Functions/Colors";
import { useNavigation } from "@react-navigation/core";

function ItemList() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {plant.slice(0, 8).map((item, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => navigation.navigate("Detail", { id: item.id })}
        >
          <View
            style={{
              maxWidth: "50%",
              gap: 10,
            }}
          >
            <View
              style={{
                backgroundColor: Colors.secondary,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}
            >
              <Image source={{ uri: item.images }} style={styles.image} />
              {console.log(item.images)}
            </View>
            <View>
              <Text style={styles.heading}>{item.name}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.cost}>₹ {item.cost}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

export default ItemList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  heading: {
    fontWeight: "bold",
    fontSize: FontSizeADJ(0.5),
  },
  desc: {
    color: "rgba(0,0,0,0.6)",
    fontSize: FontSizeADJ(0.4),
  },
  cost: {
    fontWeight: "bold",
    marginTop: 5,
  },
});
