const canAddItemIntoLine = ({ list, item, lineWidth }) => lineWidth > item.width + list[list.length - 1].reduce((sum, item) => sum + item.width, 0);

export const concatMessage = ({ list, item, lineWidth }) => canAddItemIntoLine({ list, item, lineWidth })
  ? list.map((row, index) => index === list.length - 1 ? [...list[list.length - 1], item] : row)
  : list.concat([[item]]);

const getMessageId = list => !list.length ? 0 : list[list.length - 1][list[list.length - 1].length - 1].id + 1;

export const getMessage = ({ list, timestamp, width }) => ({
  id: getMessageId(list),
  timestamp,
  width,
});

export const getLastMessage = list => list.length && list[list.length -1][list[list.length -1].length - 1];

export const needDelay = list => Math.abs(list[0] - list[list.length - 1]) < 1000
