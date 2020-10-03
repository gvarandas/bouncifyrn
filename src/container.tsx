import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MainMenu from './components/menu';
import AsyncStorage from '@react-native-community/async-storage';

import BouncifyGame from './game';
import {GameMode} from './config';
import utils from './utils';

const TOP_SCORE_KEY = 'topScore';
const TOP_SCORE_BRICKS_KEY = 'topScoreBricks';

const Container = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [lastScore, setLastScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [topScoreBricks, setTopScoreBricks] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [mode, setMode] = useState(GameMode.MODE_LINES);

  useEffect(() => {
    utils.initializeGameSizing();
  }, []);

  useEffect(() => {
    const getTopScores = async () => {
      const [storedTopScore, storedTopBrickScore] = await Promise.all([
        AsyncStorage.getItem(TOP_SCORE_KEY),
        AsyncStorage.getItem(TOP_SCORE_BRICKS_KEY),
      ]);
      storedTopScore && setTopScore(parseInt(storedTopScore, 10));
      storedTopBrickScore && setTopScore(parseInt(storedTopBrickScore, 10));
    };
    getTopScores();
  }, []);

  const toggleGame = (
    hasGameStarted: boolean,
    lastGameScore: number,
    gameMode: GameMode
  ) => {
    setGameStarted(hasGameStarted);
    setMode(gameMode);
    if (!hasGameStarted) {
      setGamesPlayed((prevGamesPlayed) => prevGamesPlayed + 1);
      setLastScore(lastGameScore);
      if (mode === GameMode.MODE_LINES && lastGameScore > topScore) {
        setTopScore(lastGameScore);
        AsyncStorage.setItem(TOP_SCORE_KEY, lastGameScore.toString());
      } else if (
        mode === GameMode.MODE_BRICKS &&
        lastGameScore > topScoreBricks
      ) {
        setTopScoreBricks(lastGameScore);
        AsyncStorage.setItem(TOP_SCORE_BRICKS_KEY, lastGameScore.toString());
      }
    }
  };

  return (
    <View style={styles.container}>
      <MainMenu
        onPlayGame={(new_mode) => toggleGame(true, lastScore, new_mode)}
        gamesPlayed={gamesPlayed}
        lastScore={lastScore}
        topScore={topScore}
        topScoreBricks={topScoreBricks}
      />
      <BouncifyGame
        visible={gameStarted}
        topScore={mode === GameMode.MODE_LINES ? topScore : topScoreBricks}
        mode={mode}
        onClose={(lastGameScore) => toggleGame(false, lastGameScore, mode)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Container;
