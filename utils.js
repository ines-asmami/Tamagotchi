function generateSpace() {
    return new Array(between(0, 30)).fill(' ').join('')
}

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
}

module.exports = {
    between: between,
    generateSpace: generateSpace
}