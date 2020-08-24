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
  TextInput,
} from 'react-native';
import active from './assets/active.gif';
import idle from './assets/idle.gif';
import recover from './assets/recover.gif';
import gameover from './assets/over.gif';
import * as Font from 'expo-font';
import { Audio } from 'expo-av';
import { globalStyles } from './styles/globalStyles.js';
import { gameViewStyles } from './styles/gameViewStyles.js';
import { mainMenuViewStyles } from './styles/mainMenuViewStyles.js';
import { leaderboardViewStyles } from './styles/leaderboardViewStyles.js';
import { AppLoading, SplashScreen } from 'expo';
import LeaderboardView from './components/LeaderBoardView.js';
import GameView from './components/GameView.js';
import MainMenuView from './components/MainMenuView';
import OptionsView from './components/OptionsView';
import * as firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyD3LqQ62PJgYpvDxukCbO5YVLUwEvzemDI',
  authDomain: 'tap-tap-torture.firebaseapp.com',
  databaseURL: 'https://tap-tap-torture.firebaseio.com',
  storageBucket: 'tap-tap-torture.appspot.com',
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

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
  const [currentUser, setCurrentUser] = useState({});
  const [userNickname, setUserNickname] = useState('');
  const [leaderboardInputActive, setLeaderboardInputActive] = useState(false);
  const [resetHighscoreActive, setResetHighscoreActive] = useState(false);
  const [loginOptionActive, setLoginOptionActive] = useState(false);

  useEffect(() => {
    firebase
      .auth()
      .signInAnonymously()
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;

        console.log(user.uid);

        firebase
          .database()
          .ref('users/' + uid + '/highscore')
          .on(
            'value',
            function (snapshot) {
              const highscore = snapshot.val();

              if (!highscore) {
                firebase
                  .database()
                  .ref('users/' + uid)
                  .set({
                    highscore: 0,
                  });
                setCurrentUser({ uid, highscore: 0 });
              } else {
                console.log(highscore);
                setCurrentUser({ uid, highscore });
              }
            },
            function (error) {
              console.log('Error: ' + error.code);
            }
          );

        // ...
      } else {
        // User is signed out.
        // ...
      }
      // ...
    });
  }, []);

  useEffect(() => {
    if (firebase.auth().currentUser) {
      firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid + '/highscore')
        .on('value', function (snapshot) {
          const highscore = snapshot.val();
          console.log(highscore);
          setCurrentUser({ ...currentUser, highscore });
        });
    }
  }, []);

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
    if (score > currentUser.highscore) {
      firebase
        .database()
        .ref('users/' + currentUser.uid)
        .set({
          highscore: score,
        });
    }

    if (
      highScores.length < 10 ||
      score > highScores[highScores.length - 1].score
    ) {
      setLeaderboardInputActive(true);
    } else {
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

  useEffect(() => {
    console.log(highScores);
  }, [highScores]);

  useEffect(() => {
    firebase
      .database()
      .ref('highscores/')
      .on('value', function (snapshot) {
        const highscores = snapshot.val();

        if (highscores) {
          setHighScores(highscores.array);
        } else {
          setHighScores([]);
        }
      });
  }, []);

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

  const openResetHighscore = () => {
    setResetHighscoreActive(true);
  };

  const openLoginOption = () => {
    setLoginOptionActive(true);
  };

  const resetHighScore = () => {
    firebase
      .database()
      .ref('users/' + currentUser.uid + '/highscore')
      .set(0);
  };

  //////REQUIRED STYLES
  const styles = StyleSheet.create({
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
      marginBottom: 8,
    },
    menuLogo: {
      height: win.width,
      width: win.width,
    },
    mainMenuButtonsDiv: {
      backgroundColor: 'black',
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

  const openLeaderboards = () => {
    setGameView('leaderboards');
  };

  const openOptions = () => {
    setGameView('options');
  };

  return (
    <View style={globalStyles.app}>
      <StatusBar hidden />
      {gameView === 'mainMenu' && (
        <MainMenuView
          styles={styles}
          mainMenuViewStyles={mainMenuViewStyles}
          startNewGame={startNewGame}
          openLeaderboards={openLeaderboards}
          openOptions={openOptions}
          globalStyles={globalStyles}
        />
      )}
      {gameView === 'game' && (
        <View style={gameViewStyles.gameView}>
          {gameMenuActive && (
            <View style={globalStyles.popupWindow}>
              <Text style={globalStyles.menuHeaderText}>Menu</Text>
              <TouchableHighlight
                onPress={openMainMenu}
                style={globalStyles.menuButtonLong}
                activeOpacity={1}
                underlayColor="rgb(50,0,0)"
              >
                <Text style={globalStyles.menuButtonLongText}>Quit</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={toggleGameMenu}
                style={globalStyles.menuButtonLong}
                activeOpacity={1}
                underlayColor="rgb(50,0,0)"
              >
                <Text style={globalStyles.menuButtonLongText}>Back</Text>
              </TouchableHighlight>
            </View>
          )}

          {leaderboardInputActive && (
            <View style={globalStyles.popupWindow}>
              <Text style={globalStyles.menuHeaderText}>Pretty Good</Text>

              <Text style={globalStyles.copyText}>
                You made the Leaderboard!
              </Text>
              <TextInput
                placeholder="CODE NAME"
                maxLength={12}
                value={userNickname}
                onChangeText={(text) => setUserNickname(text)}
                style={{
                  backgroundColor: 'white',
                  textAlign: 'center',
                  fontFamily: 'Helvetica',
                  fontSize: 16,
                  transform: [{ scaleY: 0.8 }],
                  padding: 6,
                  margin: 4,
                }}
              ></TextInput>
              <TouchableHighlight
                style={globalStyles.menuButtonLong}
                activeOpacity={1}
                underlayColor="rgb(50,0,0)"
                onPress={() => {
                  const scoreObject = { score, level, nickname: userNickname };

                  const array = [...highScores, scoreObject];
                  array.sort((a, b) => {
                    return a.score - b.score;
                  });
                  array.reverse();
                  if (array.length > 10) {
                    array.pop();
                  }
                  firebase.database().ref('highscores/').set({
                    array,
                  });
                  setLevel(0);
                  setScore(0);
                  setGameActive(false);
                  setGameOver(false);
                  setGameReset(true);
                  setUserNickname('');
                  setLeaderboardInputActive(false);
                }}
              >
                <Text style={globalStyles.menuButtonLongText}>SUBMIT</Text>
              </TouchableHighlight>
            </View>
          )}

          <View style={gameViewStyles.gameHeader}>
            <View>
              <Text
                style={[
                  globalStyles.copyText,
                  { fontSize: 14, lineHeight: 14, textAlign: 'left' },
                ]}
              >
                {highScores[0].nickname.toUpperCase()}: {highScores[0].score}
              </Text>
              <Text
                style={[
                  globalStyles.copyText,
                  { fontSize: 14, lineHeight: 14, textAlign: 'left' },
                ]}
              >
                HIGH SCORE: {currentUser.highscore}
              </Text>
            </View>
            <TouchableHighlight
              style={[
                globalStyles.menuButtonLong,
                { margin: 0, paddingLeft: 16, paddingRight: 16 },
              ]}
              onPress={toggleGameMenu}
              activeOpacity={1}
              underlayColor="rgb(50,0,0)"
            >
              <Text style={globalStyles.menuButtonLongText}>Menu</Text>
            </TouchableHighlight>
          </View>
          <View style={gameViewStyles.barsDiv}>
            <View style={gameViewStyles.barDiv}>
              <View style={gameViewStyles.healthbarBox}>
                <View style={styles.healthbar} />
              </View>

              <Text
                style={[
                  globalStyles.copyText,
                  { position: 'absolute', left: 8, bottom: -8 },
                ]}
              >
                LIFE
              </Text>
            </View>
            <View>
              <View style={styles.timebarBox}>
                <View style={styles.timeBar} />
              </View>
              <Text
                style={[
                  globalStyles.copyText,
                  { position: 'absolute', left: 8, bottom: -8 },
                ]}
              >
                TIME
              </Text>
            </View>
          </View>

          <View style={gameViewStyles.imgDiv}>
            <View style={gameViewStyles.scoreDiv}>
              <Text style={[globalStyles.copyText, { textAlign: 'left' }]}>
                LEVEL {level}
              </Text>
              <Text style={[globalStyles.copyText, { textAlign: 'right' }]}>
                SCORE: {score}
              </Text>
            </View>
            <Image source={viewImg} style={gameViewStyles.viewImg} />
          </View>

          <View style={gameViewStyles.buttonsDiv}>
            {!gameActive && !gameRecover && (
              <TouchableHighlight
                activeOpacity={1}
                underlayColor="rgb(100,0,0)"
                onPress={start}
                style={gameViewStyles.startButton}
              >
                <Text style={gameViewStyles.buttonText}>START</Text>
              </TouchableHighlight>
            )}
            {gameActive && (
              <TouchableHighlight
                activeOpacity={1}
                underlayColor="rgb(200,0,0)"
                onPress={resist}
                style={gameViewStyles.resistButton}
              >
                <Text style={gameViewStyles.buttonText}>RESIST</Text>
              </TouchableHighlight>
            )}
            {gameRecover && (
              <TouchableHighlight style={gameViewStyles.startButton}>
                <View></View>
              </TouchableHighlight>
            )}
            <TouchableHighlight
              activeOpacity={1}
              underlayColor="rgb(0,0,200)"
              onPress={reset}
              style={gameViewStyles.submitButton}
            >
              <Text style={gameViewStyles.submitButtonText}>SUBMIT</Text>
            </TouchableHighlight>
          </View>
        </View>
      )}
      {gameView === 'leaderboards' && (
        <LeaderboardView
          highScores={highScores}
          leaderboardViewStyles={leaderboardViewStyles}
          openMainMenu={openMainMenu}
          globalStyles={globalStyles}
        />
      )}
      {gameView === 'options' && (
        <OptionsView
          setGameView={setGameView}
          openResetHighscore={openResetHighscore}
          resetHighscoreActive={resetHighscoreActive}
          setResetHighscoreActive={setResetHighscoreActive}
          currentUser={currentUser}
          resetHighScore={resetHighScore}
          openLoginOption={openLoginOption}
          loginOptionActive={loginOptionActive}
          setLoginOptionActive={setLoginOptionActive}
          globalStyles={globalStyles}
        />
      )}
    </View>
  );
};

export default App;
