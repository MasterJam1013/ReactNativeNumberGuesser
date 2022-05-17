import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = props => {
    // passing in new object and distributing properties into new object using spread operator(...). ...props, forwards your props to the component you're using in custom component
    return(
        <TextInput {...props} style={{...styles.input, ...props.style}} />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderColor: '#3b3939',
        borderWidth: 1,
        marginVertical: 10,
    },
});

export default Input;