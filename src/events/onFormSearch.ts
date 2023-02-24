import store from "../store";

export default function onFormSearch(e: any) {
  e.preventDefault();

  const query = e.target.elements[0].value
  const searchEngine = store.getState().settings.searchEngine;

  switch (searchEngine) {
    case 'Bing':
      window.location.href = 'https://bing.com/search?q=' + query;
      break;

    case 'Google':
      window.location.href = 'https://www.google.com/search?q=' + query;
      break;

    case 'Yandex':
      window.location.href = 'https://yandex.com/search/?text=' + query;
      break;


    case 'You':
      window.location.href = 'https://you.com/search?q=' + query;
      break;

    case 'Yahoo':
      window.location.href = 'https://search.yahoo.com/search?p=' + query;
      break;

    case 'Baidu':
      window.location.href = 'https://www.baidu.com/s?f=3&rsv_bp=1&rsv_idx=1&wd=' + query;
      break;

    case 'Aol':
      window.location.href = 'https://search.aol.com/aol/search?q=' + query;
      break;

    case 'Naver':
      window.location.href = 'https://search.naver.com/search.naver?where=nexearch&query=' + query;
      break;

    default:
      window.location.href = 'https://duckduckgo.com/?q=' + query + '&t=hv&ia=web';
      break;
  }
}