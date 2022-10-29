import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Alert = ({ alerts }) => alerts && alerts.length ? <div className='container'>
  { alerts.map(alert => <div key={alert.id} className={`alert alert-${alert.alertType}`}>{alert.msg}</div>) }
</div> : null

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alert);
