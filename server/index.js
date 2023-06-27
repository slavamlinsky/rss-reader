require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const RSSParser = require("rss-parser");
const cronJob = require("cron").CronJob;

const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");

const Post = require("./models/Post");

// *** Константы ***
// Радио Свобода - https://www.radiosvoboda.org/api/zrqiteuuir
// ТСН Новини - https://tsn.ua/rss/full.rss
// Цензор.Нет - https://static.censor.net/censornet/rss/rss_ru_events.xml
// TechRadar - https://www.techradar.com/rss/news/computing
// DailyStar - https://www.dailystar.co.uk/sport/football/?service=rss

const rssURL = "https://www.radiosvoboda.org/api/zrqiteuuir";

const PORT = process.env.PORT || 5000;

const rssParser = new RSSParser();
let info = {};
let posts = [];

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.get("/", (req, res) => {
  res.send(posts);
});

app.get("/info", (req, res) => {
  res.send(info);
});

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.error(err));

// Запускаем сервер

const server = app.listen(PORT, () => {
  console.log("Server is listening on localhost:" + PORT);
});

// Добавление свежей новости в базу данных
async function addOnePost(title, pubDate, link, image, description) {
  try {
    let correctDate = pubDate || Date(Date.now());

    const post = new Post({
      title,
      pubDate: correctDate,
      link,
      image,
      description,
    });

    // Проверка существования этой новости в БД (по дате)
    candidate = await Post.findOne({ pubDate });

    if (!candidate) {
      await post.save();
    }
  } catch (e) {
    console.error(e);
  }
}
async function loadingFirstNews(feedUrl) {
  try {
    const feed = await rssParser.parseURL(feedUrl);
    const thisMoment = Date.now();
    const rssUpdated = Date.parse(feed.lastBuildDate);
    console.log("Loading all news", Date(thisMoment));

    if (rssUpdated < thisMoment) {
      feed.items.forEach((item) => {
        addOnePost(
          item.title.replace("&quot;", '"').replace("&#039;", "'"),
          item.pubDate,
          item.link,
          item.enclosure.url,
          item.content.replace("&quot;", '"').replace("&#039;", "'")
        );
      });
    }
  } catch (e) {
    console.error(e);
  }
}

async function checkNewsUpdated(feedUrl) {
  try {
    const feed = await rssParser.parseURL(feedUrl);

    const thisMoment = Date.now();
    const rssUpdated = Date.parse(feed.lastBuildDate);

    if (rssUpdated < thisMoment) {
      feed.items.forEach((item) => {
        const term = Math.round(
          (thisMoment - Date.parse(item.pubDate)) / 1000 / 60
        );
        console.log(Date(thisMoment));
        console.log("Term", term);
        if (term <= 30) {
          addOnePost(
            item.title.replace("&quot;", '"').replace("&#039;", "'"),
            item.pubDate,
            item.link,
            item.enclosure.url,
            item.content.replace("&quot;", '"').replace("&#039;", "'")
          );
        }
      });
    }
  } catch (e) {
    console.error(e);
  }
}

// При запуске пробуем загружать сразу все новости (одним методом)
loadingFirstNews(rssURL);

// И потом добавляем раз в 30 минут свежие - (дополнительно проверяем существование в базе)

const job = new cronJob("*/30 * * * *", () => {
  checkNewsUpdated(rssURL);
});

job.start();
