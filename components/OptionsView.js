import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
const OptionsView = ({
  setGameView,
  openResetHighscore,
  resetHighscoreActive,
  setResetHighscoreActive,
  currentUser,
  resetHighScore,
  setLoginOptionActive,
  loginOptionActive,
  openLoginOption,
  globalStyles,
}) => {
  return (
    <View style={globalStyles.viewWindow}>
      {resetHighscoreActive && (
        <View style={globalStyles.popupWindow}>
          <Text style={globalStyles.menuHeaderText}>Reset</Text>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="rgb(50,0,0)"
            style={globalStyles.menuButtonLong}
            onPress={resetHighScore}
          >
            <Text style={globalStyles.menuButtonLongText}>CONFIRM</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={globalStyles.menuButtonLong}
            onPress={() => setResetHighscoreActive(false)}
          >
            <Text style={globalStyles.menuButtonLongText}>CANCEL</Text>
          </TouchableHighlight>
        </View>
      )}

      {loginOptionActive && (
        <View style={globalStyles.popupWindow}>
          <Text style={globalStyles.menuHeaderText}>Log In</Text>
          <TouchableHighlight
            style={globalStyles.menuButtonLong}
            activeOpacity={1}
            underlayColor="rgb(50,0,0)"
          >
            <Text style={globalStyles.menuButtonLongText}>GOOGLE</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={globalStyles.menuButtonLong}
            activeOpacity={1}
            underlayColor="rgb(50,0,0)"
          >
            <Text style={globalStyles.menuButtonLongText}>FACEBOOK</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={globalStyles.menuButtonLong}
            activeOpacity={1}
            underlayColor="rgb(50,0,0)"
          >
            <Text
              style={globalStyles.menuButtonLongText}
              onPress={() => setLoginOptionActive(false)}
            >
              CANCEL
            </Text>
          </TouchableHighlight>
        </View>
      )}

      <Text style={globalStyles.menuHeaderText}>OPTIONS</Text>
      <Text style={globalStyles.copyText}>MISSION BRIEFING</Text>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'white' }}></View>
      <Text style={globalStyles.copyText}>
        Press the RESIST button repeatedly to regain your strength. When you've
        had enough, press the SUBMIT button to submit your score. When your Life
        reaches zero, the game is over and your score is reset. There are no
        continues, my friend.
      </Text>
      <View
        style={{
          borderBottomColor: 'rgb(125,0,0)',
          borderBottomWidth: 1,
          margin: 16,
        }}
      ></View>
      <Text style={globalStyles.copyText}>
        HIGH SCORE: {currentUser.highscore}
      </Text>

      <TouchableHighlight
        onPress={openResetHighscore}
        style={globalStyles.menuButtonLong}
        activeOpacity={1}
        underlayColor="rgb(50,0,0)"
      >
        <Text style={globalStyles.menuButtonLongText}>RESET HIGH SCORE</Text>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={openLoginOption}
        style={globalStyles.menuButtonLong}
        activeOpacity={1}
        underlayColor="rgb(50,0,0)"
      >
        <Text style={globalStyles.menuButtonLongText}>LOG IN</Text>
      </TouchableHighlight>
      <Text style={globalStyles.copyText}>
        Log in to receive a Codename, access the Leaderboard, and earn
        Achievements
      </Text>
      <TouchableHighlight
        onPress={() => setGameView('mainMenu')}
        style={globalStyles.menuButtonLong}
        activeOpacity={1}
        underlayColor="rgb(50,0,0)"
      >
        <Text style={globalStyles.menuButtonLongText}>BACK</Text>
      </TouchableHighlight>
    </View>
  );
};
export default OptionsView;
