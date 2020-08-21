import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
const leaderboardView = ({
  highScores,
  leaderboardViewStyles,
  openMainMenu,
}) => {
  const highScoresList = highScores.map((score, i) => {
    return (
      <View key={i} style={leaderboardViewStyles.highScoresListItem}>
        <Text style={leaderboardViewStyles.highScoresListText}>{i + 1}</Text>
        <Text style={leaderboardViewStyles.highScoresListText}>
          {score.nickname}
        </Text>
        <Text style={leaderboardViewStyles.highScoresListText}>
          {score.score}
        </Text>
        <Text style={leaderboardViewStyles.highScoresListText}>
          {score.level}
        </Text>
      </View>
    );
  });

  return (
    <View style={leaderboardViewStyles.leaderboardView}>
      <Text
        style={{
          backgroundColor: 'rgb(175,0,0)',
          fontFamily: 'Tactical-Espionage-Action',
          fontSize: 24,
          textAlign: 'center',
        }}
      >
        Top Scores
      </Text>
      <View style={leaderboardViewStyles.highScoresListItem}>
        <Text style={leaderboardViewStyles.highScoresListText}></Text>
        <Text style={leaderboardViewStyles.highScoresListText}>CODENAME</Text>
        <Text style={leaderboardViewStyles.highScoresListText}>SCORE</Text>
        <Text style={leaderboardViewStyles.highScoresListText}>LEVEL</Text>
      </View>
      <View
        style={{
          borderBottomColor: 'rgb(125,0,0)',
          borderBottomWidth: 1,
        }}
      />
      {highScoresList}
      <TouchableHighlight onPress={openMainMenu}>
        <Text
          style={{
            color: 'rgb(175,0,0)',
            fontFamily: 'Tactical-Espionage-Action',
            textAlign: 'center',
            borderColor: 'rgb(125,0,0)',
            borderWidth: 1,
          }}
        >
          BACK
        </Text>
      </TouchableHighlight>
    </View>
  );
};
export default leaderboardView;
