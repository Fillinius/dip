function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateData() {
  return {
    price: getRandomInt(1000, 5000),
    image: `https://avatars.dicebear.com/6.x/shapes/${(Math.random() + 1)
      .toString(36)
      .substring(7)}.svg`,
  }
}

function generateUserData() {
  return {
    discount: getRandomInt(1000, 5000),
    image: `https://avatars.dicebear.com/6.x/avataaars/${(Math.random() + 1)
      .toString(36)
      .substring(7)}.svg`,
  }
}

module.exports = {
  generateData,
  generateUserData,
}
