import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post'
import PostItem from '../posts/PostItem'
import Spinner from '../spinner/Spinner'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import Comments from './Comments'

const Post = ({ getPost, post: { post, loading } }) => {
  const params = useParams();

  useEffect(() => {
    getPost(params.id)
  }, [getPost, params.id])

  return (<div className='container'>
    {loading ? <Spinner /> : <Fragment>
      <PostItem post={post} showActions={false} />
      <Comments post={post} />
    </Fragment>}
  </div>)
}

const mapStateToProps = state => ({
  post: state.post
})

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { getPost })(Post)
