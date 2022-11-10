import React, { Fragment } from 'react'
import Moment from 'react-moment'

const ProfileExperience = ({ exp: { _id, company, from, title, description, to } }) => (
  <Fragment>
    <div key={_id}>
      <h3 className="text-dark">{company}</h3>
      <p><Moment format='MMM YYYY'>{from}</Moment> - {to ? <Moment format='MMM YYYY'>{to}</Moment> : 'Current'}</p>
      <p><strong>Position: </strong>{title}</p>
      <p>
        <strong>Description: </strong>{description}
      </p>
    </div>
  </Fragment>
)

export default ProfileExperience
