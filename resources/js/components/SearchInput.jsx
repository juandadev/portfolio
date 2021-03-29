import React from 'react';

import '../../sass/SearchInput.scss';

function SearchInput() {
  //TODO: handle a default value when a post or tag is searched
  const handleSearch = (e) => {
    const { value } = e.target;

    if (e.key === 'Enter') {
      window.location.href = `/blog/search?isTag=${value[0] === '#'}&searchParam=${
        value[0] === '#' ? value.slice(1, value.length).toLowerCase() : value.toLowerCase()
      }`;
    }
  };

  return (
    <div className="searchInput d-flex justify-content-center">
      <input
        type="text"
        name="postSearch"
        id="postSearch"
        placeholder="Busca por título o #etiqueta"
        autoComplete="off"
        onKeyPress={handleSearch}
      />
    </div>
  );
}

export default SearchInput;
