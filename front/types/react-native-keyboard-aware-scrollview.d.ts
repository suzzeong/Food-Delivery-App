declare module 'react-native-keyboard-aware-scrollview' {
  import * as React from 'react';
  import {ViewProps} from 'react-native';
  import {Constructor} from 'react-native/types/private/Utilities';
  class KeyboardAwareScrollViewComponent extends React.Component<ViewProps> {}
  const KeyboardAwareScrollViewBase: KeyboardAwareScrollViewComponent &
    Constructor<any>;
  class KeyboardAwareScrollView extends KeyboardAwareScrollViewComponent {}
  export {KeyboardAwareScrollView};
}

// react-native-keyboard-aware-scroll-view 를 쓰면 ts 다 적용 됨
