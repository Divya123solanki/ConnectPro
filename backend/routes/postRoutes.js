import express from 'express';
import { 
  createPost,
  getPost,
  updatePost,
  deletePost,
  getAllPosts,
  getUserPosts,
  likePost,
  unlikePost,
  commentOnPost,
  deleteComment,
  sharePost,
  getPostLikes,
  getPostComments,
  getPostsByCategory,
  searchPosts
} from '../controllers/postController.js';

const router = express.Router();

// Routes
router.post('/', createPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.get('/', getAllPosts);
router.get('/user/:userId', getUserPosts);
router.post('/:postId/like', likePost);
router.delete('/:postId/like', unlikePost);
router.post('/:postId/comment', commentOnPost);
router.delete('/:commentId/comment', deleteComment);
router.post('/:postId/share', sharePost);
router.get('/:postId/likes', getPostLikes);
router.get('/:postId/comments', getPostComments);
router.get('/category/:category', getPostsByCategory);
router.get('/search', searchPosts);

export default router;
