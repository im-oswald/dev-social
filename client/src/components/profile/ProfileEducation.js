import React, { Fragment } from 'react'
import Moment from 'react-moment'

const ProfileEducation = ({ edu: { _id, school, from, to, description, degree, fieldofstudy } }) => (
  <Fragment>
    <div key={_id}>
      <h3>{school}</h3>
      <p><Moment format='MMM YYYY'>{from}</Moment> - {to ? <Moment format='MMM YYYY'>{to}</Moment> : 'Current'}</p>
      <p><strong>Degree: </strong>{degree}</p>
      <p><strong>Field Of Study: </strong>{fieldofstudy}</p>
      <p>
        <strong>Description: </strong>{description}
      </p>
    </div>        
  </Fragment>
)

export default ProfileEducation
