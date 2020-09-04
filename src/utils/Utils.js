export default class Utils {

  // return if the current browser is chrome
  static isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  }

  // https://www.example.com -> example.com
  static getDomainFromURL (url) {
    try {
      let urlInfos = new URL(url);
      url = urlInfos.hostname;
      return url.slice(url.indexOf('.') + 1);
    } catch (error) {
      return 'example.com'
    }
  }
}