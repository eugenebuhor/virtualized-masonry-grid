import { useCallback } from 'react';
import { useMatch, useNavigate } from 'react-router';
import { createSearchParams } from 'react-router-dom';
import Search from '../components/Search.tsx';
import { HeaderContainer, StyledSection } from './Header.styled';

const Header = () => {
  const isRootPage = useMatch('/');
  const navigate = useNavigate();

  const onSearch = useCallback(
    (query: string) => {
      if (!isRootPage) {
        navigate(
          {
            pathname: '/',
            search: createSearchParams({ query }).toString(),
          },
          { replace: true },
        );
      }
    },
    [isRootPage, navigate],
  );

  return (
    <HeaderContainer>
      <StyledSection as="nav">
        <Search onSearch={onSearch} />
      </StyledSection>
    </HeaderContainer>
  );
};

export default Header;
