export default class NewsService {

  // title, description, pubDate, link
  static async fetchData () {
    try {
      const url = 'https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en';
      let resp = await fetch(url);
      resp = await resp.json();

      localStorage.setItem('g-news', JSON.stringify({ items: resp.items, date: Date.now() + (1000 * 60 * 60 * 24) }));

      return resp.items;
    } catch (error) {
      return null;
    }
  }

  static async getData () {
    let localNews = localStorage.getItem('g-news');
    if (localNews) {
      localNews = JSON.parse(localNews);
      if (+localNews.date <= +Date.now()) {
        return await this.fetchData();
      }
      else {
        return localNews.items;
      }
    }
    else {
      return await this.fetchData();
    }
  }
}