import React from 'react';
import {Dimensions, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {Sizing} from '../config';
import Utils, {Position} from '../utils';

interface AimLineProps {
  start: Position;
  end: Position;
}

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const AimLine = ({start, end}: AimLineProps) => {
  const drawLength = 1.0; // Ratio of aim vector to display
  const numCircles = 20;
  let delta = Utils.getPointsDeltas(start, end);
  let length = Utils.getDistance(start, end);
  if (length === 0) {
    return null;
  }
  let RADIUS = Sizing.RADIUS;
  let radius = Math.min(
    (RADIUS * 2) / 3,
    Math.max(RADIUS / 2, (RADIUS * length) / (windowHeight / 2))
  );

  let circles = Array(numCircles)
    .fill('')
    .map((_, i) => {
      let circleStart = start;
      let spacing = delta.x / numCircles;

      // check screen upper and sound bounds and bounce the aim line off the surface
      let x = circleStart.x + spacing * i * drawLength;
      if (x > windowWidth) {
        x -= (x - windowWidth) * 2;
      }
      if (x < 0) {
        x += -x * 2;
      }
      let y = circleStart.y + (delta.y / numCircles) * i * drawLength;
      if (y < Sizing.SCOREBOARD_HEIGHT) {
        y -= (y - Sizing.SCOREBOARD_HEIGHT) * 2;
      }
      return <Circle key={i} cx={x} cy={y} r={radius} fill="white" />;
    });

  return (
    <View>
      <Svg width={windowWidth} height={windowHeight}>
        {circles}
      </Svg>
    </View>
  );
};

export default AimLine;
