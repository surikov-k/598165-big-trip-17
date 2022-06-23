import dayjs from 'dayjs';
import duration from 'dayjs/esm/plugin/duration';

dayjs.extend(duration);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFromArray = (array) => array[getRandomInteger(0, array.length - 1)];

function* getUniqueRandomFromArray(array) {
  const results = [];

  while (true) {
    const result = getRandomFromArray(array);

    if (!results.includes(result)) {
      results.push(result);
      yield result;
    }

    results.length = results.length === array.length ? 0 : results.length;
  }
}

function* getId() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const formatDay = (date) => dayjs(date).format('MMM D');

const formatTime = (date) => `${dayjs(date).format('HH')}:${dayjs(date).format('mm')}`;

const formatDuration = (dateFrom, dateTo) => {
  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);

  const diff = date2.diff(date1);
  return dayjs.duration(diff).format('HH[H] mm[M]');
};

const formatDayInput = (date) => dayjs(date).format('DD/MM/YY HH:mm');


export {
  getId,
  getRandomInteger,
  getRandomFromArray,
  getUniqueRandomFromArray,
  formatDay,
  formatTime,
  formatDuration,
  formatDayInput,
};
