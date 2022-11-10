import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profile';
import Spinner from '../spinner/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles, loading]);

  return (
    <Fragment>
      <div className='container'>
        { loading ? <Spinner /> : <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and connect with developers
          </p>
          <div className='profiles'>
            {
              profiles.length > 0 ?
              profiles.map((profile, index) => <ProfileItem key={index} profile={profile} />) :
              <h4>No profiles found...</h4>
            }
          </div>
        </Fragment> }
      </div>
    </Fragment>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles);
