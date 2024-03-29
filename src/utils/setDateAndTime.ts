import { dateEL, timeEL, timeZoneEL } from "../constants/defaults";
import { ISettings } from "../types";

const defaultOptions: any = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  //second: 'numeric',
  hour12: true
};

function getSystemTimeZone() {
  try {
    const region1 = new Intl.DateTimeFormat('default');
    const options1 = region1.resolvedOptions();
    return options1.timeZone;
  } catch (error) {
    return 'Europe/Paris';
  }
}

function getDateAndTime() {
  const zone = getSystemTimeZone();
  try {
    let options = { timeZone: zone, ...defaultOptions };
    let formatter: any = new Intl.DateTimeFormat('en-US', options); // => "8/18/2020, 12:56:18 AM"
    formatter = formatter.format(new Date()).split(', '); // => ["8/18/2020, 12:56:18 AM"]
    return { date: new Date(formatter[0]).toDateString(), time: formatter[1], zone };
  } catch (error) {
    let defRegion: any = new Intl.DateTimeFormat('en-US', defaultOptions);
    defRegion = defRegion.format(new Date()).split(', '); // => ["8/18/2020, 12:56:18 AM"]
    return { date: new Date(defRegion[0]).toDateString(), time: defRegion[1], zone };
  }
}

export default function setDateAndTime(settings: ISettings) {
  let timeAndDate = getDateAndTime();

  if (!settings.showDate) dateEL.classList.add('d-none');
  if (!settings.showTime) timeEL.classList.add('d-none');
  if (!settings.showTimeZone) timeZoneEL.classList.add('d-none');

  if (settings.showDate) dateEL.textContent = timeAndDate.date;
  if (settings.showTimeZone) timeZoneEL.textContent = timeAndDate.zone;

  if (settings.showTime) {
    timeEL.textContent = timeAndDate.time;
    timeEL.classList.remove('d-none')

    return setInterval(() => {
      timeAndDate = getDateAndTime();
      dateEL.textContent = timeAndDate.date;
      timeEL.textContent = timeAndDate.time;
    }, 20000);
  }

  return ''
}
