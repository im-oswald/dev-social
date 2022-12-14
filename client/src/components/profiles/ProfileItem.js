import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const ProfileItem = ({ profile: { user: { _id, name, avatar }, location, status, company, skills } }) => (
  <Fragment>
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>{status} {company && <span>at {company}</span>}</p>
        <p className='my-2'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0,4).map((skill, index) => <li key={index} className='text-primary'>
            <i className='fas fa-check'></i> {skill}
          </li>
        )}
      </ul>
    </div>
  </Fragment>
)

export default ProfileItem
