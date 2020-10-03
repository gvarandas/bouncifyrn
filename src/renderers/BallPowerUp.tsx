import React, {useEffect} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Circle, Svg, Text as SVGText} from 'react-native-svg';

import {Sizing, FLOOR_BOX_POSITION} from '../config';
import {
  useAnimateRow,
  useAnimateDrop,
  useAnimateCollecting,
  useRadiusPulse,
} from '../hooks';
import Utils from '../utils';

interface BallPowerUpProps {
  row: number;
  col: number;
  falling: boolean;
  collecting: boolean;
}

const BallPowerUp = ({col, row, falling, collecting}: BallPowerUpProps) => {
  const [rowAnimationTop, setRow] = useAnimateRow(row);
  const [dropAnimationTop, setDrop] = useAnimateDrop(700);
  const [collectingAnimationTop, setCollecting] = useAnimateCollecting(
    600,
    900
  );
  const radius = useRadiusPulse(12, 16, 300);

  useEffect(() => {
    setRow(row);
  }, [row, setRow]);

  useEffect(() => {
    if (falling) {
      setDrop();
    }
  }, [falling, setDrop]);

  useEffect(() => {
    if (collecting) {
      setCollecting();
    }
  }, [collecting, setCollecting]);

  let color = !falling ? 'white' : '#8CB453';
  let leftPosition = Utils.colToLeftPosition(col);
  let opacity: Animated.AnimatedInterpolation | number = 1;
  let BOX_MIDDLE = Sizing.BOX_TILE_SIZE / 2;

  // Top position will change based on state of the power-up
  let topPosition: Animated.AnimatedInterpolation | number = rowAnimationTop;
  if (collecting) {
    topPosition = collectingAnimationTop.interpolate({
      inputRange: [0, 1],
      outputRange: [FLOOR_BOX_POSITION, FLOOR_BOX_POSITION - 500],
    });
    opacity = collectingAnimationTop.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
  } else if (falling) {
    topPosition = dropAnimationTop.interpolate({
      inputRange: [0, 1],
      outputRange: [Utils.rowToTopPosition(row), FLOOR_BOX_POSITION],
    });
  }
  return (
    <Animated.View
      style={[
        styles.boxContainer,
        {
          transform: [{translateY: topPosition}],
          left: leftPosition,
          opacity: opacity,
        },
      ]}>
      <Svg height={Sizing.BOX_TILE_SIZE} width={Sizing.BOX_TILE_SIZE}>
        {!falling && (
          <Circle
            cx={BOX_MIDDLE}
            cy={BOX_MIDDLE}
            r={radius}
            stroke={color}
            strokeWidth="3"
            fill="#202020"
          />
        )}
        {collecting ? (
          <SVGText
            dx={BOX_MIDDLE}
            dy={BOX_MIDDLE}
            stroke={color}
            fill={color}
            // TODO: this is hack solution to fix a type error (not sure whether we should pass 1 here)
            opacity={1}>
            +1
          </SVGText>
        ) : (
          <Circle
            cx={BOX_MIDDLE}
            cy={BOX_MIDDLE}
            r="7"
            stroke={color}
            fill={color}
          />
        )}
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default BallPowerUp;
