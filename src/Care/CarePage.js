import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../Functions/Colors";
import { Ionicons } from "@expo/vector-icons";
import FontSizeADJ from "../Functions/FontSizeADJ";
import { retrieveCare, removeFav } from "../Functions/AsyncFunctions";
import plant from "../data/plant.json";
import { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";

function CarePage() {
  const isFocus = useIsFocused();
  const [dataBody, setDataBody] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  async function referesher() {
    const data = await retrieveCare();
    if (data != null) {
      const itemData = plant.filter((item) =>
        data.some((itemID) => itemID.includes(item.id))
      );
      setDataBody(itemData);
    }
  }

  async function deleteFav(id) {
    await removeFav(id);
    referesher();
  }

  useEffect(() => {
    if (isFocus === true) {
      referesher();
    }
  }, [isFocus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1000 milliseconds = 1 second

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

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
              <Ionicons name="heart-outline" size={20} />
            </View>

            <Text style={{ marginLeft: 10 }}>Welcome to Care</Text>
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
      {isLoading && (
        <View
          style={{ flex: 0.85, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={"80%"} color={Colors.highlight} />
        </View>
      )}
      {!isLoading && (
        <View style={{ flex: 0.85 }}>
          {dataBody.length === 0 ||
            (dataBody === null && (
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: "white",
                  borderBottomRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  justifyContent: "center",
                  marginTop: "10%",
                  opacity: 0.6,
                  height: "80%",
                }}
              >
                <Text
                  style={{
                    fontSize: FontSizeADJ(0.5),
                    color: "rgba(0,0,0,0.6)",
                  }}
                >
                  No plants added yet!
                </Text>
              </View>
            ))}
          <View style={{ paddingHorizontal: "2%", paddingVertical: "5%" }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {dataBody.length === 0 && (
                <View
                  style={{
                    alignItems: "center",
                    marginTop: 150,
                    justifyContent: "center",
                  }}
                >
                  <View>
                    <Ionicons
                      name="heart-outline"
                      color={Colors.highlight}
                      size={205}
                    />
                  </View>
                  <View>
                    <Text style={{ fontSize: FontSizeADJ(0.5) }}>
                      No items in care yet !!!
                    </Text>
                  </View>
                </View>
              )}

              {dataBody.length > 0 &&
                dataBody.map((item, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => {
                      navigation.navigate("CareDetailPage", { id: item.id });
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: Colors.primary,
                        paddingHorizontal: "4%",
                        paddingVertical: "5%",
                        borderRadius: 5,
                        marginBottom: 10,
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <View>
                          <Image
                            source={{ uri: item.images }}
                            style={{ width: 105, height: 105 }}
                          />
                        </View>
                        <View style={{ width: "60%", marginLeft: 20 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                color: "black",
                                fontSize: FontSizeADJ(0.7),
                                fontWeight: "bold",
                              }}
                            >
                              {item.name}
                            </Text>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                deleteFav(item.id);
                              }}
                            >
                              <Ionicons
                                name="close"
                                color={"rgba(0,0,0,0.3)"}
                                size={25}
                              />
                            </TouchableWithoutFeedback>
                          </View>
                          <Text
                            style={{ color: "rgba(0,0,0,0.7)", marginTop: 6 }}
                          >
                            {item.description}
                          </Text>
                          <View
                            style={{ marginTop: "auto", flexDirection: "row" }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                backgroundColor: Colors.secondary,
                                padding: 5,
                                borderRadius: 3,
                                alignSelf: "flex-start",
                              }}
                            >
                              <Ionicons name="star" color={"gold"} size={15} />
                              <Text style={{ marginLeft: 3 }}>
                                {item.rating}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                backgroundColor: Colors.secondary,
                                padding: 5,
                                borderRadius: 3,
                                alignSelf: "flex-start",
                                marginLeft: 10,
                              }}
                            >
                              <Ionicons
                                name="water"
                                color={"skyblue"}
                                size={15}
                              />
                              <Text style={{ marginLeft: 3 }}>
                                {item.waterFrequency} / Week
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                backgroundColor: Colors.secondary,
                                padding: 5,
                                borderRadius: 3,
                                alignSelf: "flex-start",
                                marginLeft: 10,
                              }}
                            >
                              <Ionicons
                                name="cash-outline"
                                color={"green"}
                                size={15}
                              />
                              <Text style={{ marginLeft: 3 }}>{item.cost}</Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                backgroundColor: Colors.secondary,
                                padding: 5,
                                borderRadius: 3,
                                alignSelf: "flex-start",
                                marginLeft: 10,
                              }}
                            >
                              <Ionicons name="add" color={"black"} size={15} />
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: "auto",
              backgroundColor: "white",
              padding: 10,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              elevation: 10,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: FontSizeADJ(0.5),
                color: "rgba(0,0,0,0.6)",
              }}
            >
              Welcome to Care
            </Text>
            <Ionicons
              name="heart"
              size={FontSizeADJ(0.5)}
              color={"rgba(0,0,0,0.6)"}
              style={{ paddingHorizontal: 2 }}
            />
            <Text
              style={{ fontSize: FontSizeADJ(0.5), color: Colors.highlight }}
            >
              by Bloom
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

export default CarePage;
