import React from 'react';

export default function FormImageBG () {

  const onSetWallpaper = (e) => {
    e.preventDefault();

    const file = e.target.elements[0].files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
      localStorage.setItem('wallpaper', base64String);
      document.body.style.background = `linear-gradient(135deg,rgb(33 37 41 / 73%),rgb(33 37 41 / 88%)),url(data:image/png;base64,${base64String})`;
    };
    reader.readAsDataURL(file);
  }

  return (
    <form onSubmit={onSetWallpaper}>
      <label><svg xmlns="http://www.w3.org/2000/svg" width="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>Background image</label>
      <input type="file" name="wallpaper" className="w-100 mb-10" placeholder="" required />
      <button type="submit" className="w-100"><svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>change</button>
    </form>
  );
}