import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import NumberContainer from "../NumberContainer";
import Card from "../Card";

// Function to generate random number between min and max and excluding a number. rounding handled by ceil(up) and floor(down). if we get excluded number rerun function
// calling a function within a function known as recursion
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
// Managing state of computer guess by generating random number 1-99, excluding choice of user. Return current guess and btn high/low
const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );
const [attempts, setAttempts] = useState(0);
  //  Managing state after computer guess with initial boundaries for random numbers
const currentLow = useRef(1);
const currentHigh = useRef(100);

// object destructuring(props), pulling the property names out of this props object storing them in constants
const { userChoice, onGameOver } = props;

// useEffect, allows you to run logic after render cycle. if computer guess correctly pass num of attempts
useEffect(() => {
    if (currentGuess === userChoice) {
        onGameOver(attempts);
    }
    // second arg to useEffect, array of dependencies of attached function
}, [currentGuess, userChoice, onGameOver]);

  // function within functional component recieves an argument (direction) which the next guess should be
  const computerGuessHandler = direction => {
    // validation for correct rule of guess to prevent user lie
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "higher" && currentGuess > props.userChoice)
    ) {
      Alert.alert(
        "Ahh lying!!, how very human of you",
        "Fight your nature, try honesty",
        [{ text: "Try Again", style: "cancel" }]
      );
      return;
    }
    //if user is playing correctly generate new random number, useRef (in this instance) allows you to define a value whcih can survive rerendering
    if (direction === "lower"){
        currentHigh.current = currentGuess;
    } else{
        currentLow.current = currentGuess;
    }
    // generate random number with current low as min, current high as max, and exclude the current guess to prevent same number being guessed
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    // set attempts getting current attempts and returning current attempts plus 1
    setAttempts(curAttempts => curAttempts + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        {/*preconfigure the argument being passed to guess handler based on identifier  */}
        <Button
          title="Too Low"
          onPress={computerGuessHandler.bind(this, "higher")}
        />
        <Button
          title="Too High"
          onPress={computerGuessHandler.bind(this, "lower")}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
