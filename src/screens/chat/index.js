import React, { useState } from 'react';
import { StyleSheet, FlatList, Button, Dimensions, View } from 'react-native';
import Row from './components/Row';
import { getRandom } from './utils';
import { canAddItemIntoLine, getMessage } from './utils/messages';

const { width: screenWidth } = Dimensions.get('window');
const minMessageWidth = 60;

const Chat = () => {
  const [list, setList] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const addMessage = timestamp => setList((list) => {
    checkPushAvailable(list);
    const item = getMessage({ list, timestamp, width: getRandom(minMessageWidth, screenWidth) });

    if (!list.length) {
      return [[item]];
    }

    return canAddItemIntoLine({ list, item, lineWidth: screenWidth })
      ? list.map((row, index) => index === list.length - 1 ? [...list[list.length - 1], item] : row)
      : list.concat([[item]]);
  });

  const checkPushAvailable = (list) => {
    const flatList = list.flatMap(item => item);
    const delay = flatList.reduce((diff, message, index) => flatList.length - index < 3 ? message.timestamp - diff : diff, 0);
    if (delay < 1000) {
      setDisabled(true);
      setTimeout(() => setDisabled(false), 5000)
    }
  }

  const handleOnPress = ({ nativeEvent: { timestamp } }) => addMessage(timestamp);

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
          onPress={handleOnPress}
          disabled={disabled}
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
 