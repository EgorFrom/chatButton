import React, { useState } from 'react';
import { StyleSheet, FlatList, Button, Dimensions, View } from 'react-native';
import Row from './components/Row';
import { getRandom } from './utils';
import { canAddItemIntoLine, getMessage } from './utils/messages';

const { width: screenWidth } = Dimensions.get('window');
const minMessageWidth = 60;

const Chat = () => {
  const [list, setList] = useState([]);

  const addElement = ({ nativeEvent: { timestamp } }) => setList((list) => {
    const item = getMessage({ list, timestamp, width: getRandom(minMessageWidth, screenWidth) });

    if (!list.length) {
      return [[item]];
    }

    return canAddItemIntoLine({ list, item, lineWidth: screenWidth })
      ? list.map((row, index) => index === list.length - 1 ? [...list[list.length - 1], item] : row)
      : list.concat([[item]]);
  });

  renderItem = ({ item: messages }) => <Row messages={messages} />;

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => `rowWithItem-${item[0].id}`}
        renderItem={renderItem}
        data={list}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={'add messsage'}
          onPress={addElement}
        />
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'relative',
    bottom: 0,
    padding: 16,
  }
});
 
export default Chat;
 