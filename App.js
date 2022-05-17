import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./Components/Header";
import StartGameScreen from "./Components/screens/StartGameScreen";
import GameScreen from "./Components/screens/GameScreen";
import GameOverScreen from "./Components/screens/GameOverScreen";
import * as Font from "expo-font";
import { AppLoading } from "expo";

// function outside of functional component, doesn't need to be recreated for every component rerender cycle. loadAsync, 'name': require(relative path of desired font). Returns a promise
// const fetchFonts = () => {
//   return Font.loadAsync({
//     'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
//     'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
//   });
// };

export default function App() {
  // Managing state of screen viewed by user
  const [userNumber, setUserNumber] = useState();
  const [numberOfAttempts, setNumberOfAttempts] = useState(0);
  // const [dataLoaded, setDataLoaded] = useState(false);
  // // if no data has been loaded display app loading component. startAsync, point at operation when first rendered(fetchFonts), has to be a function and has to return a promise. Log error to console 
  // if (!dataLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={() => setDataLoaded(true)}
  //       onError={(err) => console.log(err)}
  //     />
  //   );
  // }

  // function to config new game, set num of attempts to 0, user num to null
  const newGameHandler = () => {
    setNumberOfAttempts(0);
    setUserNumber(null);
  };

  // Function to handle start game button presenting new screen to user
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };
  // function to handle the end of game after computer guesses user number
  const gameOverHandler = (numOfAttempts) => {
    setNumberOfAttempts(numOfAttempts);
  };

  // default content user sees will be start game
  let content = <StartGameScreen onStartGame={startGameHandler} />;
  // if user picks a number display secondary game screen (only displays if user has picked a number and no guess attempts have been made)
  if (userNumber && numberOfAttempts <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
    // else if num of attempts more than 0 display game over screen
  } else if (numberOfAttempts > 0) {
    content = (
      <GameOverScreen
        roundsNumber={numberOfAttempts}
        userNumber={userNumber}
        onRestart={newGameHandler}
      />
    );
  }
  return (
    <View style={styles.screen}>
      <Header title="Predict a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
