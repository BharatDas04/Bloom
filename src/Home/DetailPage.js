import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../Functions/Colors";
import FontSizeADJ from "../Functions/FontSizeADJ";
import { Ionicons } from "@expo/vector-icons";
import { DimensionsConst } from "../Functions/DimensionsConst";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useState, useEffect, useRef } from "react";
import plant from "../data/plant.json";
import {
  addData,
  addFav,
  removeItem,
  retrieveItem,
  removeFav,
} from "../Functions/AsyncFunctions";
import Toast from "react-native-simple-toast";
import { useIsFocused } from "@react-navigation/core";

function DetailPage({ route, navigation }) {
  const { id } = route.params;
  const isFocus = useIsFocused();
  const statusBarHeight = getStatusBarHeight();
  const getFormattedDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    return [day, month];
  };
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(today.getDate() + 2);
  const dayAfterDayAfterTomorrow = new Date();
  dayAfterDayAfterTomorrow.setDate(today.getDate() + 3);

  const tomorrowDate = getFormattedDate(tomorrow);
  const dayAfterTomorrowDate = getFormattedDate(dayAfterTomorrow);
  const dayAfterDayAfterTomorrowDate = getFormattedDate(
    dayAfterDayAfterTomorrow
  );

  const [kyounichi, setKyounichi] = useState(true);
  const [ashita, setAshita] = useState(false);
  const [asatte, setAsatte] = useState(false);
  const [newDay, setNewDay] = useState(false);
  const [finalDate, setFinalDate] = useState(today);

  const [pot1, setPot1] = useState(true);
  const [pot2, setPot2] = useState(false);
  const [pot3, setPot3] = useState(false);
  const [pot4, setPot4] = useState(false);
  const [finalType, setFinalType] = useState("White Pot");

  const [dataAdded, setDataAdded] = useState(false);
  const [displayDateError, setDisplaDateError] = useState(false);
  const [displayPotError, setDisplayPotError] = useState(false);

  const [itemPotType, setItemPotType] = useState("");
  const [itemDate, setItemDate] = useState([]);
  const [itemQuan, setItemQuan] = useState(0);

  const [isFav, setIsFav] = useState(false);

  const [careLoad, setCareLoad] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);
  const [photoLoad, setPhotoLoad] = useState(true);

  // Getting Data
  const data = plant.find((item) => item.id === id);

  const toggleDate = (dat) => {
    if (!dataAdded) {
      if (dat === "kyounichi") {
        setKyounichi(true);
        setAshita(false);
        setAsatte(false);
        setNewDay(false);
        setFinalDate(today);
      } else if (dat === "ashita") {
        setKyounichi(false);
        setAshita(true);
        setAsatte(false);
        setNewDay(false);
        setFinalDate(tomorrow);
      } else if (dat === "asatte") {
        setKyounichi(false);
        setAshita(false);
        setAsatte(true);
        setNewDay(false);
        setFinalDate(dayAfterTomorrow);
      } else if (dat === "newDay") {
        setKyounichi(false);
        setAshita(false);
        setAsatte(false);
        setNewDay(true);
        setFinalDate(dayAfterDayAfterTomorrow);
      }
    } else {
      setDisplaDateError(true);
    }
  };

  const togglepot = (dat) => {
    if (!dataAdded) {
      if (dat === "pot1") {
        setPot1(true);
        setPot2(false);
        setPot3(false);
        setPot4(false);
        setFinalType("White Pot");
      } else if (dat === "pot2") {
        setPot1(false);
        setPot2(true);
        setPot3(false);
        setPot4(false);
        setFinalType("Ceramic Pot");
      } else if (dat === "pot3") {
        setPot1(false);
        setPot2(false);
        setPot3(true);
        setPot4(false);
        setFinalType("Cardboard Pot");
      } else if (dat === "pot4") {
        setPot1(false);
        setPot2(false);
        setPot3(false);
        setPot4(true);
        setFinalType("Plastic Pot");
      }
    } else {
      setDisplayPotError(true);
    }
  };

  async function addDataToCart() {
    const itemDetails = [1, getFormattedDate(finalDate), finalType];
    await addData(data.id, itemDetails);
    setDataAdded(true);
    referesher();
    setDisplaDateError(false);
    setDisplayPotError(false);
  }

  async function removeFromCart() {
    await removeItem(id);
    await referesher();
    setDisplaDateError(false);
    setDisplayPotError(false);
  }

  useEffect(() => {
    if (itemQuan === 0) {
      setDataAdded(false);
    }
  }, [itemQuan]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function toggleFavourite() {
    if (!isFav) {
      setCareLoad(true);
      await addFav(id);

      await delay(1000);
      startAnimation();
      Toast.show(`Added to Care`);
    } else {
      await removeFav(id);
    }
    referesher();
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoad(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhotoLoad(false);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  async function referesher() {
    const itemData = JSON.parse(await retrieveItem(id));
    if (itemData != null) {
      setItemQuan(itemData[0]);
      setItemDate(itemData[1]);
      setItemPotType(itemData[2]);

      if (itemData.includes("fav")) {
        setIsFav(true);
      } else {
        setIsFav(false);
      }
    } else {
      setIsFav(false);
    }
    setCareLoad(false);
  }

  useEffect(() => {
    if (isFocus) {
      referesher();
    }
  }, [isFocus]);

  useEffect(() => {
    if (itemQuan > 0) setDataAdded(true);
  }, [itemQuan]);

  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const particles = useRef(
    new Array(20).fill().map(() => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }))
  ).current;

  const startAnimation = () => {
    scaleValue.setValue(0);
    opacityValue.setValue(1);

    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5, // Grow the heart
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0, // Fade out the heart
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    particles.forEach((particle, index) => {
      particle.x.setValue(0);
      particle.y.setValue(0);
      particle.opacity.setValue(1);

      Animated.parallel([
        Animated.timing(particle.x, {
          toValue: Math.random() * 200 - 100,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(particle.y, {
          toValue: Math.random() * 200 - 100,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(particle.opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: DimensionsConst.width * 0.04,
          position: "absolute",
          zIndex: 1,
          marginTop: statusBarHeight + DimensionsConst.height * 0.03,
          flex: 0.5,
        }}
      >
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View
            style={{ backgroundColor: "white", borderRadius: 50, padding: 8 }}
          >
            <Ionicons name="return-up-back" size={FontSizeADJ(0.7)} />
          </View>
        </TouchableWithoutFeedback>
        <View style={{ flexDirection: "row" }}>
          <TouchableWithoutFeedback
            onPress={() => {
              toggleFavourite();
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 50,
                padding: 8,
                marginRight: 10,
              }}
            >
              {!isFav && (
                <Ionicons name="heart-outline" size={FontSizeADJ(0.7)} />
              )}
              {isFav && <Ionicons name="heart" size={FontSizeADJ(0.7)} />}
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{ backgroundColor: "white", borderRadius: 50, padding: 8 }}
          >
            <Ionicons name="share-social-outline" size={FontSizeADJ(0.7)} />
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: Colors.secondary,
          flex: 0.5,
          alignItems: "center",
          justifyContent: "center",
          marginTop: statusBarHeight + 10,
          elevation: 2,
        }}
      >
        {!photoLoad && (
          <Image
            source={{ uri: data.images }}
            style={{ width: 320, height: 320 }}
          />
        )}
        {photoLoad && (
          <View
            style={{
              flex: 0.5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size={"large"} color={Colors.highlight} />
          </View>
        )}
      </View>
      {pageLoad && (
        <View
          style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={"large"} color={Colors.highlight} />
        </View>
      )}
      {!pageLoad && (
        <View style={{ flex: 0.5 }}>
          <View
            style={{
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Animated.View
              style={[
                styles.heart,
                {
                  transform: [{ scale: scaleValue }],
                  opacity: opacityValue,
                },
              ]}
            >
              <Text style={styles.heartText}>
                <Ionicons size={75} name="heart-circle-outline" color={"red"} />
              </Text>
            </Animated.View>
            {particles.map((particle, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.particle,
                  {
                    transform: [
                      { translateX: particle.x },
                      { translateY: particle.y },
                    ],
                    opacity: particle.opacity,
                  },
                ]}
              />
            ))}
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                paddingHorizontal: DimensionsConst.width * 0.04,
                paddingTop: DimensionsConst.height * 0.02,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: FontSizeADJ(0.9),
                  fontWeight: "bold",
                  color: "rgba(0,0,0,0.8)",
                }}
              >
                {data.name.toUpperCase()}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>{data.rating} </Text>
                <Ionicons name="star" color={"gold"} size={FontSizeADJ(0.5)} />
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: DimensionsConst.width * 0.04,
                paddingTop: DimensionsConst.height * 0.02,
              }}
            >
              <Text style={{ fontSize: FontSizeADJ(0.8) }}>Details</Text>
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  width: "80%",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    gap: 10,
                    paddingHorizontal: DimensionsConst.width * 0.04,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Mounting Type</Text>
                  <Text style={{ fontWeight: "bold" }}>Style</Text>
                  <Text style={{ fontWeight: "bold" }}>Special Feature</Text>
                  <Text style={{ fontWeight: "bold" }}>Planter Form</Text>
                </View>
                <View style={{ gap: 10 }}>
                  <Text>Tabletop</Text>
                  <Text>Classic</Text>
                  <Text>Dust Resistant, Lightweight</Text>
                  <Text>Plant Pot</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: DimensionsConst.width * 0.04,
                paddingTop: DimensionsConst.height * 0.02,
              }}
            >
              <Text style={{ fontSize: FontSizeADJ(0.8) }}>Delivery Date</Text>
              <View
                style={{
                  paddingTop: DimensionsConst.height * 0.01,
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => toggleDate("kyounichi")}
                >
                  <View
                    style={[
                      styles.Delivery,
                      {
                        borderWidth: kyounichi ? 1 : 0,
                        opacity: dataAdded && !kyounichi ? 0.5 : 1,
                      },
                    ]}
                  >
                    <Text>Today</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => toggleDate("ashita")}>
                  <View
                    style={[
                      styles.Delivery,
                      {
                        borderWidth: ashita ? 1 : 0,
                        opacity: dataAdded && !ashita ? 0.5 : 1,
                      },
                    ]}
                  >
                    <Text>{tomorrowDate[1] + " " + tomorrowDate[0]}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => toggleDate("asatte")}>
                  <View
                    style={[
                      styles.Delivery,
                      {
                        borderWidth: asatte ? 1 : 0,
                        opacity: dataAdded && !asatte ? 0.5 : 1,
                      },
                    ]}
                  >
                    <Text>
                      {dayAfterTomorrowDate[0] + " " + dayAfterTomorrowDate[1]}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => toggleDate("newDay")}>
                  <View
                    style={[
                      styles.Delivery,
                      {
                        borderWidth: newDay ? 1 : 0,
                        opacity: dataAdded && !newDay ? 0.5 : 1,
                      },
                    ]}
                  >
                    <Text>
                      {dayAfterDayAfterTomorrowDate[0] +
                        " " +
                        dayAfterDayAfterTomorrowDate[1]}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              {displayDateError && (
                <Text
                  style={{
                    color: "red",
                    fontSize: FontSizeADJ(0.4),
                    marginTop: 10,
                  }}
                >
                  * Delivery date has to same for the items.
                </Text>
              )}
            </View>
            <View
              style={{
                paddingHorizontal: DimensionsConst.width * 0.04,
                paddingTop: DimensionsConst.height * 0.02,
              }}
            >
              <Text style={{ fontSize: FontSizeADJ(0.8) }}>Box</Text>
              <View
                style={{
                  paddingTop: DimensionsConst.height * 0.01,
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <TouchableWithoutFeedback onPress={() => togglepot("pot1")}>
                  <View
                    style={[
                      styles.Pot,
                      {
                        borderWidth: pot1 ? 1 : 0,
                        opacity: dataAdded && !pot1 ? 0.5 : 1,
                      },
                    ]}
                  >
                    <Image
                      source={require("../Images/box1.png")}
                      style={{ width: 50, height: 50 }}
                    />
                    <Text
                      style={{
                        fontSize: FontSizeADJ(0.4),
                        color: "rgba(0,0,0,0.5)",
                        marginTop: 5,
                      }}
                    >
                      White pot
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => togglepot("pot2")}>
                  <View
                    style={[
                      styles.Pot,
                      {
                        borderWidth: pot2 ? 1 : 0,
                        opacity: dataAdded && !pot2 ? 0.5 : 1,
                      },
                    ]}
                  >
                    <Image
                      source={require("../Images/box2.png")}
                      style={{ width: 50, height: 50 }}
                    />
                    <Text
                      style={{
                        fontSize: FontSizeADJ(0.4),
                        color: "rgba(0,0,0,0.5)",
                        marginTop: 5,
                      }}
                    >
                      Ceramic pot
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => togglepot("pot3")}>
                  <View
                    style={[
                      styles.Pot,
                      {
                        borderWidth: pot3 ? 1 : 0,
                        opacity: dataAdded && !pot3 ? 0.5 : 1,
                      },
                    ]}
                  >
                    <Image
                      source={require("../Images/box3.png")}
                      style={{ width: 50, height: 50 }}
                    />
                    <Text
                      style={{
                        fontSize: FontSizeADJ(0.4),
                        color: "rgba(0,0,0,0.5)",
                        marginTop: 5,
                      }}
                    >
                      cardboard
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => togglepot("pot4")}>
                  <View
                    style={[
                      styles.Pot,
                      {
                        borderWidth: pot4 ? 1 : 0,
                        opacity: dataAdded && !pot4 ? 0.5 : 1,
                      },
                    ]}
                  >
                    <Image
                      source={require("../Images/box4.png")}
                      style={{ width: 50, height: 50 }}
                    />
                    <Text
                      style={{
                        fontSize: FontSizeADJ(0.4),
                        color: "rgba(0,0,0,0.5)",
                        marginTop: 5,
                      }}
                    >
                      plastic
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              {displayPotError && (
                <Text
                  style={{
                    color: "red",
                    fontSize: FontSizeADJ(0.4),
                    marginTop: 10,
                  }}
                >
                  * Pot type has to same for the items.
                </Text>
              )}
            </View>
            <View
              style={{
                paddingHorizontal: DimensionsConst.width * 0.04,
                paddingTop: DimensionsConst.height * 0.02,
                marginBottom: 100,
              }}
            >
              <Text style={{ fontSize: FontSizeADJ(0.8) }}>
                Preserving Methods
              </Text>
              <View
                style={{
                  marginVertical: 10,
                  paddingHorizontal: DimensionsConst.width * 0.04,
                }}
              >
                <Text style={styles.methodsStyle}>Warning : Do not eat</Text>
                <Text style={styles.methodsStyle}>{data.steps[0]}</Text>
                <Text style={styles.methodsStyle}>{data.steps[1]}</Text>
                <Text style={styles.methodsStyle}>{data.steps[2]}</Text>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: DimensionsConst.width * 0.04,
              position: "absolute",
              bottom: 0,
              backgroundColor: "white",
              paddingVertical: 15,
              elevation: 10,
              width: "100%",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View>
              <Text
                style={{ fontSize: FontSizeADJ(0.5), color: "rgba(0,0,0,0.6)" }}
              >
                Total Cost:
              </Text>
              <Text style={{ fontSize: FontSizeADJ(0.5) }}>
                ₹ {data.cost}.00
              </Text>
            </View>
            {itemQuan === 0 && (
              <TouchableWithoutFeedback onPress={addDataToCart}>
                <View
                  style={[
                    styles.buttons,
                    { borderColor: Colors.highlight, borderWidth: 0.8 },
                  ]}
                >
                  <Text style={{ fontSize: FontSizeADJ(0.5) }}>
                    Add to Cart
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            {itemQuan > 0 && (
              <View
                style={{
                  borderWidth: 0.8,
                  borderColor: Colors.highlight,
                  width: "30%",
                  height: "100%",
                  borderRadius: 8,
                  justifyContent: "center",
                  paddingHorizontal: "5%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TouchableWithoutFeedback onPress={removeFromCart}>
                    <Ionicons
                      name="remove"
                      size={FontSizeADJ(0.6)}
                      color={"black"}
                    />
                  </TouchableWithoutFeedback>
                  <Text
                    style={{
                      fontSize: FontSizeADJ(0.6),
                      color: "black",
                    }}
                  >
                    {itemQuan}
                  </Text>

                  <TouchableWithoutFeedback onPress={addDataToCart}>
                    <Ionicons
                      name="add"
                      size={FontSizeADJ(0.6)}
                      color={"black"}
                    />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            )}
            <TouchableWithoutFeedback onPress={toggleFavourite}>
              <View
                style={[
                  styles.buttons,
                  { backgroundColor: Colors.highlight, width: "40%" },
                ]}
              >
                {careLoad && <ActivityIndicator size="small" color="white" />}
                {!isFav && !careLoad && (
                  <Text style={{ color: "white", fontSize: FontSizeADJ(0.5) }}>
                    Add to Care
                  </Text>
                )}
                {isFav && !careLoad && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{ color: "white", fontSize: FontSizeADJ(0.5) }}
                    >
                      Added to
                    </Text>
                    <Ionicons
                      color={"white"}
                      name="heart"
                      size={16}
                      style={{ marginLeft: 5 }}
                    />
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Delivery: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderColor: "rgba(0,0,0,0.5)",
  },
  Pot: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: "3%",
    paddingVertical: "3%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderColor: "rgba(0,0,0,0.5)",
  },
  methodsStyle: {
    fontSize: FontSizeADJ(0.55),
    color: "rgba(0,0,0,0.6)",
    marginVertical: 2,
  },
  buttons: {
    borderRadius: 8,
    paddingHorizontal: "10%",
    paddingVertical: "4%",
  },
  heart: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  heartText: {
    fontSize: 50,
  },
  particle: {
    position: "absolute",
    width: 10,
    height: 10,
    backgroundColor: "rgba(255, 0, 0, 0.8)",
    borderRadius: 5,
  },
});

export default DetailPage;
