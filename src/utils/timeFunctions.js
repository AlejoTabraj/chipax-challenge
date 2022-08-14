const secondsToString = (ms) => {
    return `${Math.floor(ms / 1000)}s ${ms % 1000}ms`
}

module.exports = {
    secondsToString
}
