function truncateToTwoDecimals(value) {
    return Math.floor(value * 1000) / 100;
  }

export default truncateToTwoDecimals