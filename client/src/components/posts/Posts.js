import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getProfiles } from '../../actions/profile'

const Posts = ({ post: { posts, loading }, getProfiles }) => {
  useEffect(() => {
    getProfiles()
  }, [getProfiles, loading]);

  return (
    <Fragment>

    </Fragment>
  )
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getProfiles })(Posts);
