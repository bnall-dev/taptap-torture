import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Button,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import active from './assets/active.gif';
import idle from './assets/idle.gif';
import recover from './assets/recover.gif';
import gameover from './assets/over.gif';
import * as Font from 'expo-font';
import { Audio } from 'expo-av';
import DialogInput from 'react-native-dialog-input';

import { AppLoading, SplashScreen } from 'expo';

//FONTS
const customFonts = {
  'Metal-Gear-Solid-2': require('./assets/fonts/Metal-Gear-Solid-2.ttf'),
  Gameplay: require('./assets/fonts/Gameplay.ttf'),
  MetalGear: require('./assets/fonts/MetalGear.ttf'),
  'Tactical-Espionage-Action': require('./assets/fonts/Tactical-Espionage-Action.ttf'),
};

//SOUNDS
const music = new Audio.Sound();
const activeSound = new Audio.Sound();
const gameoverSound = new Audio.Sound();

const startMusic = async () => {
  await music.loadAsync(require('./assets/sounds/background.mp3'));
  await music.playAsync();
  await music.setVolumeAsync(0.25);
  await music.setIsLoopingAsync(true);
};
startMusic();

const loadActiveSound = async () => {
  const sound = await activeSound.loadAsync(
    require('./assets/sounds/torture.mp3')
  );
  return sound;
};
loadActiveSound();

const loadGameoverSound = async () => {
  const sound = await gameoverSound.loadAsync(
    require('./assets/sounds/gameover.mp3')
  );
  return sound;
};
loadGameoverSound();

