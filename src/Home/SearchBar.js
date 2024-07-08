import {
  View,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  BackHandler,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import FontSizeADJ from "../Functions/FontSizeADJ";
import { DimensionsConst } from "../Functions/DimensionsConst";
import { Colors } from "../Functions/Colors";
import Modal from "react-native-modal";
import { useState, useEffect, useRef } from "react";
import data from "../data/plant.json";
import { useNavigation } from "@react-navigation/core";

function SearchBar() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalSearch, setIsModalSearch] = useState(false);
  const [isSearchBar, setIsSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const textInputRef = useRef(null); // Correct ref initialization
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    const backAction = () => {
      if (isFocused) {
        textInputRef.current?.blur();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isFocused]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleModalSearch = (val) => {
    setIsModalSearch(val);
  };

  return (
    <View
      style={{
        backgroundColor: Colors.secondary,
        paddingTop: Constants.statusBarHeight + DimensionsConst.height * 0.05,
        paddingHorizontal: DimensionsConst.width * 0.07,
        paddingBottom: DimensionsConst.height * 0.02,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View>
          <Image
            source={require("../Images/logo-no-background.png")}
            style={{ width: 120, height: 30, resizeMode: "cover" }}
          />
        </View>
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            paddingHorizontal: DimensionsConst.width * 0.042,
            paddingVertical: DimensionsConst.height * 0.015,
            borderRadius: 7,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: FontSizeADJ(0.47),
            }}
          >
            India, IN &nbsp;
            <Ionicons name="location" size={FontSizeADJ(0.4)} color={"white"} />
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginTop: DimensionsConst.height * 0.02,
        }}
      >
        <TouchableWithoutFeedback onPress={() => toggleModalSearch(true)}>
          <View
            style={{
              width: "85%",
              flexDirection: "row",
              backgroundColor: Colors.primary,
              alignItems: "center",
              paddingHorizontal: DimensionsConst.width * 0.03,
              height: DimensionsConst.height * 0.05,
              borderRadius: 5,
            }}
          >
            <Ionicons
              name="search"
              style={{
                paddingLeft: DimensionsConst.width * 0.01,
              }}
            />
            <Text
              style={{
                fontSize: FontSizeADJ(0.45),
                color: "rgba( 0, 0, 0, 0.6)",
                marginLeft: 7,
              }}
            >
              Search...
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableHighlight
          onPress={toggleModal}
          style={{
            width: "10%",
            backgroundColor: Colors.primary,
            alignItems: "center",
            justifyContent: "center",
            height: DimensionsConst.height * 0.05,
            borderRadius: 5,
          }}
          underlayColor={Colors.secondary}
        >
          <Ionicons name="filter-outline" size={18} />
        </TouchableHighlight>
      </View>

      <Modal
        style={{
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
        }}
        isVisible={isModalVisible}
        onBackButtonPress={toggleModal}
        animationIn={"zoomIn"}
        animationOut={"zoomOut"}
        backdropOpacity={0.4}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.primary,
            paddingVertical: "2%",
            paddingHorizontal: "4%",
          }}
        >
          <Text>Currently No Filter Available</Text>
        </View>
      </Modal>
      <Modal
        isVisible={isModalSearch}
        onBackButtonPress={() => toggleModalSearch(false)}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        backdropOpacity={0.4}
        style={{ margin: 0 }}
      >
        <View
          style={{
            backgroundColor: Colors.secondary,
            paddingVertical: "2%",
            height: "100%",
            paddingTop: DimensionsConst.height * 0.05,
            paddingHorizontal: DimensionsConst.width * 0.07,
            paddingBottom: DimensionsConst.height * 0.02,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../Images/logo-no-background.png")}
              style={{ width: 120, height: 30, resizeMode: "cover" }}
            />
          </View>
          <View>
            <View
              style={{
                backgroundColor: Colors.primary,
                paddingVertical: DimensionsConst.height * 0.02,
                paddingHorizontal: DimensionsConst.width * 0.02,
                borderRadius: 10,
                marginTop: 30,
              }}
            >
              <TextInput
                placeholder="Search..."
                style={{
                  paddingLeft: DimensionsConst.width * 0.02,
                  width: "100%",
                }}
                onFocus={() => {
                  setIsSearchBar(true);
                  setIsFocused(true);
                }}
                onBlur={() => {
                  setIsSearchBar(false);
                  setIsFocused(false);
                }}
                ref={textInputRef}
                onChangeText={handleSearch}
                autoFocus={true}
              />
            </View>
            <ScrollView>
              {isSearchBar && (
                <View style={{ width: "100%" }}>
                  {filteredData.slice(0, 8).map((item) => (
                    <TouchableWithoutFeedback
                      key={item.id}
                      onPress={() => {
                        navigation.navigate("Detail", { id: item.id });
                        setIsModalSearch(false);
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: Colors.primary,
                          paddingVertical: 12,
                          paddingHorizontal: 20,
                          borderRadius: 5,
                          marginTop: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: FontSizeADJ(0.55),
                          }}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: FontSizeADJ(0.45),
                            color: "rgba(0,0,0,0.7)",
                            marginTop: 5,
                          }}
                        >
                          {item.description}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default SearchBar;
