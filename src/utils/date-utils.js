import { DateTime } from "luxon";


export const formatDateToLocalTime = (rawDate, formatString = "DDDD") => {
    console.log(rawDate);
    let formatted = DateTime.fromISO(rawDate).setZone("local").toFormat(formatString)
    console.log(formatted);
    return formatted;
}
