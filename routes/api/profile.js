const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('./../../middlewares/auth');
const Profile = require('./../../models/Profile');

const router = express.Router();

// @route           /api/profile/me
// @description     to show the user profile
// @access          Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user_id: req.user.id }).populate('user', ['name', 'avatar']);

    if(!profile) {
      res.status(400).json({ errors: [{ msg: 'No profile found against the user' }] });
    }

    res.json(profile);
  } catch(err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route         /api/profile
// @description   Save and update current user profile
// @access        Private
router.post('/', [auth, [
  check('status').not().isEmpty(),
  check('skills').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const {
    company,
    website,
    status,
    location,
    skills,
    bio,
    githubusername,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram
  } = req.body;

  let profileFields = {};
  if(company) profileFields.company = company;
  if(website) profileFields.website = website;
  if(status) profileFields.status = status;
  if(location) profileFields.location = location;
  if(bio) profileFields.bio = bio;
  if(githubusername) profileFields.githubusername = githubusername;
  if(skills) profileFields.skills = skills.split(',').map(skill => skill.trim());
  
  profileFields.social = {}
  if(youtube) profileFields.social.youtube = youtube;
  if(twitter) profileFields.social.twitter = twitter;
  if(facebook) profileFields.social.facebook = facebook;
  if(linkedin) profileFields.social.linkedin = linkedin;
  if(instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user_id: req.user.id });

    if(profile) {
      profile = await Profile.findOneAndUpdate({ user_id: req.user.id }, { $set: profileFields }, { new: true });
    } else {
      profile = new Profile(profileFields);
      profile.save();
    }

    res.json(profile);
  } catch(err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

module.exports = router;
