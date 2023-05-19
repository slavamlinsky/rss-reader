const Router = require("express");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/auth.middleware");
const postController = require("../controllers/postController");

// Можно посмотреть сразу в браузере http://localhost:5000/api/posts?url=https://www.radiosvoboda.org/api/zrqiteuuir

const router = new Router();

// @/api/posts - главный API для новостей
// ---------------------------------------------
// GET @/api/posts - чтение RSS ленты по указанному URL адресу (url)
router.get("", postController.getRssPosts);

// GET @/api/posts/all - чтение всех новостей из БД
router.get("/all", authMiddleware, postController.getAllPosts);

// GET @/api/posts/count- общее количество новостей в БД
router.get("/count", authMiddleware, postController.getPostsCount);

// GET @/api/posts/search - поиск/фильтр новостей в БД
router.get("/search", authMiddleware, postController.getPostsSearch);

// POST @/api/posts/add - добавление новости в БД
router.post("/add", authMiddleware, postController.addPost);

// POST @/api/posts/update - обновление новости в БД
router.post("/update", authMiddleware, postController.updatePost);

// DELETE @/api/posts/delete - удаление новости из БД
router.delete("/delete", authMiddleware, postController.deletePost);

module.exports = router;
