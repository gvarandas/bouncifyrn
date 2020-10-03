import {useState, useEffect, useRef, useCallback} from 'react';
import {Animated, Easing} from 'react-native';
import Utils from './utils';

const useAnimatedValue = (initialValue: number) => {
  const ref = useRef(new Animated.Value(initialValue));
  return ref.current;
};

const useOpacityPulse = (speed = 50) => {
  const opacity = useAnimatedValue(0);

  const pulse = () => {
    Animated.sequence([
      Animated.timing(opacity, {
        useNativeDriver: true,
        toValue: 0.6,
        easing: Easing.linear,
        duration: speed,
      }),
      Animated.timing(opacity, {
        useNativeDriver: true,
        toValue: 0,
        easing: Easing.linear,
        duration: speed,
      }),
    ]).start();
  };

  return [opacity, pulse];
};

const useAnimateRow = (row = 0) => {
  const [rowPosition, setRowPosition] = useState(row);
  const animatedTop = useAnimatedValue(Utils.rowToTopPosition(row - 1));

  useEffect(() => {
    Animated.spring(animatedTop, {
      useNativeDriver: true,
      toValue: Utils.rowToTopPosition(rowPosition),
      bounciness: 18,
      speed: 8,
    }).start();
  }, [animatedTop, rowPosition]);

  return [animatedTop, setRowPosition];
};

function useAnimatedValueListener(
  animationHandler: Animated.ValueListenerCallback,
  element: Animated.Value
) {
  // Create a ref that stores handler
  const savedHandler = useRef<Animated.ValueListenerCallback>();

  // Update ref.current value if handler changes.
  useEffect(() => {
    savedHandler.current = animationHandler;
  }, [animationHandler]);

  useEffect(() => {
    // Make sure element supports addEventListener
    const isSupported = element.addListener;
    if (!isSupported) return;

    const eventListener: Animated.ValueListenerCallback = (event) => {
      savedHandler.current?.(event);
    };
    const listenerId = element.addListener(eventListener);

    return () => {
      element.removeListener(listenerId);
    };
  }, [element]);
}

const useRadiusPulse = (radius1 = 14, radius2 = 12, delay = 100) => {
  const animatedRadius = useAnimatedValue(radius1);
  const radius = useRef(radius1);

  const handler = useCallback<Animated.ValueListenerCallback>(({value}) => {
    radius.current = value;
  }, []);

  useAnimatedValueListener(handler, animatedRadius);

  const pulse = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedRadius, {
          toValue: radius1,
          duration: delay,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedRadius, {
          toValue: radius2,
          duration: delay,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedRadius, delay, radius1, radius2]);

  useEffect(() => {
    pulse();
  }, [pulse]);

  return radius.current;
};

const useAnimateDrop = (duration: number) => {
  const top = useAnimatedValue(0);

  const drop = () => {
    Animated.timing(top, {
      useNativeDriver: true,
      toValue: 1,
      easing: Easing.back(0),
      duration,
    }).start();
  };

  return [top, drop];
};

const useAnimateCollecting = (duration1: number, duration2: number) => {
  const top = useAnimatedValue(0);

  const collect = () => {
    Animated.timing(top, {
      useNativeDriver: true,
      toValue: 1,
      easing: Easing.linear,
      duration: Utils.randomValueRounded(duration1, duration2),
    }).start();
  };

  return [top, collect];
};

export {
  useAnimateRow,
  useOpacityPulse,
  useRadiusPulse,
  useAnimateCollecting,
  useAnimateDrop,
};
