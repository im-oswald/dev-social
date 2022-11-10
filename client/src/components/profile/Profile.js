import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileByUser } from '../../actions/profile';
import Spinner from '../spinner/Spinner';
import { Link, useParams } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import About from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileRepos from './ProfileRepos';

const Profile = ({ getProfileByUser, auth, profile: { profile, loading } }) => {
  const params = useParams();

  useEffect(() => {
    getProfileByUser(params.id);
  }, [getProfileByUser, loading, params.id]);

  return (
    <div className='container'>
      {!Object.keys(profile).length || loading ? <Spinner /> : <Fragment>
        <Link className='btn btn-light' to='/profiles'>Back to Profiles</Link>
        {!auth.loading && auth.isAuthenticated && auth.user?._id === profile.user._id && <Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <About profile={profile} />
            {profile.experience.length ? <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              { profile.experience.map((exp) => <ProfileExperience exp={exp} key={exp._id} />) }
            </div>: <h4>No experience found</h4>}

            {profile.education.length ? <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.map((edu) => <ProfileEducation edu={edu} key={edu._id} />)}
            </div> : <h4>No education found</h4>}
          </div>

          {profile.githubusername && <ProfileRepos username={profile.githubusername} />}
        </Fragment>}
    </div>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileByUser })(Profile);
