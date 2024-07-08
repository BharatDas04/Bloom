import { View, Image, Text, TouchableHighlight } from "react-native";
import { Colors } from "../Functions/Colors";
import { DimensionsConst } from "../Functions/DimensionsConst";
import FontSizeADJ from "../Functions/FontSizeADJ";
import { useNavigation } from "@react-navigation/core";

function Category({ buttonAvail }) {
  const navigation = useNavigation();
  return (
    <View style={{ gap: DimensionsConst.height * 0.02 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View style={{ alignItems: "center", gap: 5 }}>
          <View
            style={{
              backgroundColor: Colors.secondary,
              padding: DimensionsConst.width * 0.02,
              borderRadius: 20,
            }}
          >
            <Image
              source={require("../Images/cat1.png")}
              style={{ width: 70, height: 70 }}
            />
          </View>
          <Text>Large Plants</Text>
        </View>
        <View style={{ alignItems: "center", gap: 5 }}>
          <View
            style={{
              backgroundColor: Colors.secondary,
              padding: DimensionsConst.width * 0.02,
              borderRadius: 20,
            }}
          >
            <Image
              source={require("../Images/cat2.png")}
              style={{ width: 70, height: 70 }}
            />
          </View>
          <Text>For Beginners</Text>
        </View>
        <View style={{ alignItems: "center", gap: 5 }}>
          <View
            style={{
              backgroundColor: Colors.secondary,
              padding: DimensionsConst.width * 0.02,
              borderRadius: 20,
            }}
          >
            <Image
              source={require("../Images/cat3.png")}
              style={{ width: 70, height: 70 }}
            />
          </View>
          <Text>Annuals</Text>
        </View>
        <View style={{ alignItems: "center", gap: 5 }}>
          <View
            style={{
              backgroundColor: Colors.secondary,
              padding: DimensionsConst.width * 0.02,
              borderRadius: 20,
            }}
          >
            <Image
              source={require("../Images/cat4.png")}
              style={{ width: 70, height: 70 }}
            />
          </View>
          <Text>Low-Light</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View style={{ alignItems: "center", gap: 5 }}>
          <View
            style={{
              backgroundColor: Colors.secondary,
              padding: DimensionsConst.width * 0.02,
              borderRadius: 20,
            }}
          >
            <Image
              source={require("../Images/cat5.png")}
              style={{ width: 70, height: 70 }}
            />
          </View>
          <Text>Vascular</Text>
        </View>
        <View style={{ alignItems: "center", gap: 5 }}>
          <View
            style={{
              backgroundColor: Colors.secondary,
              padding: DimensionsConst.width * 0.02,
              borderRadius: 20,
            }}
          >
            <Image
              source={require("../Images/cat6.png")}
              style={{ width: 70, height: 70 }}
            />
          </View>
          <Text>Non-Vascular</Text>
        </View>
        <View style={{ alignItems: "center", gap: 5 }}>
          <View
            style={{
              backgroundColor: Colors.secondary,
              padding: DimensionsConst.width * 0.02,
              borderRadius: 20,
            }}
          >
            <Image
              source={require("../Images/cat7.png")}
              style={{ width: 70, height: 70 }}
            />
          </View>
          <Text>Aquatic</Text>
        </View>
        <View style={{ alignItems: "center", gap: 5 }}>
          <View
            style={{
              backgroundColor: Colors.secondary,
              padding: DimensionsConst.width * 0.02,
              borderRadius: 20,
            }}
          >
            <Image
              source={require("../Images/cat8.png")}
              style={{ width: 70, height: 70 }}
            />
          </View>
          <Text>Parasitic</Text>
        </View>
      </View>

      {buttonAvail && (
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View style={{ alignItems: "center", gap: 5 }}>
            <View
              style={{
                backgroundColor: Colors.secondary,
                padding: DimensionsConst.width * 0.02,
                borderRadius: 20,
              }}
            >
              <Image
                source={require("../Images/cat9.png")}
                style={{ width: 70, height: 70 }}
              />
            </View>
            <Text>Ficus</Text>
          </View>
          <View style={{ alignItems: "center", gap: 5 }}>
            <View
              style={{
                backgroundColor: Colors.secondary,
                padding: DimensionsConst.width * 0.02,
                borderRadius: 20,
              }}
            >
              <Image
                source={require("../Images/cat10.png")}
                style={{ width: 70, height: 70 }}
              />
            </View>
            <Text>Palm</Text>
          </View>
          <View style={{ alignItems: "center", gap: 5 }}>
            <View
              style={{
                backgroundColor: Colors.secondary,
                padding: DimensionsConst.width * 0.02,
                borderRadius: 20,
              }}
            >
              <Image
                source={require("../Images/cat11.png")}
                style={{ width: 70, height: 70 }}
              />
            </View>
            <Text>Deliciosa</Text>
          </View>
          <View style={{ alignItems: "center", gap: 5 }}>
            <View
              style={{
                backgroundColor: Colors.secondary,
                padding: DimensionsConst.width * 0.02,
                borderRadius: 20,
              }}
            >
              <Image
                source={require("../Images/cat12.png")}
                style={{ width: 70, height: 70 }}
              />
            </View>
            <Text>Altissima</Text>
          </View>
        </View>
      )}
      {buttonAvail && (
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View style={{ alignItems: "center", gap: 5 }}>
            <View
              style={{
                backgroundColor: Colors.secondary,
                padding: DimensionsConst.width * 0.02,
                borderRadius: 20,
              }}
            >
              <Image
                source={require("../Images/cat13.png")}
                style={{ width: 70, height: 70 }}
              />
            </View>
            <Text>Leafy</Text>
          </View>
          <View style={{ alignItems: "center", gap: 5 }}>
            <View
              style={{
                backgroundColor: Colors.secondary,
                padding: DimensionsConst.width * 0.02,
                borderRadius: 20,
              }}
            >
              <Image
                source={require("../Images/cat14.png")}
                style={{ width: 70, height: 70 }}
              />
            </View>
            <Text>Garden</Text>
          </View>
          <View style={{ alignItems: "center", gap: 5 }}>
            <View
              style={{
                backgroundColor: Colors.secondary,
                padding: DimensionsConst.width * 0.02,
                borderRadius: 20,
              }}
            >
              <Image
                source={require("../Images/cat15.png")}
                style={{ width: 70, height: 70 }}
              />
            </View>
            <Text>Pot Based</Text>
          </View>
          <View style={{ alignItems: "center", gap: 5 }}>
            <View
              style={{
                backgroundColor: Colors.secondary,
                padding: DimensionsConst.width * 0.02,
                borderRadius: 20,
              }}
            >
              <Image
                source={require("../Images/cat16.png")}
                style={{ width: 70, height: 70 }}
              />
            </View>
            <Text>Parasitic</Text>
          </View>
        </View>
      )}

      {!buttonAvail && (
        <TouchableHighlight onPress={() => navigation.navigate("Category")}>
          <View
            style={{
              backgroundColor: Colors.highlight,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: DimensionsConst.height * 0.014,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: FontSizeADJ(0.55) }}>
              View all categories
            </Text>
          </View>
        </TouchableHighlight>
      )}
      {buttonAvail && (
        <TouchableHighlight
          onPress={() => navigation.navigate("Home Page")}
          underlayColor={Colors.secondary}
        >
          <View
            style={{
              backgroundColor: Colors.secondary,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: DimensionsConst.height * 0.014,
              borderRadius: 10,
              borderWidth: 0.4,
              borderColor: "rgba(0, 0, 0, 0.4)",
            }}
          >
            <Text style={{ color: "black", fontSize: FontSizeADJ(0.55) }}>
              Go back
            </Text>
          </View>
        </TouchableHighlight>
      )}
    </View>
  );
}

export default Category;
