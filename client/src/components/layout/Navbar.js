import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { logout } from './../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Navbar = ({ logout, isAuthenticated, loading }) => {
  const guestNav = <Fragment>
    <li><Link to="/profiles">Developers</Link></li>
    <li><Link to="/posts">Posts</Link></li>
    <li><Link to="/register">Register</Link></li>
    <li><Link to="/login">Login</Link></li>
  </Fragment>;

  const authNav = <Fragment>
    <li>
      <Link to="/profiles">Developers</Link>
    </li>
    <li>
      <Link to="/posts">Posts</Link>
    </li>
    <li>
      <Link to="/dashboard">
        <i className="fas fa-user"></i>
        <span className='hide-sm'>Dashboard</span>
      </Link>
    </li>
    <li>
      <a href='#!' onClick={logout}>
        <i className="fas fa-sign-out-alt"></i>
        <span className='hide-sm'>Logout</span>
      </a>
    </li>
  </Fragment>;

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      <ul>
        { !loading && isAuthenticated ? authNav : guestNav }
      </ul>
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
})

export default connect(mapStateToProps, { logout })(Navbar);
