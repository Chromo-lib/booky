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
    return this.getAll().some(b => b.title === title || b.url ===  url);
  }

  static getAll () {
    let bookmarks = localStorage.getItem('bookmarks');
    return bookmarks ? JSON.parse(localStorage.getItem('bookmarks')) : [];
  }

  static replace(bookmarks) {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
}