import { StyleSheet } from 'react-native';

const leaderboardViewStyles = StyleSheet.create({
  //// LEADERBOARD VIEW STYLES

  leaderboardView: {
    alignItems: 'stretch',
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
    margin: 16,
  },
  highScoresListItem: {
    flexDirection: 'row',
    margin: 8,
  },
  highScoresListText: {
    fontFamily: 'Metal-Gear-Solid-2',
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    paddingTop: 5,
  },
});

export { leaderboardViewStyles };
