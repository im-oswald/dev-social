import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteComment } from '../../actions/post'
import PropTypes from 'prop-types'

const CommentItem = ({ comment: { _id, text, avatar, user, name, date }, postId, auth, deleteComment }) => {
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            class="round-img"
            src={avatar}
            alt=""
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{text}</p>
        <p class="post-date">Posted on <Moment format='MM/DD/YYYY'>{date}</Moment></p>
        {!auth.loading && user === auth.user._id && <button      
          type="button"
          className="btn btn-danger"
          onClick={() => deleteComment(postId, _id) }>
          <i className="fas fa-times"></i>
        </button>}   
      </div>        
    </div>
  )
}

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { deleteComment })(CommentItem)
