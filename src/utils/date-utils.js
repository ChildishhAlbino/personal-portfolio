import { DateTime } from "luxon"

export const formatDateToLocalTime = (rawDate, formatString = "DDDD") => {
  let formatted = DateTime.fromISO(rawDate)
    .setZone("local")
    .toFormat(formatString)
  return formatted
}
