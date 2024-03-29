const defaultOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  //second: 'numeric',
  hour12: true
};

export default class TimeService {
  static native (zone) {
    try {
      let options = { timeZone: zone, ...defaultOptions };
      let formatter = new Intl.DateTimeFormat('en-US', options); // => "8/18/2020, 12:56:18 AM"
      formatter = formatter.format(new Date()).split(', '); // => ["8/18/2020, 12:56:18 AM"]
      return { date: formatter[0], time: formatter[1] };
    } catch (error) {
      let defRegion = new Intl.DateTimeFormat('en-US', defaultOptions);
      defRegion = defRegion.format(new Date()).split(', '); // => ["8/18/2020, 12:56:18 AM"]
      return { date: defRegion[0], time: defRegion[1] };
    }
  }

  static getSystemTimeZone () {
    try {
      const region1 = new Intl.DateTimeFormat('default');
      const options1 = region1.resolvedOptions();
      return options1.timeZone;
    } catch (error) {
      return 'Africa/Tunis';
    }
  }

  static isValidTimeZone (tz) {
    if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
      throw 'Time zone is not valid';
    }

    try {
      Intl.DateTimeFormat(undefined, { timeZone: tz });
      return true;
    }
    catch (ex) {
      return false;
    }
  }
}