import React from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import {Svg, Text as SVGText, Circle} from 'react-native-svg';

interface FloorProps {
  height: number;
  total_hits: number;
  current_hits: number;
}

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const FloorRenderer = ({height, total_hits, current_hits}: FloorProps) => {
  const percent_hit = Math.trunc((current_hits * 100) / total_hits);
  const percent_hit_animated = new Animated.Value(percent_hit);
  const size = 125;
  const margin = 15;
  const strokeWidth = 20;
  const radius = (size - strokeWidth - margin) / 2;
  const circumference = radius * 2 * Math.PI;
  const angle = percent_hit_animated.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 2 * Math.PI],
  });
  return (
    <View style={[styles.container, {top: height}]}>
      {current_hits > 0 && (
        <View
          style={[
            styles.counterContainer,
            {height: windowHeight - height - margin},
          ]}>
          <Svg width={size} height={size}>
            <Circle
              stroke="#265BF6"
              strokeWidth={strokeWidth}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
            />
            <AnimatedCircle
              stroke="#404040"
              strokeWidth={strokeWidth}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              strokeDashoffset={Animated.multiply(angle, radius)}
              strokeDasharray={`${circumference} ${circumference}`}
            />
            <SVGText
              x={size / 2}
              y={size / 2}
              dx="-.5em"
              dy="+.3em"
              fontSize="18"
              textAnchor="middle"
              stroke="white"
              fill="white">
              {/* Ugly hack: percent sign overlaps with single digit text and not with multi */}
              {percent_hit}
              {percent_hit < 10 && ' %'}
              {percent_hit >= 10 && '%'}
            </SVGText>
          </Svg>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#262626',
  },
  counterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloorRenderer;
