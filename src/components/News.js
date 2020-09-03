import React, { useEffect, useState } from 'react';
import NewsService from '../services/NewsService';

export default function News () {

  const [news, setNews] = useState(null);

  useEffect(() => {
    NewsService.fetchData().then(r => {
      setNews(r);
    });
  }, []);

  return (
    <ul className="row mt-30">
      {news && news.map((n, i) => <li key={'news' + i} className="col-3 box">
        <img
          src={"https://api.faviconkit.com/" + n.data.domain + "/144"}
          alt={n.data.title}
        />

        <div>
          <h5 className="m-0 lsp2 truncate-mult">
            <a href={n.data.url} target="_blank" rel="noopener noreferrer">{n.data.title}</a>
          </h5>
          <small>{n.data.domain || n.data.subreddit}</small>
        </div>
      </li>)}
    </ul>
  );
}