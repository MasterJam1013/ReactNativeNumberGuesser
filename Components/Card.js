import React from "react";
import { View, StyleSheet } from "react-native";

const Card = props => {
  // passing in new object and distributing properties into new object using spread operator(...)
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  //   shadow only works on IOS, elevation on Andriod
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 10,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});

export default Card;
