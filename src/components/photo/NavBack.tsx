import { type SyntheticEvent } from 'react';
import { useNavigate } from 'react-router';
import { createSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Main, Section } from '../Layout.tsx';

interface NavBackProps {
  photoId: number;
  query?: string;
}

const Nav = styled(Main)`
  min-height: unset;
  font-size: ${({ theme }) => theme.typography.fontSize.body1};

  a {
    width: fit-content;

    a:hover {
      opacity: 0.7;
    }
  }
`;

Nav.defaultProps = {
  as: 'nav',
};

const NavBack = ({ query, photoId }: NavBackProps) => {
  const navigate = useNavigate();

  const goBack = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    navigate(
      {
        pathname: '/',
        search: query ? createSearchParams({ query }).toString() : '',
      },
      {
        state: { itemToScroll: photoId },
      },
    );
  };

  return (
    <Nav>
      <Section as="div">
        <a href="#" onClick={goBack} role="button" aria-label="Navigate to homepage">
          ←&nbsp;&nbsp;&nbsp;Back to Gallery
        </a>
      </Section>
    </Nav>
  );
};

export default NavBack;
