import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Utils from '../utils';

interface SpeedUpButtonProps {
  speed: number;
  row: number;
  column: number;
  available: boolean;
}

const SpeedUpButton = ({speed, row, column, available}: SpeedUpButtonProps) => {
  return (
    available && (
      <View
        style={[
          styles.boxContainer,
          {
            top: Utils.rowToTopPosition(row),
            left: Utils.colToLeftPosition(column),
          },
        ]}>
        <Animatable.Text
          style={styles.text}
          animation="pulse"
          iterationCount="infinite"
          direction="alternate">
          {speed}x
        </Animatable.Text>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default SpeedUpButton;
