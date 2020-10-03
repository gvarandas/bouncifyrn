import * as React from 'react';
import {StyleSheet, Animated, ViewStyle} from 'react-native';

export type BoxPieceProps = Animated.WithAnimatedObject<ViewStyle>;

// Box piece when exploding
const BoxPiece = (props: BoxPieceProps) => {
  return <Animated.View style={[styles.piece, props]} />;
};

const styles = StyleSheet.create({
  piece: {
    position: 'absolute',
  },
});

export default React.memo(BoxPiece);
