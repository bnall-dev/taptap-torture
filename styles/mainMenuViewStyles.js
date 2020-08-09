import { StyleSheet } from 'react-native';

const mainMenuViewStyles = StyleSheet.create({
  //// MAIN MENU VIEW STYLES
  mainMenuView: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'black',
  },
  // MAIN MENU LOGO STYLES

  logoText: {
    textAlign: 'center',
    color: 'rgb(175, 0,0)',
    fontSize: 48,
    fontFamily: 'MetalGear',
    margin: 8,
  },

  // MAIN MENU BUTTONS STYLES

  mainMenuButton: {
    borderWidth: 1,
    borderColor: 'rgb(125,0,0)',
    margin: 2,
    padding: 6,
  },
  mainMenuButtonText: {
    fontFamily: 'Tactical-Espionage-Action',
    color: 'rgb(175,0,0)',
    textAlign: 'center',
  },
});

export { mainMenuViewStyles };
