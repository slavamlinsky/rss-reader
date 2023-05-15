const Post = require("../models/Post");
const RSSParser = require("rss-parser");

class PostController {
  async getRssPosts(req, res) {
    try {
      const feedUrl = req.query.url;
      //console.log(feedUrl);

      const rssParser = new RSSParser();
      let info = {};
      let posts = [];

      const feed = await rssParser.parseURL(feedUrl);
      //console.info("Title", feed.title);
      // console.log("===========  " + feed.title + "  =============");
      // console.log(feed.image.url);
      // console.log(feed.lastBuildDate);
      info.title = feed.title;
      info.date = feed.lastBuildDate || feed.pubDate;
      info.img = feed.image?.url || "";
      info.url = feed.link;

      // const lastDate = new Date("Wed, 10 May 2023 20:01:33 +0300")
      // const currentDate = new Date(Date.now())
      // console.log("Last", lastDate);
      // console.log("Current", currentDate);
      // console.log(lastDate < currentDate);
      // console.log(info);

      feed.items.forEach((item, index) => {
        //console.log(`${index} - ${item.title} / ${item.pubDate} / ${item.enclosure.url}\n`);
        posts.push({ item });
      });

      //console.log(posts);

      return res.json({ posts: posts, info: info });
    } catch (e) {
      console.error(e);
      res.send({ message: "Server Error" });
    }
  }

  async getAllPosts (req, res) {
    try {
      const { sort, page, limit } = req.query;
  
      let skip = (page - 1) * limit;
  
      // console.log("Sort", sort);
      // console.log("Limit", limit);
      // console.log("Skip", skip);
      // console.log("Page", page);
      // console.log(req.user);
  
      //console.log(feedUrl);
  
      //let info = {};
      let posts = [];
  
      switch (sort) {
        case "date":
          posts = await Post.find().sort({ pubDate: -1 }).skip(skip).limit(limit);
          break;
        case "title":
          posts = await Post.find().sort({ title: 1 }).skip(skip).limit(limit);
          break;
        default:
          posts = await Post.find().sort({ pubDate: -1 }).skip(skip).limit(limit);
      }
  
      //console.log(posts);
  
      if (!posts) {
        return res.status(404).json({ message: "No data in DataBase" });
      }
  
      return res.json(posts);
    } catch (e) {
      console.error(e);
      res.send({ message: "Server Error" });
    }
  }

  async getPostsCount (req, res) {
    try {
      const count = await Post.find().count();
  
      return res.json(count);
    } catch (e) {
      console.error(e);
      res.send({ message: "Server Error" });
    }
  }

  async getPostsSearch (req, res) {
    try {
      const searchName = req.query.search;
      //console.log(searchName);
  
      let posts = await Post.find();
  
      posts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchName)
      );
      return res.json(posts);
  
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Searching error" });
    }
  }

  async addPost(req, res) {
    //console.log(req.body);
    try {
      const { title, link, pubDate, image, description } = req.body;

      //console.log("IncomeDate", pubDate);
      //console.log("Date", Date(pubDate));

      // Корректирвока времени с учётом часового пояса (Тут ещё нужно будет проверить точно формирование времени)
      let filedate = Date.now();
      //console.log(filedate);
      //console.log("Now" + Date(filedate));

      //let offset = new Date(filedate).getTimezoneOffset();
      //let correctDate = date || (filedate-offset*60*1000);
      let correctDate = pubDate || Date(filedate);

      const post = new Post({
        title,
        pubDate: correctDate,
        link,
        image,
        description,
      });
      //console.log("Post", post);

      await post.save();

      return res.json({
        post,
        message: "Post was added successfully",
      });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server Error" });
    }
  }

  async updatePost(req, res) {
    console.log(req.body);
    try {
      const { id, title, link, pubDate, image, description } = req.body;
  
      //console.log("IncomeDate", pubDate);
      //console.log("Date", Date(pubDate));
  
      // Корректирвока времени с учётом часового пояса (Тут ещё нужно будет проверить точно формирование времени)
      let filedate = Date.now();
      console.log(filedate);
      //console.log("Now" + Date(filedate));
  
      //let offset = new Date(filedate).getTimezoneOffset();
      //let correctDate = date || (filedate-offset*60*1000);
      let correctDate = pubDate || Date(filedate);
      // const post = new Post({title, pubDate: correctDate, link, image, description})
  
      const post = await Post.findById(id);
  
      //console.log("Post Update", post);
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
      console.log(e);
      res.send({ message: "Server Error" });
    }
  }

  async deletePost (req, res) {
    //console.log(req.query);
    try {
      // const id = req.query.id
  
      //console.log("Удаляем файл ", req.query.id);
  
      // const post = Post.findOne({ _id: req.query.id, user: req.user.id });
      const post = await Post.findOneAndDelete({ _id: req.query.id });
  
      //await post.remove()
  
      return res.json({
        message: "Post was deleted successfully",
      });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server Error" });
    }
  }
}

module.exports = new PostController();
