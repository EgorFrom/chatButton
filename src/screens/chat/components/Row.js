import React from 'react';
import { StyleSheet, View } from 'react-native';
import Message from './Message';

const Row = React.memo(({ messages }) => (
  <View style={styles.row}>
    {messages.map(({ id, timestamp, width }) => <Message key={id} id={id} timestamp={timestamp} width={width} />)}
  </View>
));
 
const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row'
  },
});
 
export default Row;
 