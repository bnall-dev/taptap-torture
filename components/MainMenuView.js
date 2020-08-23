import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
const MainMenuView = ({
  styles,
  mainMenuViewStyles,
  startNewGame,
  openLeaderboards,
  openOptions,
}) => {
  return (
    <View style={mainMenuViewStyles.mainMenuView}>
      <Image source={require('../assets/splash.png')} style={styles.menuLogo} />

      <View style={styles.logoTextDiv}>
        <Text style={mainMenuViewStyles.logoText}>TapTap Torture</Text>
      </View>
      <View style={styles.mainMenuButtonsDiv}>
        <TouchableHighlight
          style={mainMenuViewStyles.mainMenuButton}
          onPress={startNewGame}
        >
          <Text style={mainMenuViewStyles.mainMenuButtonText}>New Game</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={mainMenuViewStyles.mainMenuButton}
          onPress={openLeaderboards}
        >
          <Text style={mainMenuViewStyles.mainMenuButtonText}>Leaderboard</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={mainMenuViewStyles.mainMenuButton}
          onPress={openOptions}
        >
          <Text style={mainMenuViewStyles.mainMenuButtonText}>Options</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
export default MainMenuView;
