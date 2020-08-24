import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
const MainMenuView = ({
  styles,
  mainMenuViewStyles,
  startNewGame,
  openLeaderboards,
  openOptions,
  globalStyles,
}) => {
  return (
    <View style={[globalStyles.viewWindow, { padding: 0 }]}>
      <Image source={require('../assets/splash.png')} style={styles.menuLogo} />

      <View style={styles.logoTextDiv}>
        <Text style={mainMenuViewStyles.logoText}>
          TapTap
          <br />
          Torture
        </Text>
      </View>
      <View style={styles.mainMenuButtonsDiv}>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="rgb(50,0,0)"
          style={globalStyles.menuButtonLong}
          onPress={startNewGame}
        >
          <Text style={globalStyles.menuButtonLongText}>New Game</Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="rgb(50,0,0)"
          style={globalStyles.menuButtonLong}
          onPress={openLeaderboards}
        >
          <Text style={globalStyles.menuButtonLongText}>Leaderboard</Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="rgb(50,0,0)"
          style={globalStyles.menuButtonLong}
          onPress={openOptions}
        >
          <Text style={globalStyles.menuButtonLongText}>Options</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
export default MainMenuView;
