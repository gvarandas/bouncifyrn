import React from 'react';
import {ColorValue, StyleSheet, View} from 'react-native';
import {Sizing} from '../config';
import {Position} from '../utils';

interface BallProps {
  position: Position;
  color: ColorValue;
}

const BallRenderer = ({position, color}: BallProps) => {
  const x = position.x - Sizing.RADIUS / 2;
  const y = position.y - Sizing.RADIUS / 2;
  return (
    <View style={[styles.ball, {left: x, top: y, backgroundColor: color}]} />
  );
};

const styles = StyleSheet.create({
  ball: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: Sizing.RADIUS * 2,
    width: Sizing.RADIUS * 2,
    height: Sizing.RADIUS * 2,
    position: 'absolute',
  },
});

export default BallRenderer;