const App = () => {
  const [gameView, setGameView] = useState('mainMenu');
  const [health, setHealth] = useState(100);
  const [time, setTime] = useState(100);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [gameRecover, setGameRecover] = useState(false);
  const [gameReset, setGameReset] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [viewImg, setViewImg] = useState(idle);
  const [reps, setReps] = useState(0);
  const [level, setLevel] = useState(0);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [gameMenuActive, setGameMenuActive] = useState(false);
  const [highScores, setHighScores] = useState([]);
  const [nicknamePromptVisible, setNicknamePromptVisible] = useState(false);
  const [nickname, setNickname] = useState('');

  //GET SCREEN DIMENSIONS
  const win = Dimensions.get('window');
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // CREATE 'USEINTERVAL' FUNCTION
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const STORAGE_KEY = '@highScores';
  const getHighScores = async () => {
    const scores = await AsyncStorage.getItem(STORAGE_KEY);

    if (scores !== null) {
      setHighScores(JSON.parse(scores));
    }
  };

  const saveHighScores = async (item) => {
    try {
      var jsonOfItem = await AsyncStorage.setItem(STORAGE_KEY, item);

      setHighScores(JSON.parse(item));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getHighScores();
  }, []);

  // LOWER HEALTH DURING ACTIVE STATE
  useInterval(() => {
    if (gameActive) {
      setHealth(health - 5);
    }
  }, 500);

  // LOWER TIME DURING ACTIVE STATE
  useInterval(() => {
    if (gameActive) {
      setTime(time - 1);
    }
  }, 100);

  // RESETS HEALTH AND TIME DURING SUBMIT STATE
  useInterval(() => {
    if (gameReset) {
      if (health < 100) {
        setHealth(health + 1);
      }
      if (time < 100) {
        setTime(time + 1);
      }
    }
  }, 50);

  //HEALTH BOOST DURING RECOVER STATE
  useInterval(() => {
    if (gameRecover) {
      if (reps < 15) {
        setHealth(health + 1);
        setReps(reps + 1);
      }
    }
  }, 50);

  //RESET TIME DURING RECOVER STATE
  useInterval(() => {
    if (gameRecover) {
      if (time < 100) {
        setTime(time + 1);
      }
    }
  }, 30);

  // START GAME
  const start = async () => {
    if (gameOver) {
      music.playAsync();
      setHealth(100);
    }
    setLevel(level + 1);
    setGameOver(false);
    setGameReset(false);

    setTime(100);
    setGameActive(true);

    try {
      await activeSound.playAsync();
      // Your sound is playing!

      // Don't forget to unload the sound from memory
      // when you are done using the Sound object
    } catch (error) {
      // An error occurred!
    }

    const stopSound = async () => {
      const sound = await gameoverSound.stopAsync();
      return sound;
    };
    stopSound();
  };

  //RESET GAME
  const reset = async () => {
    // await AsyncStorage.removeItem(STORAGE_KEY);
    const scoreObject = { score, level, user: nickname };
    if (highScores === [] || highScores.find((sc) => sc.score < score)) {
      setNicknamePromptVisible(true);
    }
    if (!nicknamePromptVisible) {
      const array = [...highScores, scoreObject];
      array.sort((a, b) => {
        return a.score - b.score;
      });
      array.reverse();
      if (array.length > 10) {
        array.pop();
      }
      saveHighScores(JSON.stringify(array));

      setLevel(0);
      setScore(0);
      setGameActive(false);
      setGameOver(false);
      setGameReset(true);
    }

    try {
      // Don't forget to unload the sound from memory
      // when you are done using the Sound object
      await activeSound.stopAsync();
    } catch (error) {
      // An error occurred!
    }
  };

  // INCREASE HEALTH ON KEYPRESS
  const resist = () => {
    if (gameActive && health < 100) {
      setScore(score + (100 - health) * 10);
      setHealth(health + 1);
    }
  };

  // RESET STATE EFFECTS
  useEffect(() => {
    if (gameReset) {
      setViewImg(idle);
    }
  }, [gameActive, gameRecover, gameReset, gameOver]);

  // ACTIVE STATE EFFECTS
  useEffect(() => {
    if (gameActive) {
      setViewImg(active);
    }
  }, [gameActive, gameRecover, gameReset, gameOver]);

  // RECOVER STATE EFFECTS
  useEffect(() => {
    if (gameRecover) {
      setViewImg(recover);
      const stopSound = async () => {
        const sound = await activeSound.stopAsync();
        return sound;
      };
      stopSound();
    }
  }, [gameActive, gameRecover, gameReset, gameOver]);

  //GAMEOVER STATE EFFECTS
  useEffect(() => {
    if (gameOver) {
      setLevel(0);
      setViewImg(gameover);
      const stopSound = async () => {
        const sound = await activeSound.stopAsync();
        return sound;
      };
      stopSound();
      const pauseMusic = async () => {
        await music.pauseAsync();
      };
      pauseMusic();
      const playSound = async () => {
        const sound = await gameoverSound.playAsync();
        return sound;
      };
      playSound();
    }
  }, [gameActive, gameRecover, gameReset, gameOver]);

  // IDLE STATE EFFECTS
  useEffect(() => {
    if (!gameActive && !gameOver && !gameRecover && !gameReset) {
      setViewImg(idle);
    }
  }, [gameActive, gameOver, gameReset, gameRecover]);

  // HANDLE RESET AND SUBMIT
  useEffect(() => {
    if (health === 100 && time === 100) {
      setGameReset(false);
    }
    if (time === 100) {
      setGameRecover(false);
      setReps(0);
    }
    if ((health > 0) & (time < 1)) {
      setGameActive(false);
      setGameRecover(true);
    }
    if ((health < 1) & (time > 0)) {
      setGameActive(false);
      setGameReset(false);
      setHealth(0);
      setScore(0);
      setGameOver(true);
    }
  }, [health, time]);

  const submitHighScore = async (scores) => {
    await AsyncStorage.setItem('@MySuperStore:key');
  };

  const styles = StyleSheet.create({
    app: {
      backgroundColor: 'rgb(50,50,50)',
      flex: 1,
    },

    scoreDiv: {
      flexDirection: 'row',
    },
    scoreText: {
      color: 'white',
      fontSize: 12,
      fontFamily: 'Gameplay',
      marginBottom: 6,
    },
    highscoreText: {
      color: 'white',
      fontSize: 18,
    },
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
    healthbar: {
      height: 10,
      width: health * 0.01 * 194,
      backgroundColor: 'rgb(0,200,150)',
    },
    timebarBox: {
      width: win.width * 0.9 + 6,
      borderWidth: 3,
      borderColor: 'black',
      backgroundColor: 'rgba(0, 0, 0, 0.555)',
    },
    timeBar: {
      height: 10,
      width: time * 0.01 * win.width * 0.9,
      backgroundColor: 'rgb(20,20,200)',
    },
    imgDiv: {
      backgroundColor: 'black',
      padding: 8,
      alignItems: 'center',
    },
    viewImg: { height: 176, borderWidth: 5, borderColor: 'black' },

    buttonsDiv: {
      margin: 16,
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
    startButtonDiv: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    startButtonImg: {
      width: 100,
      height: 25,
      backgroundColor: 'black',
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
    menuLogo: {
      height: win.width,
      width: win.width,
    },
    gameMenuDiv: {
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.9)',
      zIndex: 2,
      padding: 16,
      height: win.height * 0.8,
      width: win.width * 0.8,
      margin: win.width * 0.1,
    },
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
    mainMenuView: {
      alignItems: 'center',
      flex: 1,
      backgroundColor: 'black',
    },
    logoTextDiv: {
      backgroundColor: 'black',
      borderBottomWidth: 10,
      borderBottomColor: 'rgb(175, 0,0)',
      borderTopWidth: 5,
      borderTopColor: 'rgb(175, 0,0)',
      width: win.width,
      shadowColor: 'rgb(200,200,225)',
      shadowOffset: { width: 0, height: -40 },
      shadowOpacity: 0.3,
      shadowRadius: 30,
    },
    logoText: {
      textAlign: 'center',
      color: 'rgb(175, 0,0)',
      fontSize: 48,
      fontFamily: 'MetalGear',
      margin: 8,
    },
    mainMenuButtonsDiv: {
      margin: 4,
      backgroundColor: 'black',
      width: win.width,
    },
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
    gameHeader: {
      flexDirection: 'row',
    },
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

  //HANDLE APP LOADING
  if (!gameLoaded) {
    return (
      <AppLoading
        startAsync={async () => {
          await Font.loadAsync(customFonts);
        }}
        onFinish={() => setGameLoaded(true)}
        autoHideSplash="false"
      />
    );
  }

  const startNewGame = () => {
    setGameView('game');
  };
  const openMainMenu = () => {
    toggleGameMenu();
    setScore(0);
    setLevel(0);
    setTime(100);
    setHealth(100);
    setGameView('mainMenu');
  };

  const toggleGameMenu = () => {
    if (gameView === 'game' && !gameMenuActive) {
      setGameMenuActive(true);
    } else {
      setGameMenuActive(false);
    }
  };

  const highScoresList = highScores.map((score, i) => {
    return (
      <View key={i} style={styles.highScoresListItem}>
        <Text style={styles.highScoresListText}>#{i + 1}</Text>
        <Text style={styles.highScoresListText}>{score.user}</Text>
        <Text style={styles.highScoresListText}>{score.score}</Text>
        <Text style={styles.highScoresListText}>{score.level}</Text>
      </View>
    );
  });
  const openLeaderboards = () => {
    setGameView('leaderboards');
  };

  return (
    <View style={styles.app}>
      <StatusBar hidden />
      {gameView === 'mainMenu' && (
        <View style={styles.mainMenuView}>
          <Image
            source={require('./assets/splash.png')}
            style={styles.menuLogo}
          />

          <View style={styles.logoTextDiv}>
            <Text style={styles.logoText}>TapTap Torture</Text>
          </View>
          <View style={styles.mainMenuButtonsDiv}>
            <TouchableHighlight
              onPress={startNewGame}
              style={styles.mainMenuButton}
            >
              <Text style={styles.mainMenuButtonText}>New Game</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={openLeaderboards}
              style={styles.mainMenuButton}
            >
              <Text style={styles.mainMenuButtonText}>Leaderboards</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={openLeaderboards}
              style={styles.mainMenuButton}
            >
              <Text style={styles.mainMenuButtonText}>Options</Text>
            </TouchableHighlight>
          </View>
        </View>
      )}
      {gameView === 'game' && (
        <View styles={styles.gameView}>
          {gameMenuActive && (
            <View style={styles.gameMenuDiv}>
              <TouchableHighlight
                onPress={openMainMenu}
                style={styles.gameMenuButton}
              >
                <Text style={styles.gameMenuText}>Main Menu</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={toggleGameMenu}
                style={styles.gameMenuButton}
              >
                <Text style={styles.gameMenuText}>Close</Text>
              </TouchableHighlight>
            </View>
          )}
          <DialogInput
            isDialogVisible={nicknamePromptVisible}
            title={'HIGH SCORE'}
            message={'You made the Leaderboard'}
            hintInput={'Nickname'}
            submitInput={(inputText) => {
              setNickname(inputText);
            }}
            closeDialog={() => {
              setNicknamePromptVisible(false);
            }}
          ></DialogInput>
          <View style={styles.gameHeader}>
            <Text style={styles.highscoreText}>
              BIG BOSS: {highScores[0].score}
            </Text>
            <TouchableHighlight onPress={toggleGameMenu}>
              <Text>Menu</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.barsDiv}>
            <View style={styles.barDiv}>
              <View style={styles.healthbarBox}>
                <View style={styles.healthbar} />
              </View>
              <Text style={styles.barText}>LIFE</Text>
            </View>
            <View>
              <View style={styles.timebarBox}>
                <View style={styles.timeBar} />
              </View>
              <Text style={styles.barText}>TIME</Text>
            </View>
          </View>

          <View style={styles.imgDiv}>
            <View style={styles.scoreDiv}>
              <Text style={styles.scoreText}>LEVEL {level}</Text>
              <Text style={styles.scoreText}>SCORE: {score}</Text>
            </View>
            <Image source={viewImg} style={styles.viewImg} />
          </View>

          <View style={styles.buttonsDiv}>
            {!gameActive && !gameRecover && (
              <TouchableHighlight onPress={start}>
                <View style={styles.startButton}>
                  <Text style={styles.buttonText}>START</Text>
                </View>
              </TouchableHighlight>
            )}
            {gameActive && (
              <TouchableHighlight onPress={resist}>
                <View style={styles.resistButton}>
                  <Text style={styles.buttonText}>RESIST</Text>
                </View>
              </TouchableHighlight>
            )}
            {gameRecover && (
              <TouchableHighlight>
                <View style={styles.startButton}></View>
              </TouchableHighlight>
            )}
            <TouchableHighlight onPress={reset}>
              <View style={styles.submitButton}>
                <Text style={styles.submitButtonText}>SUBMIT</Text>
                <View />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      )}
      {gameView === 'leaderboards' && (
        <View style={styles.leaderboardView}>
          <View>
            <Text>SCORE</Text>
          </View>
          {highScoresList}
          <TouchableHighlight onPress={openMainMenu}>
            <Text>BACK</Text>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
};

export default App;
