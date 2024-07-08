import AsyncStorage from "@react-native-async-storage/async-storage";

export async function addData(key, data) {
  try {
    let b = await AsyncStorage.getItem(key);
    if (b === null || b === undefined || b === "null") {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } else {
      b = JSON.parse(b);
      b[0] = b[0] + data[0];
      await AsyncStorage.setItem(key, JSON.stringify(b));
    }
  } catch (error) {
    console.log("Error adding Data ", error);
  }
}

export async function removeData(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error removing data:", error);
  }
}

export async function removeItem(key) {
  try {
    const b = await AsyncStorage.getItem(key);
    if (b === null || b === undefined || b === "null") {
      console.log("item doesnt Exist");
    } else {
      const temp = JSON.parse(b);
      let currQuan = temp[0];
      if (currQuan > 0) {
        currQuan = currQuan - 1;
        temp[0] = currQuan;
        await AsyncStorage.setItem(key, JSON.stringify(temp));
      } else {
        console.log("item amount already 0");
      }
    }
  } catch (error) {
    console.log("error removing item : ", error);
  }
}

export async function retrieveItem(key) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log("error retrieving data : ", error);
  }
}

export async function addFav(key) {
  try {
    let currData = await AsyncStorage.getItem(key);
    if (currData === null || currData === undefined || currData === "null") {
      currData = [0, [0, 0], "White Pot", "fav"];
      await AsyncStorage.setItem(key, JSON.stringify(currData));
    } else {
      currData = JSON.parse(currData);
      currData = [...currData, "fav"];
      await AsyncStorage.setItem(key, JSON.stringify(currData));
    }
  } catch (error) {
    console.log("Error adding Favourite : ", error);
  }
}

export async function removeFav(key) {
  try {
    let currData = await AsyncStorage.getItem(key);
    currData = JSON.parse(currData);
    currData = currData.slice(0, -1);
    await AsyncStorage.setItem(key, JSON.stringify(currData));
    // AsyncStorage.clear();
  } catch (error) {
    console.log("Error adding Favourite : ", error);
  }
}

export async function retrieveCare() {
  try {
    let currData = await AsyncStorage.getAllKeys();
    if (currData.length > 0) {
      const stores = await AsyncStorage.multiGet(currData);
      const data = stores.map((result, i, store) => {
        let key = store[i][0];
        let value = store[i][1];
        value = JSON.parse(value);
        if (value.includes("fav")) {
          return { [key]: value };
        }
      });

      let d = [];
      data.map((item) => {
        if (item !== undefined) {
          d = [...d, Object.keys(item)];
        }
      });

      return d;
    }
  } catch (error) {
    console.log("Error retrieving Care items : ", error);
  }
}

export async function getAllCartItem() {
  try {
    const temp = await AsyncStorage.getAllKeys();
    const items = await Promise.all(
      temp.map(async (id) => {
        const item = await AsyncStorage.getItem(id);
        return [id, JSON.parse(item)];
      })
    );

    return items;
  } catch (e) {
    console.log("Error getting All the cart data : ", e);
  }
}
