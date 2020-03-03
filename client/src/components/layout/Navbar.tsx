import React from 'react';
import styled from 'styled-components';

const Nav = styled.div`
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
`;

const NavHeader = styled.div`
  max-width: 1010px;
  padding: 16px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const NavLeft = styled.div`
  /* 1/3 */
  width: 33.333%;
  text-align: center;
`;

const NavCenter = styled.div`
  width: 33.333%;
  text-align: center;
`;

const NavRight = styled.div`
  width: 33.333%;
  text-align: right;
`;

export const Navbar: React.FC = () => {
  return (
    <Nav>
      <NavHeader>
        <NavLeft>Gello</NavLeft>
        <NavCenter></NavCenter>
        <NavRight>
          <a className="link link-hover" href="/signup">
            Sign up
          </a>
        </NavRight>
      </NavHeader>
    </Nav>
  );
};
