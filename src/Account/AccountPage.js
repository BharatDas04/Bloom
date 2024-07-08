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
import { useNavigation } from "@react-navigation/core";

function AccountPage() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.15,
          backgroundColor: Colors.secondary,
          justifyContent: "flex-end",
          elevation: 5,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 40,
              padding: 9,
            }}
          >
            <Ionicons name="person-outline" size={18} />
          </View>

          <Text style={{ marginLeft: 10 }}>Profile</Text>
        </View>
      </View>
      <View style={{ flex: 0.85 }}>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <View
            style={{
              backgroundColor: Colors.secondary,
              borderRadius: 70,
              padding: 8,
              borderWidth: 0.5,
              borderColor: "rgba(0,0,0,0.2)",
            }}
          >
            <Ionicons
              name="person-circle-outline"
              size={100}
              color={Colors.highlight}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: FontSizeADJ(0.5) }}>
              Aniket Chandanshive
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: Colors.secondary,
            paddingHorizontal: "4%",
            paddingBottom: "4%",
            marginHorizontal: "4%",
            marginTop: 20,
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: "rgba(0,0,0,0.2)",
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "rgba(0,0,0,0.15)",
                paddingBottom: 10,
                paddingVertical: "6%",
              }}
            >
              <Text style={{ color: "rgba(0,0,0,0.7)" }}>Edit Profile</Text>
              <Ionicons
                name="arrow-forward-outline"
                color={"rgba(0,0,0,0.7)"}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("PaymentMethodPage");
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "rgba(0,0,0,0.15)",
                paddingBottom: 10,
                paddingVertical: "6%",
              }}
            >
              <Text style={{ color: "rgba(0,0,0,0.7)" }}>Payment Methods</Text>
              <Ionicons
                name="arrow-forward-outline"
                color={"rgba(0,0,0,0.7)"}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("OrderHistoryPage");
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "rgba(0,0,0,0.15)",
                paddingBottom: 10,
                paddingVertical: "6%",
              }}
            >
              <Text style={{ color: "rgba(0,0,0,0.7)" }}>Order History</Text>
              <Ionicons
                name="arrow-forward-outline"
                color={"rgba(0,0,0,0.7)"}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("CarePage");
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "rgba(0,0,0,0.15)",
                paddingBottom: 10,
                paddingVertical: "6%",
              }}
            >
              <Text style={{ color: "rgba(0,0,0,0.7)" }}>Care</Text>
              <Ionicons
                name="heart"
                color={"rgba(0,0,0,0.7)"}
                size={16}
                style={{ marginRight: "auto", marginLeft: 5 }}
              />
              <Ionicons
                name="arrow-forward-outline"
                color={"rgba(0,0,0,0.7)"}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("Cart");
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "rgba(0,0,0,0.15)",
                paddingBottom: 10,
                paddingVertical: "6%",
              }}
            >
              <Text style={{ color: "rgba(0,0,0,0.7)" }}>Cart</Text>
              <Ionicons
                name="arrow-forward-outline"
                color={"rgba(0,0,0,0.7)"}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("Wishlist");
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "rgba(0,0,0,0.15)",
                paddingBottom: 10,
                paddingVertical: "6%",
              }}
            >
              <Text style={{ color: "rgba(0,0,0,0.7)" }}>Wishlist</Text>
              <Ionicons
                name="arrow-forward-outline"
                color={"rgba(0,0,0,0.7)"}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ gap: 10 }}>
          <View
            style={{
              backgroundColor: Colors.secondary,
              paddingHorizontal: "4%",
              marginHorizontal: "4%",
              marginTop: 30,
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: "rgba(0,0,0,0.2)",
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  paddingVertical: "4%",
                }}
              >
                <Text style={{ color: "rgba(0,0,0,0.7)" }}>Logout</Text>
                <Ionicons
                  name="arrow-forward-outline"
                  color={"rgba(0,0,0,0.7)"}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{
              backgroundColor: Colors.secondary,
              paddingHorizontal: "4%",
              marginHorizontal: "4%",
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: "rgba(0,0,0,0.2)",
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  paddingVertical: "4%",
                }}
              >
                <Text style={{ color: "rgba(0,0,0,0.7)" }}>
                  Switch Dark Mode
                </Text>
                <Ionicons
                  name="arrow-forward-outline"
                  color={"rgba(0,0,0,0.7)"}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </View>
  );
}

export default AccountPage;
