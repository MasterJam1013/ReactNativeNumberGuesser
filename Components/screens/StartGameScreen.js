import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../Card";
import colors from "../../Constants/colors";
import Input from "../Input";
import NumberContainer from "../NumberContainer";

const StartGameScreen = props => {
  // Managing state. setSelectedNumber value set to parseInt entered value
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  // Function to validate user input. Replace text in a string using regular expressions (/[]/) that is not between 0-9 globally with empty string
  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };
  // Function to reset user input
  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };
  // Function to confirm user input. Validation, if not a number or less than or equal to 0 or greater than 99 return Native Alert API . Alert requires title and msg as string and button as an array
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number!', 'All numbers must be between 1 and 99', [
        { text: 'Okay', style: 'destructive', onPress: resetInputHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };
  // Error handling, if valid number output text msg
  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You've selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button title= "Begin Game" onPress={() => props.onStartGame(selectedNumber)}/>
      </Card>
    );
  }

  return (
    // Touchable without feedback, dismiss keyboard when user touch outside of keyboard using built in native keyboard API
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Begin new Prediction</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          {/* utilizing built in react props. keyboard type presents specific soft keyboard to user */}
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              {/* when initially setting up button use onPress={() => {}} as empty function later to be replaced with handler function */}
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={colors.cancel}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={colors.submit}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;
