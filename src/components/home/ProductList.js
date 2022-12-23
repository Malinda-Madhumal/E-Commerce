import { View } from "react-native";
import React from "react";
import ListCard from "./ListCard";

const ProductList = ({ data, navigation, addtoCart, dispatch }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        backgroundColor: "#eee",
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 5,
        justifyContent: "space-between",
        borderRadius: 5,
        marginBottom: 20,
      }}
    >
      {data.map((item, index) => {
        return (
          <ListCard
            item={item}
            key={index}
            navigation={navigation}
            dispatch={dispatch}
            addtoCart={addtoCart}
          />
        );
      })}
    </View>
  );
};

export default ProductList;
