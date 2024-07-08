import { View, StyleSheet, ScrollView } from "react-native";
import { Colors } from "../Functions/Colors";

import { DimensionsConst } from "../Functions/DimensionsConst";

// Components
import Sale from "./Sale";
import Category from "./Category";
import ItemList from "./ItemList";
import SearchBar from "./SearchBar";

function HomePage() {
  var buttonAvail = false;
  return (
    <View style={{ backgroundColor: Colors.primary }}>
      <SearchBar />
      <ScrollView>
        <View style={styles.items}>
          <Sale />
        </View>
        <View style={styles.items}>
          <Category buttonAvail={buttonAvail} />
        </View>
        <View style={styles.items}>
          <ItemList />
        </View>
        <View style={styles.itemsEnd}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  items: {
    paddingHorizontal: DimensionsConst.width * 0.04,
    paddingTop: DimensionsConst.height * 0.02,
  },
  itemsEnd: {
    marginBottom: 300,
  },
});

export default HomePage;
