import React from 'react';

export default function FormSearch () {
  const onSearch = (e) => {
    e.preventDefault();
    window.location.href = 'https://www.google.com/search?q=' + e.target.elements[0].value;
  }

  return (
    <form className="mb-10" onSubmit={onSearch}>
      <input className="w-60" type="search" placeholder="Search the web" required />
    </form>
  );
}