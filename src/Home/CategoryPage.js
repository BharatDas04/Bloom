import { View, StyleSheet } from "react-native";
import { DimensionsConst } from "../Functions/DimensionsConst";
import { Colors } from "../Functions/Colors";

// Components
import SearchBar from "./SearchBar";
import Category from "./Category";

function CategoryPage() {
  const buttonAvail = true;
  return (
    <View style={{ backgroundColor: Colors.primary }}>
      <SearchBar />
      <View style={styles.items}>
        <Category buttonAvail={buttonAvail} />
      </View>
      <View style={styles.items}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  items: {
    paddingHorizontal: DimensionsConst.width * 0.04,
    paddingTop: DimensionsConst.height * 0.02,
  },
});

export default CategoryPage;
