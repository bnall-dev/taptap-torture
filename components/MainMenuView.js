import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Animated,
  Easing,
  ImageBackground,
} from 'react-native';

const MainMenuView = ({
  styles,
  mainMenuViewStyles,
  startNewGame,
  openLeaderboards,
  openOptions,
  globalStyles,
}) => {
  const moveImg = new Animated.Value(-15);
  const moveImg2 = new Animated.Value(15);
  const backgroundPatternMove = new Animated.Value(0);

  Animated.loop(
    Animated.sequence([
      Animated.timing(backgroundPatternMove, {
        toValue: -646,
        duration: 20000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ])
  ).start();

  Animated.loop(
    Animated.parallel([
      Animated.sequence([
        Animated.timing(moveImg, {
          toValue: 15,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(moveImg, {
          toValue: -15,
          duration: 5000,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(moveImg2, {
          toValue: -15,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(moveImg2, {
          toValue: 15,
          duration: 5000,
          useNativeDriver: true,
        }),
      ]),
    ]),

    {}
  ).start();

  return (
    <View
      style={[
        globalStyles.viewWindow,
        { padding: 0, backgroundColor: 'black' },
      ]}
    >
      <View style={{ flex: 2 }}>
        <Animated.Image
          source={require('../assets/splash.png')}
          style={[styles.menuLogo, { transform: [{ translateX: moveImg }] }]}
        />
        <Animated.Image
          source={require('../assets/splash.png')}
          style={[
            styles.menuLogo,
            {
              transform: [{ translateX: moveImg2 }, { rotate: '180deg' }],
              position: 'absolute',
            },
          ]}
        />
      </View>
      <View
        style={{ flex: 1, borderTopColor: 'rgb(125,0,0)', borderTopWidth: 3 }}
      >
        <Animated.Image
          source={require('../assets/backgroundPattern.jpg')}
          style={{
            top: 0,
            bottom: 0,
            width: 1292,
            transform: [{ translateX: backgroundPatternMove }],
            position: 'absolute',
          }}
        />
      </View>
      <View style={{ position: 'absolute', top: 0, bottom: 0 }}>
        <View
          style={[styles.logoTextDiv, { flex: 3, justifyContent: 'flex-end' }]}
        >
          <Text
            style={{
              color: 'white',
              opacity: 0.5,
              fontFamily: 'Tactical-Espionage-Action',
              fontSize: 10,
              textAlign: 'center',
              letterSpacing: 2,
            }}
          >
            Survival Endurance Action
          </Text>
          <Text style={mainMenuViewStyles.logoText}>taptap</Text>
          <Text
            style={{
              backgroundColor: 'white',
              opacity: 0.5,
              fontFamily: 'Tactical-Espionage-Action',
              padding: 0,
              textAlign: 'center',
              marginLeft: 32,
              marginRight: 32,
              transform: [{ scaleY: 1.1 }],
              lineHeight: 10,
              letterSpacing: 16,
            }}
          >
            Torture
          </Text>
        </View>

        <View style={[styles.mainMenuButtonsDiv, { flex: 1 }]}>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="rgb(50,0,0)"
            style={[
              globalStyles.menuButtonLong,
              { marginLeft: 16, marginRight: 16 },
            ]}
            onPress={startNewGame}
          >
            <Text style={globalStyles.menuButtonLongText}>NEW GAME</Text>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="rgb(50,0,0)"
            style={[
              globalStyles.menuButtonLong,
              { marginLeft: 16, marginRight: 16 },
            ]}
            onPress={openLeaderboards}
          >
            <Text style={globalStyles.menuButtonLongText}>LEADERBOARD</Text>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="rgb(50,0,0)"
            style={[
              globalStyles.menuButtonLong,
              { marginLeft: 16, marginRight: 16 },
            ]}
            onPress={openOptions}
          >
            <Text style={globalStyles.menuButtonLongText}>OPTIONS</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};
export default MainMenuView;
