const express = require('express');
const { check, validationResult } = require('express-validator');
const Post = require('../../models/Post');
const User = require('../../models/User');
const auth = require('./../../middlewares/auth');

const router = express.Router();

// @route         /api/posts
// @description   To add a new user post
// @access        Private
router.post('/', [auth, [
  check('text').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id);

    const post = new Post({
      text: req.body.text,
      name: user.name,
      user: req.user.id,
      avatar: user.avatar
    });

    await post.save();

    res.json(post);

  } catch(err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route         /api/posts
// @description   To list all posts
// @access        Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: '-1' });

    res.json(posts);
  } catch(err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route         /api/posts/:post_id
// @description   To list a specific post
// @access        Private
router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if(!post) {
      return res.status(401).json({ errors: [{ msg: 'No post found' }] });
    }

    res.json(post);
  } catch(err) {
    console.log(err);

    if(err.kind == 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'No post found' }] });
    }

    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route         /api/posts/:post_id
// @description   To delete a specific post
// @access        Private
router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if(!post) {
      return res.status(404).json({ errors: [{ msg: 'No post found' }] });
    }

    if(post.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'Forbidden action' }] });
    }

    await post.remove();

    res.send('Post deleted successfully');
  } catch(err) {
    console.log(err);

    if(err.kind == 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'No post found' }] });
    }

    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route         /api/posts/:post_id/like
// @description   To add a like to a post
// @access        Private
router.post('/:post_id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if(!post) {
      return res.status(404).json({ errors: [{ msg: 'No post found' }] });
    }

    if(post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
      return res.status(404).json({ errors: [{ msg: 'Already liked by this user' }] });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.send(post.likes);
  } catch(err) {
    console.log(err);

    if(err.kind == 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'No post found' }] });
    }

    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route         /api/posts/:post_id/unlike
// @description   To add a like to a post
// @access        Private
router.post('/:post_id/unlike', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if(!post) {
      return res.status(404).json({ errors: [{ msg: 'No post found' }] });
    }

    if(post.likes.filter((like) => like.user.toString() === req.user.id).length == 0) {
      return res.status(404).json({ errors: [{ msg: 'Has not been liked by user yet' }] });
    }

    const removeIndex = post.likes.findIndex(like => like.user == req.user.id);

    if(removeIndex < 0) {
      return res.status(404).json({ errors: [{ msg: 'User not found' }] });
    }

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.send(post.likes);
  } catch(err) {
    console.log(err);

    if(err.kind == 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'No post found' }] });
    }

    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route         /api/posts/:post_id/comment
// @description   To add a comment to a post
// @access        Private
router.post('/:post_id/comment', [
  auth,
  [
    check('text', 'Comment body should be there').not().isEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.post_id);

    if(!post) {
      res.status(404).json({ 'msg': 'Post not found' });
    }

    const comment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };
    
    post.comments.unshift(comment);

    await post.save();

    res.json(post.comments)
  } catch(err) {
    console.log(err);

    if(err.kind == 'ObjectId') {
      res.status(404).json({ 'msg': 'Post not found' });
    }

    res.status(500).json({ 'msg': 'Internal server error' });
  }
});

// @route         /api/posts/:post_id/comment/:comment_id
// @description   To add a comment to a post
// @access        Private
router.delete('/:post_id/comment/:comment_id', auth, async (req, res) => {

  try {
    const post = await Post.findById(req.params.post_id);

    if(!post) {
      return res.status(404).json({ 'msg': 'Post not found' });
    }

    const removeIndex = post.comments.map(comment => comment.id).indexOf(req.params.comment_id);

    if(removeIndex < 0) {
      return res.status(404).json({ errors: [{ msg: 'Comment not found' }] });
    }

    const comment = post.comments.find(comment => comment.id == req.params.comment_id);

    if(comment.user.toString() != req.user.id) {
      return res.status(401).json({ 'msg': 'Access forbidden' });
    }
    
    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments)
  } catch(err) {
    console.log(err);

    if(err.kind == 'ObjectId') {
      res.status(404).json({ 'msg': 'Post not found' });
    }

    res.status(500).json({ 'msg': 'Internal server error' });
  }
});

module.exports = router;
