import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { LiveMessage } from 'react-aria-live';

import { changePassword as changePassword_ } from 'redux/actions';
import { PageWrapper, ContentWrapper, PageTitleBlock, SkipLink } from 'layout';
import { CONSTANTS } from 'utils';
import { InnerContentWrapper } from './style';
import PasswordChangeForm from './PasswordChangeForm';
import PageBreadcrumb from './PageBreadcrumb';
import SuccessMessage from './SuccessMessage/SuccessMessage';

const PasswordChangePage = ({ auth, changePassword }) => {
  const authUserId = auth.user.id;
  const [passwordChanged, setPasswordChanged] = useState(false);
  const titleRef = useRef(null);

  const onSubmit = async (values) => {
    await changePassword(values);

    const { errors } = auth;
    if (!_.isEmpty(errors)) return errors;

    setPasswordChanged(true);
    return null;
  };

  return (
    <>
      <Helmet>
        <title>Change Password - {CONSTANTS.appName}</title>
      </Helmet>
      <LiveMessage message="Change Password Page" aria-live="polite" />
      <SkipLink ref={titleRef} />

      <PageWrapper>
        <PageTitleBlock title="Password Change" ref={titleRef} />

        <ContentWrapper>
          <PageBreadcrumb authUserId={authUserId} />
          {passwordChanged && <SuccessMessage authUserId={authUserId} />}
          {!passwordChanged && (
            <InnerContentWrapper>
              <PasswordChangeForm onSubmit={onSubmit} authUserId={authUserId} />
            </InnerContentWrapper>
          )}
        </ContentWrapper>
      </PageWrapper>
    </>
  );
};

PasswordChangePage.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    errors: PropTypes.shape({}).isRequired,
  }).isRequired,
  changePassword: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { changePassword: changePassword_ })(
  PasswordChangePage
);
