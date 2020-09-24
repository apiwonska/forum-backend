import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import theme from '../../theme';
import SVGIcon from '../../icons/SVGIcon';

const navbarHeight = '6rem';

const AuthHeader = styled.header`
  height: ${navbarHeight};
  width: 100%;
  background-color: ${theme.colors.white};
  box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.1);
`;

const UnauthHeader = styled(AuthHeader)`
  background-color: ${theme.colors.accessPageBackgroundColor};
  box-shadow: none;
`;

export const Header = ({ auth, children, ...passThroughProps }) => {
  return auth ? (
    <AuthHeader {...passThroughProps}>{children}</AuthHeader>
  ) : (
    <UnauthHeader {...passThroughProps}>{children}</UnauthHeader>
  );
};

Header.propTypes = {
  auth: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Header.defaultProps = { auth: false };

export const NavContainerDiv = styled.div`
  margin: 0 2rem;
  display: flex;
`;

export const BrandDiv = styled.div`
  height: ${navbarHeight};
`;

export const ProjectName = styled.span`
  display: flex;
  align-items: center;
  font-family: ${theme.fonts.special};
  font-size: 2.4rem;
  font-weight: 700;
`;

export const Nav = styled.nav`
  margin-left: auto;
`;

const AuthNavToggleButton = styled.button`
  color: #4d5863;
  background-color: ${theme.colors.white};
  border: 0;
  margin: 0 -0.5rem 0 0;
  padding: 0.7rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  align-self: center;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    color: ${theme.colors.black};
    background-color: ${theme.colors.secondary};
  }

  ${theme.media.breakpointNavAuth} {
    display: none;
  }
`;

const UnauthNavToggleButton = styled(AuthNavToggleButton)`
  color: ${theme.colors.white};
  text-shadow: 0.1rem 0.1rem 0.3rem ${theme.colors.main};
  background-color: transparent;

  &:hover,
  &:focus {
    color: ${theme.colors.black};
    background-color: ${theme.colors.white};
  }

  ${theme.media.breakpointNavUnauth} {
    display: none;
  }
`;

export const NavToggleButton = ({ auth, ...passThroughProps }) => {
  return auth ? (
    <AuthNavToggleButton {...passThroughProps} />
  ) : (
    <UnauthNavToggleButton {...passThroughProps} />
  );
};

NavToggleButton.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export const NavUl = styled.ul`
  display: none;

  ${({ auth }) => {
    return auth
      ? theme.media.breakpointNavAuth
      : theme.media.breakpointNavUnauth;
  }} {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const NavLi = styled.li`
  height: ${navbarHeight};
`;

const AuthNavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  text-decoration: none;
  font-size: 1.6rem;
  color: #4d5863;
  transition: 0.4s;

  &:hover {
    color: ${theme.colors.black};
    text-shadow: none;
    cursor: pointer;
  }

  &:focus {
    outline-offset: -0.6rem;
  }
`;

const UnauthNavLink = styled(AuthNavLink)`
  color: ${theme.colors.white};
  text-shadow: 0.1rem 0.1rem 0.3rem ${theme.colors.main};
`;

export const NavLink = ({ auth, ...passThroughProps }) => {
  return auth ? (
    <AuthNavLink {...passThroughProps} />
  ) : (
    <UnauthNavLink {...passThroughProps} />
  );
};

NavLink.propTypes = {
  auth: PropTypes.bool,
};

NavLink.defaultProps = { auth: false };

export const BubbleIcon = styled(SVGIcon)`
  width: 2.2rem;
  margin-right: 0.5rem;
  transform: scaleX(-1);
`;

export const UserIcon = styled(SVGIcon)`
  width: 1.6rem;
  margin-right: 0.5rem;
`;
