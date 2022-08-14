const axios = require('axios').default;
const timeFunc = require('../utils/timeFunctions');

const fetchInformation = async (route, letter) => {
  let count = 0;
  const allItems = await getAllItemsByRoute(route);
  allItems.data.forEach((singleResult) => {
    singleResult.name
      .toLowerCase()
      .split('')
      .forEach((nameLetter) => {
        if (nameLetter === letter) {
          ++count;
        }
      });
  });
  return count;
};

const getAllItemsByRoute = async (route) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/${route}`);
  const elements = [];
  let elementNumber = 1;
  while (response.data.info.count >= 1) {
    elements.push(elementNumber);
    ++elementNumber;
    --response.data.info.count;
  }
  return axios.get(
    `https://rickandmortyapi.com/api/${route}/${elements.join(',')}`
  );
};

const formatCharCounterResults = ({ lCount, eCount, cCount }) => {
  return [
    {
      char: 'l',
      count: lCount,
      resource: 'location',
    },
    {
      char: 'e',
      count: eCount,
      resource: 'episode',
    },
    {
      char: 'c',
      count: cCount,
      resource: 'character',
    },
  ];
};

const formatResponse = async ({ name, time, inTime, results }) => {
  return {
    exercise_name: name,
    time,
    in_time: inTime,
    results: results,
  };
};

// Main functions

const getMainResult = async () => {
  const start = Date.now();
  const lCount = await fetchInformation('location', 'l');
  const eCount = await fetchInformation('episode', 'e');
  const cCount = await fetchInformation('character', 'c');
  const results = formatCharCounterResults({ lCount, eCount, cCount });
  const end = Date.now();
  const time = timeFunc.secondsToString(end - start);
  const inTime = Math.floor((end - start) / 1000) < 3;
  return formatResponse({ name: 'Char counter', time, inTime, results });
};

const getCharactersLocationPerEpisode = async () => {
  const start = Date.now();
  const hashTableResidents = {};
  const results = [];
  const allEpisodeItems = await getAllItemsByRoute('episode');
  const allLocationItems = await getAllItemsByRoute('location');
  allLocationItems.data.forEach((item) => {
    item.residents.forEach((resident) => {
      hashTableResidents[resident] = item.name;
    });
  });
  allEpisodeItems.data.forEach((episode) => {
    const episodeLocations = new Set();
    episode.characters.forEach((character) => {
      hashTableResidents[character] &&
        episodeLocations.add(hashTableResidents[character]);
    });
    results.push({
      name: episode.name,
      episode: episode.episode,
      location: [...episodeLocations],
    });
  });
  const end = Date.now();
  const time = timeFunc.secondsToString(end - start);
  const inTime = Math.floor((end - start) / 1000) < 3;
  return formatResponse({ name: 'Episode locations', time, inTime, results });
};

module.exports = {
  getMainResult,
  getCharactersLocationPerEpisode,
};
