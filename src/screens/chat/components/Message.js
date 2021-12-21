import React from 'react';
import { View, Text } from 'react-native';
import { getNiceColor } from '../utils/ui';

const Message = React.memo(({ id, timestamp, width }) => (
  <View key={`message-${id}`} style={{ backgroundColor: getNiceColor(), width }}>
    <Text>{new Date(timestamp).toLocaleTimeString()}</Text>
  </View>
))

export default Message;
