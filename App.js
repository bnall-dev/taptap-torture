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
} from 'react-native';
import active from './assets/start.gif';
import idle from './assets/idle.gif';
import recover from './assets/recover.gif';
import gameover from './assets/over.gif';
import * as Font from 'expo-font';
import { Audio } from 'expo-av';
import { AppLoading } from 'expo';

//FONTS
const customFonts = {
  'Metal-Gear-Solid-2': require('./assets/fonts/Metal-Gear-Solid-2.ttf'),
  Gameplay: require('./assets/fonts/Gameplay.ttf'),
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
  const [health, setHealth] = useState(100);
  const [time, setTime] = useState(100);
  const [score, setScore] = useState(0);
  const [highscore, setHighScore] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [gameRecover, setGameRecover] = useState(false);
  const [gameReset, setGameReset] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [viewImg, setViewImg] = useState(idle);
  const [reps, setReps] = useState(0);
  const [level, setLevel] = useState(0);
  const [gameLoaded, setGameLoaded] = useState(false);

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
    if (gameStart) {
      setHealth(health - 5);
    }
  }, 500);

  // LOWER TIME DURING ACTIVE STATE
  useInterval(() => {
    if (gameStart) {
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
    setGameStart(true);

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
    if (score > highscore) {
      setHighScore(score);
    }
    setLevel(0);
    setScore(0);
    setGameStart(false);
    setGameOver(false);
    setGameReset(true);
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
    if (gameStart) {
      setScore(score + (100 - health) * 10);
      setHealth(health + 1);
    }
  };

  // RESET STATE EFFECTS
  useEffect(() => {
    if (gameReset) {
      setViewImg(idle);
    }
  }, [gameStart, gameRecover, gameReset, gameOver]);

  // ACTIVE STATE EFFECTS
  useEffect(() => {
    if (gameStart) {
      setViewImg(active);
    }
  }, [gameStart, gameRecover, gameReset, gameOver]);

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
  }, [gameStart, gameRecover, gameReset, gameOver]);

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
  }, [gameStart, gameRecover, gameReset, gameOver]);

  // IDLE STATE EFFECTS
  useEffect(() => {
    if (!gameStart && !gameOver && !gameRecover && !gameReset) {
      setViewImg(idle);
    }
  }, [gameStart, gameOver, gameReset, gameRecover]);

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
      setGameStart(false);
      setGameRecover(true);
    }
    if ((health < 1) & (time > 0)) {
      setGameStart(false);
      setGameReset(false);
      setHealth(0);
      setScore(0);
      setGameOver(true);
    }
  }, [health, time]);

  const styles = StyleSheet.create({
    app: {
      backgroundColor: 'grey',
      flex: 1,
    },
    scoreText: {
      color: 'white',
      fontSize: 12,
      flex: 1,
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
      backgroundColor: 'rgb(50,50,50)',
      padding: 8,
      alignItems: 'center',
    },
    viewImg: { height: 176, borderWidth: 5, borderColor: 'black' },
    scoreDiv: {
      display: 'flex',
      flexDirection: 'row',
    },
    buttonsDiv: {
      margin: 16,
      borderWidth: 5,
      borderColor: 'black',
    },
    startButton: {
      height: 150,
      backgroundColor: 'darkred',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 5,
      borderColor: 'rgb(255,100,100)',
    },
    resistButton: {
      height: 150,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 5,
      borderColor: 'rgb(255,100,100)',
    },
    submitButton: {
      height: 60,
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 5,
      borderColor: 'rgb(150,150,255)',
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
      color: 'rgba(50,50,50,0.5)',
      lineHeight: 170,
    },
    submitButtonText: {
      fontFamily: 'Metal-Gear-Solid-2',
      fontSize: 36,
      color: 'rgba(50,50,50,0.5)',
      lineHeight: 75,
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

  return (
    <View style={styles.app}>
      <StatusBar hidden />
      <View style={styles.barsDiv}>
        <Text style={styles.highscoreText}>HIGH SCORE: {highscore}</Text>
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
        {!gameStart && !gameRecover && (
          <TouchableHighlight onPress={start}>
            <View style={styles.startButton}>
              <Text style={styles.buttonText}>START</Text>
            </View>
          </TouchableHighlight>
        )}
        {gameStart && (
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
  );
};

export default App;
