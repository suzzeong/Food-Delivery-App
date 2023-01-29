import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const DismissKeyboardView: React.FC<{
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}> = ({children, ...props}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAvoidingView
      {...props}
      style={props.style}
      behavior={Platform.OS === 'android' ? 'position' : 'padding'}>
      {children}
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
