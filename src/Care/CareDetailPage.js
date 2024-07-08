import {
  View,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import plant from "../data/plant.json";
import { useEffect, useState } from "react";
import { Colors } from "../Functions/Colors";
import { Ionicons } from "@expo/vector-icons";
import FontSizeADJ from "../Functions/FontSizeADJ";
import { useNavigation } from "@react-navigation/core";

function CareDetailPage({ route }) {
  const [dataBody, setDataBody] = useState({});
  const { id } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const itemData = plant.find((item) => item.id === id);
    setDataBody(itemData);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={{
          flex: 0.15,
          backgroundColor: Colors.secondary,
          alignItems: "center",
          elevation: 2,
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginTop: "auto",
            paddingVertical: "5%",
          }}
        >
          <Image
            source={require("../Images/logo-no-background.png")}
            style={{ width: 140, height: 35 }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 6,
        }}
      >
        <Text style={{ fontSize: FontSizeADJ(0.5) }}> Care</Text>
        <Ionicons
          name="heart"
          color={Colors.highlight}
          style={{ marginLeft: 2 }}
          size={15}
        />
        <Text style={{ fontSize: FontSizeADJ(0.5) }}> by Bloom</Text>
      </View>

      <View style={{ flex: 0.8 }}>
        {isLoading && (
          <View style={{ marginTop: 200 }}>
            <ActivityIndicator size={"large"} color={Colors.highlight} />
          </View>
        )}
        {!isLoading && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                gap: 20,
                paddingHorizontal: "4%",
                paddingVertical: "6%",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: dataBody.images }}
                style={{ width: 205, height: 205 }}
              />
            </View>
            <View style={{ paddingHorizontal: "7%" }}>
              <Text style={{ fontSize: FontSizeADJ(0.75), fontWeight: "bold" }}>
                Ways to Maintain
              </Text>
              <Text style={styles.waysText}>{dataBody.steps[0]}</Text>
              <Text style={styles.waysText}>{dataBody.steps[1]}</Text>
              <Text style={styles.waysText}>{dataBody.steps[2]}</Text>
            </View>
            <View style={{ paddingHorizontal: "4%", paddingVertical: "1%" }}>
              <Text style={styles.waysText}>{dataBody.description}</Text>
            </View>
            <View
              style={{
                paddingHorizontal: "4%",
                paddingVertical: "1%",
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: 100,
              }}
            >
              <View>
                <Text style={[styles.waysText, { fontWeight: "bold" }]}>
                  Water Frequency
                </Text>
                <Text style={[styles.waysText, { fontWeight: "bold" }]}>
                  Rating
                </Text>
              </View>
              <View>
                <Text style={styles.waysText}>
                  {dataBody.waterFrequency} times / week
                  <Ionicons name="water" color={"skyblue"} size={15} />
                </Text>
                <Text style={styles.waysText}>
                  {dataBody.rating}
                  <Ionicons name="star" color={"gold"} size={15} />
                </Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: "4%", paddingVertical: "5%" }}>
              <Text style={styles.waysText}>
                These plants not only enhance the beauty of indoor spaces with
                their vibrant greenery and diverse forms but also contribute
                significantly to creating a healthier living environment. Indoor
                plants help purify the air by absorbing toxins and releasing
                oxygen, thereby improving air quality and reducing the
                likelihood of respiratory issues. They can also boost mood,
                reduce stress, and increase productivity, making them ideal for
                homes, offices, and other indoor settings.
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
      <View
        style={{
          flex: 0.05,
          paddingHorizontal: "5%",
          backgroundColor: Colors.secondary,
          justifyContent: "center",
          paddingVertical: "3%",
          elevation: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            {!isLoading && (
              <Text style={{ fontSize: FontSizeADJ(0.7), fontWeight: "bold" }}>
                {dataBody.name}
              </Text>
            )}
          </View>
          <View style={{ flexDirection: "row", marginTop: "auto" }}>
            <Ionicons
              name="cart"
              color={"black"}
              size={25}
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate("Detail", { id: dataBody.id })}
            />
            <Ionicons name="share-outline" color={"black"} size={25} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  waysText: {
    fontSize: FontSizeADJ(0.55),
    paddingTop: 20,
  },
});

export default CareDetailPage;
