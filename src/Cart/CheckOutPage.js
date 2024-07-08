import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { Colors } from "../Functions/Colors";
import FontSizeADJ from "../Functions/FontSizeADJ";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";

function CheckOutPage({ route }) {
  const navigation = useNavigation();
  const { head, dataBody } = route.params;
  const total = dataBody.map((item, index) => item.cost * head[index]);
  const sum = total.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: Colors.secondary,
          justifyContent: "flex-end",
          elevation: 5,
          paddingTop: "16%",
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
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("CartPage")}
            >
              <View
                style={{
                  backgroundColor: Colors.primary,
                  borderRadius: 40,
                  padding: 9,
                }}
              >
                <Ionicons name="arrow-back-outline" size={20} />
              </View>
            </TouchableWithoutFeedback>
            <Text style={{ marginLeft: 10 }}>Current Cart</Text>
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
      <View style={styles.items}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {dataBody.map((item, index) => (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("Detail", { id: item.id });
              }}
              key={index}
            >
              <View
                style={{
                  backgroundColor: Colors.secondary,
                  paddingVertical: 20,
                  gap: 20,
                  paddingHorizontal: 20,
                  marginLeft: 20,
                  borderRadius: 10,
                  elevation: 2,
                  marginVertical: 3,
                  marginRight: dataBody.length - 1 === index ? 20 : 0,
                }}
              >
                <View>
                  <Image
                    source={require("../Images/plant1.png")}
                    style={{ width: 155, height: 155 }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: FontSizeADJ(0.6),
                      color: "rgba(0,0,0,0.6)",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{ fontWeight: "bold", fontSize: FontSizeADJ(0.6) }}
                  >
                    ₹ {item.cost}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      </View>

      <View style={styles.items}>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: FontSizeADJ(0.53) }}>Personalization</Text>
          </View>
          <View style={{ paddingHorizontal: 20, gap: 10, marginTop: "3%" }}>
            <Text style={{ fontSize: FontSizeADJ(0.5) }}>
              Recipient Full Name*
            </Text>
            <View
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.3)",
                paddingHorizontal: 10,
                paddingVertical: 3,
              }}
            >
              <TextInput />
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, gap: 10, marginTop: "3%" }}>
            <Text style={{ fontSize: FontSizeADJ(0.5) }}>Recipient Phone*</Text>
            <View
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.3)",
                paddingHorizontal: 10,
                paddingVertical: 3,
              }}
            >
              <TextInput />
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, gap: 10, marginTop: "3%" }}>
            <Text style={{ fontSize: FontSizeADJ(0.5) }}>Card Message</Text>
            <View
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.3)",
                paddingHorizontal: 10,
                paddingVertical: 3,
              }}
            >
              <TextInput numberOfLines={8} />
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, gap: 10, marginTop: "3%" }}>
            <Text style={{ fontSize: FontSizeADJ(0.5) }}>
              Florist Instructions
            </Text>
            <View
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.3)",
                paddingHorizontal: 10,
                paddingVertical: 3,
              }}
            >
              <TextInput />
            </View>
          </View>
          <View
            style={{ paddingVertical: 280, gap: 10, marginTop: "3%" }}
          ></View>
        </ScrollView>
      </View>
      <View
        style={[
          styles.items,
          {
            marginTop: "auto",
            paddingVertical: 15,
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            elevation: 10,
            backgroundColor: "white",
          },
        ]}
      >
        <View style={{ gap: 5 }}>
          <Text
            style={{ fontSize: FontSizeADJ(0.6), color: "rgba(0,0,0,0.6)" }}
          >
            Grand Total:
          </Text>
          <Text style={{ fontSize: FontSizeADJ(0.55), color: "black" }}>
            ₹ {sum}.00
          </Text>
        </View>
        <TouchableWithoutFeedback>
          <View
            style={{
              backgroundColor: Colors.highlight,
              paddingVertical: 10,
              paddingHorizontal: 30,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: FontSizeADJ(0.5) }}>
              Proceed
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  items: {
    marginTop: "5%",
  },
});

export default CheckOutPage;
