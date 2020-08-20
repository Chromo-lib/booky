import React, { useEffect, useState } from 'react';
import NewsService from '../services/NewsService';

export default function News () {

  const [news, setNews] = useState(null);

  useEffect(() => {
    NewsService.getData().then(r => {
      setNews(r);
    });
  }, []);

  return (
    <ul className="inline-list">
      {news && news.map(n => <li key={n.guid} className="d-flex-col align-start">
        <h5 className="mt-0"><a href={n.link}>{n.title}</a></h5>
        <small>{n.pubDate}</small>
      </li>)}
    </ul>
  );
}