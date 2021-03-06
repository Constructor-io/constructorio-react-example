/* eslint-disable max-len */
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loadStatuses } from '../../../utils/constants';

function SearchHeader(props) {
  const { sortOptions, loadStatus } = props;
  const [params] = useSearchParams();
  const query = params.get('q');
  const selectedSort = `${params.get('sort_by')}_${params.get('sort_order')}`;
  const [searchTerm, setSearchTerm] = useState(query || '');
  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();

    navigate(`?q=${searchTerm}`);
  };

  const onChangeSorting = (event) => {
    const selectedItem = sortOptions.find(
      (item) => item.id === event.target.value,
    );

    params.set('sort_by', selectedItem.sort_by);
    params.set('sort_order', selectedItem.sort_order);

    navigate({ search: params.toString() });
  };

  return (
    <form id="search-form" onSubmit={ submitSearch } className="flex justify-between mb-5">
      <a href={ process.env.PUBLIC_URL } rel="nofollow">
        <img width="180" height="40" src="https://constructor.io/wp-content/uploads/2018/11/group-1.svg" alt="" />
      </a>
      { loadStatus !== loadStatuses.LOADING && (
        <input
          className="bg-gray-200 w-80 border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-800"
          id="search-input"
          value={ searchTerm }
          placeholder="Search..."
          onChange={ (e) => setSearchTerm(e.target.value) }
          data-cnstrc-search-input
        />
      ) }
      {sortOptions?.length > 0 && (
        <select onChange={ onChangeSorting } value={ selectedSort }>
          {sortOptions.map((sortOption) => (
            <option key={ sortOption.id } value={ sortOption.id }>
              {sortOption.display_name}
            </option>
          ))}
        </select>
      )}
    </form>
  );
}

export default SearchHeader;
