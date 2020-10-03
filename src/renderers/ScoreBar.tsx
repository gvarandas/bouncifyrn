import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

interface ScoreBarProps {
  height: number;
  best: number;
  level: number;
  balls_in_play: number;
  balls: number;
}

const {width: windowWidth} = Dimensions.get('window');

const ScoreBar = ({
  height,
  best,
  level,
  balls_in_play,
  balls,
}: ScoreBarProps) => {
  let ball_count = balls === balls_in_play ? balls : balls - balls_in_play;
  return (
    <View style={[styles.scoreBar, {height: height}]}>
      <View style={styles.bestContainer}>
        <Text style={styles.bestTitle}>Best</Text>
        <Text style={styles.bestScore}>{best}</Text>
      </View>
      <View style={styles.levelContainer}>
        <Text style={styles.bestTitle}>Level</Text>
        <Text style={styles.currentScore}>{level}</Text>
      </View>
      <View style={styles.ballsContainer}>
        <Text style={styles.bestTitle}>Balls</Text>
        <Text style={styles.currentScore}>{ball_count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    width: windowWidth,
    backgroundColor: '#262626',
  },
  bestContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'flex-end',
  },
  bestTitle: {
    fontSize: 14,
    color: 'white',
  },
  bestScore: {
    fontSize: 22,
    color: 'white',
  },
  levelContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'flex-end',
  },
  ballsContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'flex-end',
  },
  currentScore: {
    fontSize: 22,
    color: 'white',
  },
});

export default ScoreBar;
