const Post = require("../models/Post");
const RSSParser = require("rss-parser");

class PostController {
  async getRssPosts(req, res) {
    try {
      const feedUrl = req.query.url;

      const rssParser = new RSSParser();
      let info = {};
      let posts = [];

      const feed = await rssParser.parseURL(feedUrl);

      info.title = feed.title;
      info.date = feed.lastBuildDate || feed.pubDate;
      info.img = feed.image?.url || "";
      info.url = feed.link;

      feed.items.forEach((item) => {
        posts.push({ item });
      });

      return res.json({ posts: posts, info: info });
    } catch (e) {
      console.error(e);
      res.send({ message: "Server Error" });
    }
  }

  async getAllPosts(req, res) {
    try {
      const { sort, page, limit } = req.query;

      let skip = (page - 1) * limit;

      let posts = [];

      switch (sort) {
        case "date":
          posts = await Post.find()
            .sort({ pubDate: -1 })
            .skip(skip)
            .limit(limit);
          break;
        case "title":
          posts = await Post.find().sort({ title: 1 }).skip(skip).limit(limit);
          break;
        default:
          posts = await Post.find()
            .sort({ pubDate: -1 })
            .skip(skip)
            .limit(limit);
      }

      if (!posts) {
        return res.status(404).json({ message: "No data in DataBase" });
      }

      return res.json(posts);
    } catch (e) {
      console.error(e);
      res.send({ message: "Server Error" });
    }
  }

  async getPostsCount(req, res) {
    try {
      const count = await Post.find().count();

      return res.json(count);
    } catch (e) {
      console.error(e);
      res.send({ message: "Server Error" });
    }
  }

  async getPostsSearch(req, res) {
    try {
      const searchName = req.query.search;

      let posts = await Post.find().sort({ pubDate: -1 });

      posts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchName)
      );
      return res.json(posts);
    } catch (e) {
      console.error(e);
      return res.status(400).json({ message: "Searching error" });
    }
  }

  async addPost(req, res) {
    try {
      const { title, link, pubDate, image, description } = req.body;

      if (title === "" || link === "" || description === "") {
        return res.status(400).json({
          message: `Title, link and description can not be empty.`,
        });
      } else {
        let filedate = Date.now();
        let correctDate = pubDate || Date(filedate);

        const post = new Post({
          title,
          pubDate: correctDate,
          link,
          image,
          description,
        });

        // проверяем существование такой новости в БД
        const candidate = await Post.findOne({ pubDate });

        if (candidate) {
          return res.status(400).json({
            message: `News with this pubDate already exists in DataBase`,
          });
        }

        await post.save();

        return res.json({
          post,
          message: "Post was added successfully",
        });
      }
    } catch (e) {
      console.error(e);
      res.send({ message: "Server Error" });
    }
  }

  async updatePost(req, res) {
    try {
      const { id, title, link, pubDate, image, description } = req.body;

      const post = await Post.findById(id);

      post.title = title;
      post.link = link;
      post.description = description;
      post.image = image;

      await post.save();

      return res.json({
        post,
        message: "Post was updated successfully",
      });
    } catch (e) {
      console.error(e);
      res.send({ message: "Server Error" });
    }
  }

  async deletePost(req, res) {
    try {
      await Post.findOneAndDelete({ _id: req.query.id });

      return res.json({
        message: "Post was deleted successfully",
      });
    } catch (e) {
      console.error(e);
      res.send({ message: "Server Error" });
    }
  }
}

module.exports = new PostController();
