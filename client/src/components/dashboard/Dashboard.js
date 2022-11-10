import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { deleteAccount } from '../../actions/profile';

const Dashboard = ({ auth: { user }, profile: { profile, loading }, getCurrentProfile, deleteAccount }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <div className='container'>
      {loading ? <Spinner /> : <Fragment>
        <h1 className='text-primary large'>Dashboard</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Welcome {user?.name}!
        </p>
        {Object.keys(profile).length ? <DashboardActions /> : <Fragment>
          <p>It seems you haven't setup your profile yet. Click here to add some info.</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>}
        <Experience experience={profile.experience || []} />
        <Education education={profile.education || []} />

        <div className='my-2'>
          <button className='btn btn-danger' onClick={() => deleteAccount()}>
            <i className='fas fa-user-minus'></i> Delete My Account
          </button>
        </div>
      </Fragment>}
    </div>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
