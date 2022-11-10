import React from 'react'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import PropTypes from 'prop-types'

const Comments = ({ post: { _id, comments } }) => {
  return (
    <div>
      <h1 className="large text-primary">
        Comments
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Leave a comment</p>
      <CommentForm postId={_id} />
      {comments && comments.map(comment => <CommentItem comment={comment} postId={_id} />)}
    </div>
  )
}

Comments.propTypes = {
  post: PropTypes.object.isRequired
}

export default Comments
