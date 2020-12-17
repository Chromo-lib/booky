import React, { useEffect, useState } from 'react';
import NewsService from '../services/NewsService';

export default function News () {

  const [news, setNews] = useState(null);

  useEffect(() => {
    NewsService.fetchData().then(r => {
      setNews(r);
    })
      .catch(e => { });
  }, []);

  return (<>
    {news && <ul className="row w-100 mb-20 mt-10">
      {news.map((n, i) => <li key={'news' + i} className="col-3 box">
        <img
          src={"https://api.faviconkit.com/" + n.data.domain + "/144"}
          alt="news"
        />
        <div>
          <h5 className="m-0 lsp2 truncate-mult">
            <a href={n.data.url} target="_blank" rel="noopener noreferrer">{n.data.title}</a>
          </h5>
          <small>{n.data.domain || n.data.subreddit}</small>
        </div>
      </li>)}
    </ul>}
  </>);
}