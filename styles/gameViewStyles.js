import { StyleSheet } from 'react-native';

const gameViewStyles = StyleSheet.create({
  ////GAMEVIEW STYLES
  //GAME HEADER STYLES
  gameHeader: {
    flexDirection: 'column',
  },
  scoreDiv: {
    flexDirection: 'row',
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
    padding: 8,
    alignItems: 'center',
  },
  viewImg: { height: 176, borderWidth: 5, borderColor: 'black' },
  scoreText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Gameplay',
    marginBottom: 6,
  },

  //BUTTON STYLES
  buttonsDiv: {
    margin: 8,
    borderWidth: 5,
    borderColor: 'black',
  },
  startButton: {
    height: 150,
    backgroundColor: 'rgb(125,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  resistButton: {
    height: 150,
    backgroundColor: 'rgb(175, 0,0)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  submitButton: {
    height: 60,
    backgroundColor: 'rgb(0,0,175)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'rgba(0,0,0,0.3)',
  },

  buttonText: {
    margin: 0,
    fontFamily: 'Metal-Gear-Solid-2',
    fontSize: 48,
    color: 'rgba(0,0,0,0.3)',
    lineHeight: 170,
  },
  submitButtonText: {
    fontFamily: 'Metal-Gear-Solid-2',
    fontSize: 36,
    color: 'rgba(0,0,0,0.3)',
    lineHeight: 75,
  },

  // GAME MENU STYLES

  gameMenuButton: {
    margin: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgb(125,0,0)',
  },
  gameMenuText: {
    fontFamily: 'Tactical-Espionage-Action',
    color: 'rgb(175,0,0)',
    fontSize: 18,
    textAlign: 'center',
  },
});

export { gameViewStyles };
