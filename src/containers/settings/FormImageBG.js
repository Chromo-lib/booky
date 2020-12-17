import React from 'react';
import ImgIcon from '../../components/ImgIcon';

const imgTypes = ['image/jpeg', 'image/png', 'image/gif'];

export default function FormImageBG () {

  const onSetWallpaper = (e) => {
    e.preventDefault();

    if (e.target.name === 'from-url') {
      const url = e.target.elements[0].value;
      localStorage.setItem('wallpaper', url);
      document.body.style.background = `linear-gradient(135deg,rgb(33 37 41 / 65%),rgb(33 37 41 / 72%)),url(${url})`;
    }
    else {
      const file = e.target.elements[0].files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (imgTypes.includes(file.type)) {
          const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
          localStorage.setItem('wallpaper', base64String);
          document.body.style.background = `linear-gradient(135deg,rgb(33 37 41 / 65%),rgb(33 37 41 / 72%)),url(data:image/png;base64,${base64String})`;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  return (<div className="w-100">
    <hr />

    <form onSubmit={onSetWallpaper} name="from-desktop">
      <div className="mb-10">
        <label><ImgIcon />Image From Desktop</label>
        <input type="file" name="wallpaper" className="w-100" placeholder="" required />
      </div>

      <button type="submit" className="w-100"><svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>change BACKGROUND
      </button>
    </form>

    <hr />

    <form onSubmit={onSetWallpaper} name="from-url">
      <div className="mb-10">
        <label><ImgIcon />Image From Url</label>
        <input type="url" name="url" placeholder="https://picsum.photos/1200/800" required />
      </div>

      <button type="submit" className="w-100"><svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>change BACKGROUND
      </button>
    </form>
  </div>);
}