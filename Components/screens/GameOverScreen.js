import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Game Over</Text>
      <Image fadeDuration={3000}
        source={{
          uri: "https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/e07464a5a150b57.png",
        }}style={styles.image}
        resizeMode='cover'
      />
      {/* add styling to text component */}
      <Text>Wow human it took me {props.numberOfAttempts} to guess {props.userNumber}. Is this the best you got?</Text>
      <Button title="New Game" onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
      height:'50%',
      width:'100%',
  }
});

export default GameOverScreen;
