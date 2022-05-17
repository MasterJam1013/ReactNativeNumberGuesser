import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../Constants/colors";

const NumberContainer = props => {
    return(
        <View style={styles.container}>
          <Text style={styles.number}>
            {props.children}
          </Text>
        </View>
    );
};

const styles = StyleSheet.create({
container: {
    borderWidth: 2,
    borderColor: colors.border,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
},
number: {
    color: colors.number,
    fontSize: 24,
},
});

export default NumberContainer;