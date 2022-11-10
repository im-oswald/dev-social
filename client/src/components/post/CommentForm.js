import React, { useState } from 'react'
import { addComment } from '../../actions/post'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    addComment({ text }, postId);
    setText('');
  }

  return (
    <div>
      <div className="post-form">
        <form className="form my-1" onSubmit={onSubmit}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Add a comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>      
    </div>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
}

export default connect(null, { addComment })(CommentForm)
