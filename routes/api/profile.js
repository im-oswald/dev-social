const express = require('express');
const request = require('request');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('./../../middlewares/auth');
const Profile = require('./../../models/Profile');

const router = express.Router();

// @route           /api/profile/me
// @description     to show the user profile
// @access          Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if(!profile) {
      return res.status(404).json({ errors: [{ msg: 'No profile found against the user' }] });
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
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Location is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
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
  profileFields.user = req.user.id;
  if(company != null) profileFields.company = company;
  if(website != null) profileFields.website = website;
  if(status != null) profileFields.status = status;
  if(location != null) profileFields.location = location;
  if(bio != null) profileFields.bio = bio;
  if(githubusername != null) profileFields.githubusername = githubusername;
  if(skills != null) profileFields.skills = skills.split(',').map(skill => skill.trim());
  
  profileFields.social = {}
  if(youtube != null) profileFields.social.youtube = youtube;
  if(twitter != null) profileFields.social.twitter = twitter;
  if(facebook != null) profileFields.social.facebook = facebook;
  if(linkedin != null) profileFields.social.linkedin = linkedin;
  if(instagram != null) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if(profile) {
      profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
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

// @route         /api/profile
// @description   Get all profiles
// @access        Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    res.send(profiles);
  } catch(err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route         /api/profile/user/:user_id
// @description   Get given user profile
// @access        Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

    if(!profile) {
      return res.status(404).json({ errors: [{ msg: 'Profile not found' }] });
    }

    res.send(profile);
  } catch(err) {
    console.log(err);

    if(err.kind == 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Profile not found' }] });
    }

    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route         /api/profile
// @description   Delete current profile, user and posts
// @access        Private
router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted successfully' });
  } catch(err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route         /api/profile/experience
// @description   Add experience to current user profile
// @access        Private
router.put('/experience', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const experience = req.body;

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(experience);
    await profile.save();
    res.json(profile);
  } catch(err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
})

// @route         /api/profile/experience/:experience_id
// @description   Remove specific experience from profile
// @access        Private
router.delete('/experience/:experience_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.experience_id);

    if(removeIndex < 0) {
      return res.status(401).json({ errors: [{ msg: 'Experience not found' }] });
    }

    profile.experience.splice(removeIndex, 1);

    await profile.save();
    
    res.json(profile);
  } catch(err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
})

// @route         /api/profile/education
// @description   Add education to current user profile
// @access        Private
router.put('/education', [auth, [
  check('school', 'School name is required').not().isEmpty(),
  check('degree', 'Degree title is required').not().isEmpty(),
  check('fieldofstudy', 'Major in which you studied is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const education = req.body;

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(education);
    await profile.save();
    res.json(profile);
  } catch(err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }

});

// @route         /api/profile/education/:education_id
// @description   Delete education for a user profile
// @access        private
router.delete('/education/:education_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.education_id);

    if(removeIndex < 0) {
     return res.status(401).json({ errors: [{ msg: 'Education not found' }] })
    }

    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch(err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route         /api/profile/github/:username
// @description   Search repos for github user
// @access        public
router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos`,
      method: 'GET',
      headers: {
        'User-Agent': 'dev-connector-application'
      }
    }

    console.log(options);

    request(options, (error, success, body) => {
      if(error) {
        console.log(err);
      }

      if(success.statusCode !== 200) {
        return res.status(404).json({ errors: [{ msg: 'Github user not found' }] });
      }

      res.json(JSON.parse(body));
    });
  } catch(err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
})

module.exports = router;
