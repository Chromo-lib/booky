export default class NewsService {

  // title, description, pubDate, link
  static async fetchData () {
    try {
      const url = 'https://www.reddit.com/r/news.json?limit=10';
      let resp = await fetch(url);
      resp = await resp.json();

      return resp.data.children.slice(0,9);
    } catch (error) {
      return null;
    }
  }
}