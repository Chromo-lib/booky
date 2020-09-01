const defaultBks = [
  { id: 0, title: "Youtube", url: "https://www.youtube.com" },
  { id: 1, title: "facebook", url: "https://www.facebook.com" },
  { id: 2, title: "twitter", url: "https://www.twitter.com" },
  { id: 3, title: "reddit", url: "https://www.reddit.com" },
  { id: 4, title: "dev", url: "https://www.dev.to" },
  { id: 5, title: "stackoverflow", url: "https://stackoverflow.com" },
  { id: 6, title: "yahoo", url: "https://yahoo.com" },
  { id: 7, title: "msn", url: "https://www.msn.com" },
  { id: 8, title: "vk", url: "https://vk.com" },
  { id: 9, title: "soundcloud", url: "https://soundcloud.com" },
  { id: 10, title: "github", url: "http://github.com" },
];

export default class LocalBookmarks {

  static save (title, url) {
    if (!this.isExist(title, url)) {
      let bookmarks = this.getAll();
      bookmarks.push({ id: Date.now(), title, url });
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      return true;
    }
    return false;
  }

  static remove (id) {
    let bookmarks = this.getAll().filter(b => b.id !== id);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  static update (id, title, url) {
    let bookmarks = this.getAll().map(b => {
      if (parseInt(b.id, 10) === parseInt(id, 10)) {
        b.title = title;
        b.url = url;
      }
      return b;
    });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  static isExist (title, url) {
    return this.getAll().some(b => b.title === title || b.url === url);
  }

  static getAll () {
    let bookmarks = localStorage.getItem('bookmarks');
    return bookmarks ? JSON.parse(bookmarks) : defaultBks;
  }

  static replaceAll (newBookmarks) {
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  }
}