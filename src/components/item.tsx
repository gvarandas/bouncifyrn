import React, {PropsWithChildren, useRef, useState} from 'react';
import {TouchableWithoutFeedback, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

interface ItemProps {
  onPress: () => void;
}

const Item = ({onPress, children}: PropsWithChildren<ItemProps>) => {
  const [pressed, setPressed] = useState(false);
  const itemText = useRef<Animatable.Text>(null);
  const textColor = pressed ? 'blue' : 'white';

  const onPressIn = () => {
    setPressed(true);

    itemText.current?.transitionTo({
      transform: [{scale: 0.95}],
    });
  };

  const onPressOut = () => {
    setPressed(false);

    itemText.current?.transitionTo({
      transform: [{scale: 1}],
    });
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <Animatable.Text
        // FIXME: Figure out the correct type annotation for this ref
        ref={itemText as any}
        style={[styles.item, {color: textColor}]}
        textBreakStrategy={'simple'}>
        {children}
      </Animatable.Text>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 20,
    color: '#FFF',
  },
});

export default Item;
