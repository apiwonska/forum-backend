import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { ContainerDiv } from 'components/styledDivs';
import { LinkButtonSmall as Button } from 'components/styledButtons';
import { renderPageError } from 'components/errors';
import { Spinner } from 'layout';
import { fetchUser as fetchUser_ } from 'redux/actions';
import {
  ImageWrapper,
  Avatar,
  DataGroup,
  Label,
  Data,
  DataWrapper,
} from './style';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOwner: false,
    };
  }

  componentDidMount() {
    this.checkIsOwner();
    const { fetchUser, match } = this.props;
    const { userId } = match.params;

    if (this.checkNeedFetchUser) {
      fetchUser(userId);
    }
  }

  checkIsOwner() {
    const { owner, match } = this.props;
    const { userId } = match.params;
    if (owner) {
      this.setState({ isOwner: String(owner.id) === userId });
    }
  }

  checkNeedFetchUser() {
    const { user, match } = this.props;
    const { userId } = match.params;
    return !user.fetched || String(user.data.id) !== userId;
  }

  renderField(label, objKey, defaultText) {
    const { user } = this.props;
    return (
      <DataGroup>
        <Label>{label}</Label>
        <Data> {user.data[objKey] || defaultText} </Data>
      </DataGroup>
    );
  }

  renderUserData() {
    const { user } = this.props;
    const { isOwner } = this.state;
    const defaultDescription = "This user doesn't have a description yet";
    return (
      <DataWrapper>
        <DataGroup>
          <Label> Username: </Label>
          <Data> {user.data.username} </Data>
        </DataGroup>
        {isOwner && (
          <DataGroup>
            <Label> Email: </Label>
            <Data> {user.data.email} </Data>
          </DataGroup>
        )}
        <DataGroup>
          <Label> Description: </Label>
          <Data> {user.data.description || defaultDescription} </Data>
        </DataGroup>
      </DataWrapper>
    );
  }

  render() {
    const { user } = this.props;
    const { isOwner } = this.state;

    if (this.checkNeedFetchUser()) {
      return null;
    }

    if (user.fetching) {
      return <Spinner />;
    }

    if (!_.isEmpty(user.errors)) {
      return renderPageError();
    }

    if (user.fetched) {
      return (
        <ContainerDiv>
          <ImageWrapper>
            <Avatar src={user.data.avatar} alt="User avatar" />
          </ImageWrapper>
          {this.renderUserData()}
          {isOwner && (
            <>
              <Button to="/profile/edit" color="greenOutline">
                Edit Profile
              </Button>
              <Button to="/profile/password-change" color="greenOutline">
                Change Password
              </Button>
              <Button to="/profile/posts" color="greenOutline">
                Your posts
              </Button>
            </>
          )}
        </ContainerDiv>
      );
    }
    return null;
  }
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  owner: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  user: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      description: PropTypes.string,
      email: PropTypes.string,
      avatar: PropTypes.string,
    }).isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
  fetchUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  owner: state.auth.user,
  user: state.user,
});

export default connect(mapStateToProps, { fetchUser: fetchUser_ })(Profile);