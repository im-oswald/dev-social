import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { deleteEducation } from '../../actions/profile';
import { connect } from 'react-redux';

const Education = ({ education, deleteEducation }) => {
  const educations = education && education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>{edu.fieldofstudy}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {
          edu.to === null ? ' Now' : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
        }
      </td>
      <td>
        <button className='btn btn-danger' onClick={() => deleteEducation(edu._id)}>Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Major</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          { educations }
        </tbody>
      </table>
    </Fragment>
  )
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education);
