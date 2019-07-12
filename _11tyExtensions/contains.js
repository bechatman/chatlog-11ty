module.exports = (data, condition, value) => {
  const filteredData = data
    .filter(item => item.data[condition] ? item.data[condition].includes(value) : false)
  return filteredData
}