import React, { Fragment } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deletePost, likePost, unlikePost } from '../../actions/post'
import PropTypes from 'prop-types'

const PostItem = ({ showActions, post: { _id, text, comments, name, avatar, likes, date, user }, auth, likePost, unlikePost, deletePost }) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img
          className="round-img"
          src={avatar}
          alt=""
        />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
      </p>
      {showActions && <Fragment>
        <button type="button" className="btn btn-light" onClick={() => likePost(_id)}>
          <i className="fas fa-thumbs-up"></i>
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button type="button" className="btn btn-light" onClick={() => unlikePost(_id)}>
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion {comments.length > 0 && <span className='comment-count'>{comments.length}</span>}
        </Link>
        {!auth.loading && user === auth.user._id && <button      
          type="button"
          className="btn btn-danger"
          onClick={() => deletePost(_id) }>
          <i className="fas fa-times"></i>
        </button>}        
      </Fragment>}
    </div>
  </div>
)

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { likePost, unlikePost, deletePost })(PostItem);
