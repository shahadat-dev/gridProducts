export function showAddedTime(dt) {
  const dtSeconds = dt.getTime() / 1000
  const now = new Date()
  const nowSeconds = now.getTime() / 1000
  const diff = (nowSeconds - dtSeconds) / (3600 * 24)

  if (diff > 7) {
    return formatDate(dt)
  } else if (diff > 6) {
    return '7 days ago'
  } else if (diff > 5) {
    return '6 days ago'
  } else if (diff > 4) {
    return '5 days ago'
  } else if (diff > 3) {
    return '4 days ago'
  } else if (diff > 2) {
    return '3 days ago'
  } else if (diff > 1) {
    return '2 days ago'
  } else if (diff > 0) {
    return '1 day ago'
  } else {
    return 'today'
  }
}

export function formatDate(date) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  let hour = date.getHours()
  hour = hour < 10 ? '0' + hour : hour

  let minute = date.getMinutes()
  minute = minute < 10 ? '0' + minute : minute

  return `${hour}:${minute} on ${day} ${monthNames[monthIndex]} ${year}`
}
