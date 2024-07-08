import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../Functions/Colors";
import { DimensionsConst } from "../Functions/DimensionsConst";
import FontSizeADJ from "../Functions/FontSizeADJ";
import { Ionicons } from "@expo/vector-icons";

function Sale() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.5 }}>
        <Text style={styles.saleText}>Sale up to 30% off</Text>
        <Text style={[styles.saleHeading, { marginTop: 10 }]}>Happy</Text>
        <Text style={styles.saleHeading}>Hours Sale</Text>
      </View>
      <View style={{ flex: 0.5 }}>
        <Image
          source={require("../Images/plant1.png")}
          style={{ height: 150, width: 150 }}
        />
      </View>
      <View
        style={{
          backgroundColor: "white",
          position: "absolute",
          paddingVertical: "3%",
          paddingHorizontal: "4%",
          borderRadius: 8,
          flexDirection: "row",
          alignItems: "center",
          top: 130,
          elevation: 0.5,
          marginLeft: 20,
        }}
      >
        <Text
          style={{
            color: "rgba(0,0,0,0.8)",
            fontSize: FontSizeADJ(0.5),
            fontWeight: "bold",
          }}
        >
          ₹449
        </Text>
        <Text style={{ color: "grey", fontSize: FontSizeADJ(0.5) }}> 5̶2̶9̶</Text>
        <Ionicons
          name="alarm-outline"
          size={FontSizeADJ(0.5)}
          style={{ marginLeft: 5 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    paddingVertical: DimensionsConst.height * 0.02,
    paddingHorizontal: DimensionsConst.width * 0.05,
    width: "100%",
    borderRadius: 5,
    flexDirection: "row",
  },
  saleHeading: {
    color: "black",
    fontWeight: "bold",
    fontSize: FontSizeADJ(1),
  },
  saleText: {
    color: "grey",
    fontWeight: "bold",
    fontSize: FontSizeADJ(0.7),
  },
});

export default Sale;
