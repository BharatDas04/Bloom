import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../Functions/Colors";
import FontSizeADJ from "../Functions/FontSizeADJ";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import plant from "../data/plant.json";
import { useNavigation } from "@react-navigation/core";
import { useIsFocused } from "@react-navigation/core";
import {
  removeItem,
  addData,
  getAllCartItem,
} from "../Functions/AsyncFunctions";

function CartPage() {
  const [dataBody, setDataBody] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [head, setHead] = useState([]);
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  async function getData() {
    setTotal(0);
    const data = await getAllCartItem();
    let temp = [];
    let head = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i][1][0] !== 0) {
        temp.push(data[i][0]);
        head.push(data[i][1][0]);
      }
    }

    setHead(head);
    if (data != null) {
      const filteredPlants = plant.filter((item) => temp.includes(item.id));
      setDataBody(filteredPlants);
    }
  }

  useEffect(() => {
    if (isFocused) {
      getData();
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary }}>
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
              <Ionicons name="cart-outline" size={20} />
            </View>

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
      <View style={{ flex: 0.85 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {head.length === 0 && (
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
                  name="cart-outline"
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
                  No items in cart yet.
                </Text>
              </View>

              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("Home");
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
                    Show Now
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
          {isLoading && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 250,
              }}
            >
              <ActivityIndicator size={60} color={Colors.highlight} />
            </View>
          )}
          {head.length > 0 &&
            !isLoading &&
            dataBody.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.navigate("Detail", { id: item.id })}
              >
                <View
                  style={{
                    paddingVertical: "3%",
                    paddingHorizontal: "4%",
                    backgroundColor: Colors.secondary,
                    marginTop: "3%",
                    marginHorizontal: "4%",
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 12,
                  }}
                >
                  <View
                    style={{
                      flex: 0.2,
                      backgroundColor: "rgba(0,0,0, 0.1)",
                      alignItems: "center",
                      borderRadius: 12,
                      paddingVertical: "2%",
                      paddingHorizontal: "2%",
                    }}
                  >
                    <Image
                      source={{ uri: item.images }}
                      style={{ width: 55, height: 65 }}
                    />
                  </View>
                  <View style={{ flex: 0.8, marginLeft: "5%" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginRight: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: FontSizeADJ(0.6),
                          fontWeight: "bold",
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSizeADJ(0.5),
                          fontWeight: "bold",
                        }}
                      >
                        ₹ {item.cost}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: FontSizeADJ(0.45),
                          color: "rgba(0,0,0,0.7)",
                          marginVertical: 3,
                          width: "90%",
                        }}
                      >
                        {item.description}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        backgroundColor: Colors.secondary,
                        borderRadius: 12,
                        alignItems: "center",
                        marginTop: "auto",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginTop: "5%",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          width: "30%",
                          backgroundColor: Colors.primary,
                          borderRadius: 5,
                          padding: 5,
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginRight: 15,
                        }}
                      >
                        <TouchableWithoutFeedback
                          onPress={() => {
                            removeItem(item.id);
                            getData();
                          }}
                        >
                          <Ionicons
                            name="remove-outline"
                            size={15}
                            color={"black"}
                          />
                        </TouchableWithoutFeedback>
                        <Text style={{}}>{head[index]}</Text>
                        <TouchableWithoutFeedback
                          onPress={() => {
                            addData(item.id, [1]);
                            getData();
                          }}
                        >
                          <Ionicons
                            name="add-outline"
                            size={15}
                            color={"black"}
                          />
                        </TouchableWithoutFeedback>
                      </View>
                      <Ionicons
                        name="trash-bin-outline"
                        color={"darkred"}
                        size={20}
                        onPress={() => {
                          addData(item.id, [-head[index]]);
                          getData();
                        }}
                      />
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))}
          <View style={{ paddingVertical: 10 }}></View>
        </ScrollView>

        {head.length > 0 && (
          <View
            style={{
              backgroundColor: Colors.secondary,
              paddingVertical: "3%",
              paddingHorizontal: "5%",
              flexDirection: "row",
              gap: 10,
              borderTopColor: "rgba(0,0,0,0.1)",
              borderTopWidth: 1,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
          >
            <View
              style={{
                backgroundColor: Colors.primary,
                paddingVertical: "3%",
                paddingHorizontal: "3%",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                flex: 0.5,
                elevation: 1,
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("Home");
                }}
              >
                <Text style={{ color: "black" }}>Continue shopping</Text>
              </TouchableWithoutFeedback>
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("CheckOutPage", {
                  head: head,
                  dataBody: dataBody,
                });
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.highlight,
                  paddingVertical: "3%",
                  paddingHorizontal: "3%",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 0.5,
                  elevation: 1,
                }}
              >
                <Text style={{ color: "white" }}>Check out</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
    </View>
  );
}

export default CartPage;
