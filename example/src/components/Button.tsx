import * as React from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export interface ButtonProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { title, style, onPress } = props;

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={onPress}
      collapsable={false}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
  },
  container: {
    minHeight: 40,
  },
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#555555',
  },
});

export default Button;
