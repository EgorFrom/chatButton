import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, FlatList, Button, Dimensions, View } from 'react-native';
import Row from './components/Row';
import { getRandom } from './utils';
import { concatMessage, getLastMessage, getMessage, needDelay } from './utils/messages';

const { width: screenWidth } = Dimensions.get('window');
const minMessageWidth = 60;

const Chat = () => {
  const scrollRef = useRef(null);
  const [list, setList] = useState([]);
  const [events, setEvents] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const lastMessage = getLastMessage(list);
    if (lastMessage) {
      setEvents(events => events
        .splice(events.length === 3 ? 1 : 0, 2)
        .concat(lastMessage.timestamp)
      );
    }
  }, [list.length]);

  useEffect(() => {
    if (events.length > 2 && needDelay(events)) {
      setDisabled(true);
      setTimeout(() => setDisabled(false), 3000)
    }
  }, [events]);

  const handleOnPress = ({ nativeEvent: { timestamp } }) => setList((list) => {
    const item = getMessage({ list, timestamp, width: getRandom(minMessageWidth, screenWidth) });

    if (!list.length) {
      return [[item]];
    }

    return concatMessage({ list, item, lineWidth: screenWidth });
  });

  const scrollToEnd = () => scrollRef.current.scrollToEnd();

  const renderItem = ({ item: messages }) => <Row messages={messages} />;

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollRef}
        keyExtractor={item => `rowWithItem-${item[0].id}`}
        renderItem={renderItem}
        data={list}
        onContentSizeChange={scrollToEnd}
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
 