import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';

// import { renderPageError, DefaultError } from 'components/errors';
import { Spinner } from 'layout';
import { ContainerDiv } from 'components/styledDivs';
import { AvatarThumbnail } from 'components/styledImages';
import {
  fetchThread as fetchThread_,
  fetchPostsByThread as fetchPostsByThread_,
  createPost as createPost_,
  deletePost as deletePost_,
} from 'redux/actions';
import formatTime from 'utils/timeFormat';
import {
  LinkWrapper,
  NavLink,
  FirstPostWrapper,
  PostWrapper,
  PostHeader,
  PostHeaderInnerWrapper,
  DateSpan,
  UserLink,
  ThreadTitle,
  Content,
  StyledTextArea,
  SubmitButton,
} from './style';

class Thread extends React.Component {
  componentDidMount() {
    const { thread, fetchThread, fetchPostsByThread, match } = this.props;
    const { threadId } = match.params;

    if (!thread.fetched || String(thread.data.id) !== threadId) {
      fetchThread(threadId);
    }
    fetchPostsByThread(threadId);
  }

  handleCreatePost = (values) => {
    const { auth, createPost, match } = this.props;
    const userId = auth.user.id;
    const threadId = Number(match.params.threadId);
    const data = { ...values, user: userId, thread: threadId };
    createPost(data);
  };

  renderPosts() {
    const { posts } = this.props;
    const postsList = posts.data.results.map((post) => (
      <PostWrapper key={post.id}>
        <PostHeader>
          <AvatarThumbnail
            src={post.user.avatar_thumbnail}
            alt="Avatar thumbnail"
          />
          <PostHeaderInnerWrapper>
            <UserLink to={`/profile/${post.user.id}`}>
              {post.user.username}
            </UserLink>
            <DateSpan>{formatTime.main(post.created)}</DateSpan>
          </PostHeaderInnerWrapper>
        </PostHeader>
        <Content>{post.content}</Content>
      </PostWrapper>
    ));
    return postsList;
  }

  render() {
    const { thread, posts, match } = this.props;
    const { categoryId } = match.params;

    if (thread.fetching || posts.fetching) {
      return <Spinner />;
    }

    // if (!_.isEmpty(thread.errors) || !.isEmpty(posts.errors)) {
    // return renderPageError(thread.errors) || renderPageError(posts.errors);
    // }

    if (thread.fetched && posts.fetched) {
      return (
        <ContainerDiv>
          <LinkWrapper>
            <FontAwesomeIcon icon={faArrowLeft} />
            &nbsp;
            <NavLink to={`/categories/${categoryId}`}>
              Back to all threads
            </NavLink>
          </LinkWrapper>

          <FirstPostWrapper>
            <PostHeader>
              <AvatarThumbnail
                src={thread.data.user.avatar_thumbnail}
                alt="Avatar thumbnail"
              />
              <PostHeaderInnerWrapper>
                <UserLink to={`/profile/${thread.data.user.id}`}>
                  {thread.data.user.username}
                </UserLink>
                <DateSpan>{formatTime.main(thread.data.created)}</DateSpan>
              </PostHeaderInnerWrapper>
            </PostHeader>
            <ThreadTitle>{thread.data.title}</ThreadTitle>
            <Content>{thread.data.subject}</Content>
          </FirstPostWrapper>

          {this.renderPosts()}

          {/* create post form */}
          <PostWrapper>
            <Form onSubmit={this.handleCreatePost}>
              {({ handleSubmit, values, form }) => (
                <form
                  onSubmit={async (event) => {
                    await handleSubmit(event);
                    form.reset();
                  }}
                >
                  <Field name="content">
                    {({ input }) => (
                      <StyledTextArea
                        {...input}
                        rows="3"
                        placeholder="Add your comment.."
                        maxLength="2000"
                      />
                    )}
                  </Field>
                  {values.content && (
                    <SubmitButton
                      type="submit"
                      value="Submit Post"
                      color="greenOutline"
                    />
                  )}
                </form>
              )}
            </Form>
          </PostWrapper>
        </ContainerDiv>
      );
    }
    return null;
  }
}

Thread.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  auth: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  thread: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      id: PropTypes.number,
      user: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        avatar_thumbnail: PropTypes.string,
      }),
      title: PropTypes.string,
      subject: PropTypes.string,
      created: PropTypes.string,
    }).isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
  posts: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      results: PropTypes.array,
    }).isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
  fetchThread: PropTypes.func.isRequired,
  fetchPostsByThread: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  thread: state.thread,
  posts: state.postsByThread,
});

export default connect(mapStateToProps, {
  fetchThread: fetchThread_,
  fetchPostsByThread: fetchPostsByThread_,
  createPost: createPost_,
  deletePost: deletePost_,
})(Thread);