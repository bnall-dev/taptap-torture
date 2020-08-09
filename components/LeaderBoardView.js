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
        <Text style={leaderboardViewStyles.highScoresListText}>#{i + 1}</Text>
        <Text style={leaderboardViewStyles.highScoresListText}>
          {score.user}
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
      <View style={leaderboardViewStyles.highScoresListItem}>
        <Text style={leaderboardViewStyles.highScoresListText}></Text>
        <Text style={leaderboardViewStyles.highScoresListText}>USER</Text>
        <Text style={leaderboardViewStyles.highScoresListText}>SCORE</Text>
        <Text style={leaderboardViewStyles.highScoresListText}>LEVEL</Text>
      </View>
      {highScoresList}
      <TouchableHighlight onPress={openMainMenu}>
        <Text>BACK</Text>
      </TouchableHighlight>
    </View>
  );
};
export default leaderboardView;
