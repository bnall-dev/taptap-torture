import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  //GLOBAL STYLES
  app: {
    backgroundColor: 'rgb(50,50,50)',
    top: 0,
    bottom: 0,
    flex: 1,
    overflow: 'hidden',
  },
  viewWindow: {
    backgroundColor: 'black',
    flex: 1,

    padding: 16,
    alignItems: 'stretch',
  },
  copyText: {
    color: 'white',
    fontFamily: 'Helvetica',
    fontSize: 16,
    transform: [{ scaleY: 0.8 }],
    lineHeight: 20,
    textAlign: 'center',
  },

  menuButtonLong: {
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgb(125,0,0)',
    margin: 2,
    backgroundColor: 'black',
  },
  menuButtonLongText: {
    color: 'rgb(175,0,0)',
    fontFamily: 'MGS2Menu',
    fontSize: 12,
    textAlign: 'center',
    letterSpacing: 1,
  },
  menuHeaderText: {
    backgroundColor: 'rgb(175,0,0)',
    fontFamily: 'Tactical-Espionage-Action',
    padding: 4,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 8,
  },
  popupWindow: {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 16,
    padding: 16,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
    zIndex: 2,
  },
});

export { globalStyles };
