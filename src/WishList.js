import { View, Text, TouchableWithoutFeedback } from "react-native";

import { Colors } from "./Functions/Colors";
import FontSizeADJ from "./Functions/FontSizeADJ";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

function WishList() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.15,
          backgroundColor: Colors.secondary,
          justifyContent: "flex-end",
          elevation: 5,
        }}
      >
        <View
          style={{
            alignItems: "flex-end",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
              marginLeft: 20,
            }}
          >
            <View
              style={{
                backgroundColor: Colors.primary,
                borderRadius: 40,
                padding: 9,
              }}
            >
              <Ionicons name="albums-outline" size={20} />
            </View>

            <Text style={{ marginLeft: 10 }}>Wishlist</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
              marginLeft: 20,
              marginLeft: "auto",
              marginRight: 20,
            }}
          >
            <View
              style={{
                backgroundColor: Colors.primary,
                borderRadius: 40,
                padding: 9,
              }}
            >
              <Ionicons name="arrow-redo-outline" size={20} />
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 0.85 }}>
        <View
          style={{
            alignItems: "center",
            marginTop: 150,
            justifyContent: "center",
            paddingHorizontal: "5%",
          }}
        >
          <View>
            <Ionicons
              name="albums-outline"
              color={Colors.highlight}
              size={205}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: FontSizeADJ(0.5),
                fontSize: FontSizeADJ(0.5),
              }}
            >
              No items in the wishlist yet.
            </Text>
          </View>

          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("CarePage");
            }}
          >
            <View
              style={{
                fontSize: FontSizeADJ(0.5),
                backgroundColor: Colors.highlight,
                marginTop: 40,
                width: "100%",
                paddingVertical: "3%",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "white", fontSize: FontSizeADJ(0.5) }}>
                Show Care
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}

export default WishList;
