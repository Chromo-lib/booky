export default class NewsService {

  static async fetchData () {
    try {
      const url = 'https://www.reddit.com/r/news.json?limit=10';
      let resp = await fetch(url);
      resp = await resp.json();
      resp = resp.data.children.slice(0, 9);

      localStorage.setItem('news', JSON.stringify(resp));

      return resp;
    } catch (error) {
      let localData = localStorage.getItem('news');
      return localData ? JSON.parse(localData) : null;
    }
  }
}