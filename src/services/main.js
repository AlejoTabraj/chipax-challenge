const axios = require('axios').default
const timeFunc = require('../utils/timeFunctions')

const getMainResult = async () => {
    const start = Date.now()
    const lCount = await fetchInformation('location', 'l')
    const eCount = await fetchInformation('episode', 'e')
    const cCount = await fetchInformation('character', 'c')
    const end = Date.now()
    const time = timeFunc.secondsToString(end - start)
    const inTime = Math.floor((end - start) / 1000) < 3
    return formatCharCounter({ lCount, eCount, cCount, time, inTime })
}


const fetchInformation = async (route, letter) => {
    let count = 0
    const allItems = await getAllItemsByRoute(route)
    allItems.data.forEach(singleResult => {
        singleResult.name.toLowerCase().split('').forEach(nameLetter => {
          if (nameLetter === letter) {
            ++count
          }
        })
    })
    return count
}

const getAllItemsByRoute = async (route) => {
    const response = await axios.get(`https://rickandmortyapi.com/api/${route}`)
    const elements = []
    let elementNumber = 1
    while (response.data.info.count >= 1) {
        elements.push(elementNumber)
        ++elementNumber
        --response.data.info.count
    }
    return axios.get(`https://rickandmortyapi.com/api/${route}/${elements.join(',')}`)
}

const formatCharCounter = ({ lCount, eCount, cCount, time, inTime }) => {
    return {
        exercise_name: 'Char counter',
        time,
        in_time: inTime,
        results: [
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
        ],
      };
}

module.exports = {
    getMainResult
}