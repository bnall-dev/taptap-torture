import { StyleSheet } from 'react-native';

const leaderboardViewStyles = StyleSheet.create({
  //// LEADERBOARD VIEW STYLES

  leaderboardView: {
    alignItems: 'center',
    flex: 1,
    padding: 16,
  },
  highScoresListItem: {
    flexDirection: 'row',
    margin: 8,
  },
  highScoresListText: {
    fontFamily: 'Gameplay',
    flex: 1,
    textAlign: 'center',
  },
});

export { leaderboardViewStyles };
