import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { LiveMessage } from 'react-aria-live';

import {
  PageWrapper,
  ContentWrapper,
  PageTitleBlock,
  Pagination,
} from 'layout';
import { withHandleErrors, withLoading } from 'shared/hoc';
import {
  LinkButton,
  LinkWrapper,
  ThreadListWrapper,
  PaginationWrapper,
} from './style';
import ThreadList from '../ThreadList';
import PageBreadcrumb from '../PageBreadcrumb';

const PageContent = ({
  categoryName,
  currentPage,
  totalPages,
  handleChangePage,
  threads,
}) => {
  const { categoryId } = useParams();
  const { fetching, fetched, data } = threads;

  const renderPagination = () => {
    return (
      <PaginationWrapper>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChange={handleChangePage}
        />
      </PaginationWrapper>
    );
  };

  return (
    <>
      <LiveMessage
        message={`Category ${categoryName} Page`}
        aria-live="polite"
      />

      <PageWrapper>
        <PageTitleBlock title={categoryName} />

        <ContentWrapper>
          <PageBreadcrumb categoryName={categoryName} />

          <LinkWrapper>
            <LinkButton to={`/categories/${categoryId}/threads/new/`}>
              Add Thread
            </LinkButton>
          </LinkWrapper>

          <ThreadListWrapper>
            {renderPagination()}
            <ThreadList fetching={fetching} fetched={fetched} threads={data} />
            {renderPagination()}
          </ThreadListWrapper>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
};

PageContent.propTypes = {
  categoryName: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  threads: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    data: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default compose(withHandleErrors, withLoading)(PageContent);
