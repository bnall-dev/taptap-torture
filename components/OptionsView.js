import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
const OptionsView = ({
  setGameView,
  openResetHighscore,
  resetHighscoreActive,
  setResetHighscoreActive,
  currentUser,
  resetHighScore,
}) => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        margin: 16,
        padding: 16,
        alignItems: 'stretch',
      }}
    >
      {resetHighscoreActive && (
        <View
          style={{
            left: 0,
            right: 0,
            marginTop: 64,
            padding: 16,
            zIndex: 2,
            position: 'absolute',
            backgroundColor: 'black',
            borderWidth: 1,
            borderColor: 'white',
            alignItems: 'stretch',
          }}
        >
          <Text
            style={{
              fontFamily: 'Tactical-Espionage-Action',
              backgroundColor: 'rgb(175,0,0)',
              padding: 4,
            }}
          >
            CONFIRM
          </Text>
          <TouchableHighlight
            style={{
              backgroundColor: 'black',
              borderWidth: 1,
              borderColor: 'rgb(125,0,0)',
              padding: 4,
              marginTop: 8,
              marginBottom: 4,
            }}
            onPress={resetHighScore}
          >
            <Text
              style={{
                color: 'rgb(175,0,0)',
                fontFamily: 'Tactical-Espionage-Action',
              }}
            >
              Reset
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              backgroundColor: 'black',
              borderWidth: 1,
              borderColor: 'rgb(125,0,0)',
              padding: 4,
            }}
            onPress={() => setResetHighscoreActive(false)}
          >
            <Text
              style={{
                color: 'rgb(175,0,0)',
                fontFamily: 'Tactical-Espionage-Action',
              }}
            >
              Cancel
            </Text>
          </TouchableHighlight>
        </View>
      )}

      <Text
        style={{
          backgroundColor: 'rgb(175,0,0)',
          textAlign: 'center',
          fontFamily: 'Tactical-Espionage-Action',
        }}
      >
        OPTIONS
      </Text>
      <Text style={{ color: 'white' }}>
        HIGH SCORE: {currentUser.highscore}
      </Text>

      <TouchableHighlight
        onPress={openResetHighscore}
        style={{
          backgroundColor: 'black',
          borderWidth: 1,
          borderColor: 'rgb(125,0,0)',
          padding: 4,
        }}
      >
        <Text style={{ color: 'rgb(175,0,0)' }}>RESET HIGH SCORE</Text>
      </TouchableHighlight>
      <Text style={{ color: 'white' }}>
        Create an account to receive a Codename, access the Leaderboard, and
        earn Achievements
      </Text>
      <TouchableHighlight
        onPress={() => setGameView('mainMenu')}
        style={{
          backgroundColor: 'black',
          borderWidth: 1,
          borderColor: 'rgb(125,0,0)',
          padding: 4,
        }}
      >
        <Text style={{ color: 'rgb(175,0,0)' }}>BACK</Text>
      </TouchableHighlight>
    </View>
  );
};
export default OptionsView;
