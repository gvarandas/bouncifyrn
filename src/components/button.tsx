import React, {PropsWithChildren, useRef} from 'react';
import {TouchableOpacity, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Colors} from '../config';

interface ButtonProps {
  onPress: () => void;
  theme?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

const Button = ({
  onPress,
  theme,
  style,
  children,
}: PropsWithChildren<ButtonProps>) => {
  const buttonContainer = useRef<Animatable.View>(null);

  const onPressIn = () => {
    buttonContainer.current?.transitionTo({
      opacity: 0.7,
      transform: [{scale: 0.95}],
    });
  };

  const onPressOut = () => {
    buttonContainer.current?.transitionTo({
      opacity: 1,
      transform: [{scale: 1}],
    });
  };

  return (
    <Animatable.View
      useNativeDriver
      // FIXME: figure out the correct type annotation for this ref
      ref={buttonContainer as any}
      style={[styles.buttonContainer, style]}>
      <TouchableOpacity
        style={styles.textContainer}
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}>
        <Animatable.Text style={[styles.text, theme]}>
          {children}
        </Animatable.Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.RED,
    borderRadius: 15,
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 20,
    shadowOffset: {width: 0, height: 0},
    shadowColor: Colors.LIGHT_BLUE,
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  textContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: 'white',
    textShadowOffset: {width: 0, height: 1},
    textShadowColor: 'black',
    textShadowRadius: 2,
  },
});

export default React.memo(Button);
