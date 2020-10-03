import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, ColorValue, Easing} from 'react-native';
import BoxPiece, {BoxPieceProps} from './boxpiece';
import {Sizing} from '../config';
import utils, {Position} from '../utils';

interface ExplosionProps {
  count: number;
  origin: Position;
  backgroundColor: ColorValue;
  fallSpeed?: number;
}

const Explosion = ({
  count,
  origin,
  backgroundColor,
  fallSpeed = 300,
}: ExplosionProps) => {
  const [items, setItems] = useState<BoxPieceProps[]>([]);
  const animation = useRef(new Animated.Value(0));
  const exploAnimation = useRef<Animated.CompositeAnimation>();

  const calculateItems = useCallback(() => {
    const calculatedItems: BoxPieceProps[] = [];
    // Pixelize the box tile into small blocks that will be part of
    // explosion
    Array.from(Array(count).keys()).forEach(() => {
      const item: BoxPieceProps = {
        backgroundColor: backgroundColor,
        left: utils.randomValue(
          origin.x - 15,
          origin.x + Sizing.BOX_TILE_SIZE + 15
        ),
        top: utils.randomValue(
          origin.y - 15,
          origin.y + Sizing.BOX_TILE_SIZE + 15
        ),
        width: utils.randomValue(2, 10),
        height: utils.randomValue(2, 10),
      };
      items.push(item);
    });

    setItems(calculatedItems);
  }, [backgroundColor, count, items, origin.x, origin.y]);

  const animate = useCallback(() => {
    exploAnimation.current = Animated.timing(animation.current, {
      useNativeDriver: true,
      toValue: 1,
      duration: fallSpeed,
      easing: Easing.linear,
    });
    exploAnimation.current.start(() => {
      // Clear items after explosion so that associated views are gc'd
      setItems([]);
    });
  }, [fallSpeed]);

  useEffect(() => {
    const explosionRef = exploAnimation.current;
    calculateItems();
    setTimeout(() => {
      animate();
    }, 50);
    return () => {
      explosionRef?.stop();
    };
  }, [animate, calculateItems]);

  return (
    <>
      {items?.map((item, index) => {
        const bottom = animation.current.interpolate({
          inputRange: [0, 1],
          outputRange: [Number(item.top ?? 0), Number(item?.top ?? 0 + 100)],
        });
        const opacity = animation.current.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0],
        });
        return (
          <BoxPiece
            backgroundColor={item.backgroundColor}
            left={item.left}
            height={item.height}
            width={item.width}
            top={bottom}
            opacity={opacity}
            key={index}
          />
        );
      })}
    </>
  );
};

export default Explosion;
