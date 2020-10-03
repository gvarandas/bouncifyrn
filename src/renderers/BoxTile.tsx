import React, {useState, useEffect} from 'react';
import {Animated, StyleSheet, Text} from 'react-native';

import Explosion from '../components/explosion';
import {Sizing} from '../config';
import {useAnimateRow, useOpacityPulse} from '../hooks';
import Utils from '../utils';

interface BoxTileProps {
  row: number;
  col: number;
  explode: boolean;
  hits: number;
}

const BoxTile = ({row, col, explode, hits}: BoxTileProps) => {
  const [exploding, setExploding] = useState(false);
  const [animateTop, setRow] = useAnimateRow(row);
  const [animateOpacity, startOpacityPulse] = useOpacityPulse(50);

  useEffect(() => {
    setRow(row);
  }, [row, setRow]);

  useEffect(() => {
    setExploding(explode);
  }, [explode]);

  useEffect(() => {
    startOpacityPulse();
  }, [hits, startOpacityPulse]);

  const color = Utils.hitsToColor(hits);
  const x = Utils.colToLeftPosition(col);
  const y = Utils.rowToTopPosition(row);
  if (exploding) {
    return (
      <Explosion backgroundColor={color} count={35} origin={{x: x, y: y}} />
    );
  } else {
    return (
      <Animated.View
        style={[
          styles.boxContainer,
          {
            backgroundColor: color,
            transform: [{translateY: animateTop}],
            // top: animateTop,
            width: Sizing.BOX_TILE_SIZE,
            height: Sizing.BOX_TILE_SIZE,
            left: x,
            opacity: animateOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}>
        <Text style={styles.boxText}>{hits}</Text>
      </Animated.View>
    );
  }
};

const styles = StyleSheet.create({
  boxContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  boxText: {
    color: '#262626',
    fontSize: 16,
  },
});

export default BoxTile;
