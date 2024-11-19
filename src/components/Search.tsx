import { type FormEvent, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import styled from 'styled-components';

const Input = styled.input`
  min-width: ${({ theme }) => theme.layout.minWidth};
`;

const Search = ({ onSearch }: { onSearch?: (query: string) => void }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const search = useCallback(
    (value: string) => {
      if (onSearch) {
        onSearch(value);
      }
      setSearchParams(value ? { query: value } : {}, { replace: true });
    },
    [onSearch, setSearchParams],
  );

  const debouncedSearch = useCallback(debounce(search, 500), [search]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    debouncedSearch.cancel();
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = formData.get('query') as string;

    if (value !== query) {
      search(value);
    }
  };

  return (
    <form role="search" onSubmit={handleSubmit} data-testid="search-form">
      <Input
        data-testid="search-input"
        name="query"
        type="text"
        defaultValue={query}
        onChange={(e) => debouncedSearch(e.target.value)}
        placeholder="Search"
      />
    </form>
  );
};

export default Search;
