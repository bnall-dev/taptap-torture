import { StyleSheet } from 'react-native';

const gameViewStyles = StyleSheet.create({
  ////GAMEVIEW STYLES
  //GAME HEADER STYLES

  gameView: {
    flex: 1,
  },
  gameHeader: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 8,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  scoreDiv: {
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 6,
  },

  highscoreText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Gameplay',
  },
  //GAME BARS STYLES
  barsDiv: {
    padding: 8,
  },
  barDiv: {
    marginBottom: 8,
  },
  barText: {
    color: 'white',
    fontSize: 16,
    position: 'absolute',
    bottom: -8,
    marginLeft: 10,
  },
  healthbarBox: {
    width: 200,
    borderWidth: 3,
    borderColor: 'black',
    backgroundColor: 'rgba(0, 0, 0, 0.555)',
  },

  //IMAGE STYLES
  imgDiv: {
    backgroundColor: 'black',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 4,
    paddingBottom: 16,
    flex: 3,
  },
  viewImg: { left: 0, right: 0, flex: 9 },
  scoreText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Gameplay',
    marginBottom: 6,
  },

  //BUTTON STYLES
  buttonsDiv: {
    borderWidth: 5,
    borderColor: 'black',
    flex: 5,
    margin: 8,
  },
  startButton: {
    backgroundColor: 'rgb(125,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'rgba(0,0,0,0.3)',
    flex: 4,
  },
  resistButton: {
    backgroundColor: 'rgb(175, 0,0)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'rgba(0,0,0,0.3)',
    flex: 4,
  },
  submitButton: {
    backgroundColor: 'rgb(0,0,175)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'rgba(0,0,0,0.3)',
    flex: 2,
  },

  buttonText: {
    margin: 0,
    fontFamily: 'Metal-Gear-Solid-2',
    fontSize: 48,
    color: 'rgba(0,0,0,0.3)',
  },
  submitButtonText: {
    fontFamily: 'Metal-Gear-Solid-2',
    fontSize: 36,
    color: 'rgba(0,0,0,0.3)',
  },
});

export { gameViewStyles };
