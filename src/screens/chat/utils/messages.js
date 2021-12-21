export const canAddItemIntoLine = ({ list, item, lineWidth }) => lineWidth > item.width + list[list.length - 1].reduce((sum, item) => sum + item.width, 0);

const getMessageId = list => !list.length ? 0 : list[list.length - 1][list[list.length - 1].length - 1].id + 1;

export const getMessage = ({ list, timestamp, width }) => ({
  id: getMessageId(list),
  timestamp: new Date(timestamp).toLocaleTimeString(),
  width,
});