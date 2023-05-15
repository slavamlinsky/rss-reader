require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const RSSParser = require("rss-parser");
const cronJob = require('cron').CronJob;

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

// Пользовательские впспомогательные функции
// Сохраянем свежие новости в базу данных
async function addOnePost(title, pubDate, link, image, description) {    
    try {           

      // Корректирвока времени с учётом часового пояса 
      // Если время не задано - устанавливаем текущее
      let correctDate = pubDate || Date(Date.now());

      const post = new Post({
        title,
        pubDate: correctDate,
        link,
        image,
        description,
      });      

      // Проверка существования этой новости в БД (по имени / но лучше по дате)
      candidate = await Post.findOne({ title })
      
      if(!candidate){
        console.log("Сохраняем эту новость в базу данных", post);
        await post.save();
      } else {
        console.log("Эта новость уже есть в БД", post);
      }
    } catch (e) {
      console.log(e);    
    }
  }
async function loadingFirstNews(feedUrl){
  try {
                  
      const feed = await rssParser.parseURL(feedUrl);     
      
      const thisMoment = Date.now()
      const rssUpdated = Date.parse(feed.lastBuildDate)
              
      console.log("RSS", Date.parse(feed.lastBuildDate))
      console.log("NOW", thisMoment)
      if(rssUpdated < thisMoment){   
          
        console.log("RSS лента обновлена " + Math.round((thisMoment - rssUpdated)/1000/60) + " минут назад")
        
        feed.items.forEach((item) => {                
          addOnePost(item.title.replaceAll("&quot;", "\"").replaceAll("&#039;", "'"), item.pubDate, item.link, item.enclosure.url, item.content.replaceAll("&quot;", "\"").replaceAll("&#039;", "'"));                
        });      }          
      
    } catch (e) {
      console.error(e);        
  }
}
  
async function checkNewsUpdated(feedUrl){
    try {    
        const feed = await rssParser.parseURL(feedUrl);
        
        console.log("====TITLE=======  " + feed.title + "  =============");        
        console.log("Updated (lastBuildDate)", feed.lastBuildDate);
        const thisMoment = Date.now()
        const rssUpdated = Date.parse(feed.lastBuildDate)
                
        console.log("RSS", Date.parse(feed.lastBuildDate))
        console.log("NOW", thisMoment)
        if(rssUpdated < thisMoment){            
            
            console.log("Прошло минут", Math.round((thisMoment - rssUpdated)/1000/60))
            
            feed.items.forEach((item) => {
                    const term = Math.round((thisMoment - Date.parse(item.pubDate))/1000/60);
                    if( term <= 60){
                        addOnePost(item.title.replaceAll("&quot;", "\"").replaceAll("&#039;", "'"), item.pubDate, item.link, item.enclosure.url, item.content.replaceAll("&quot;", "\"").replaceAll("&#039;", "'"));
                    }
                  //posts.push({ item });
                });
        }
        else{
            console.log("Больше, чем сейчас");   
        }    
        
      } catch (e) {
        console.error(e);        
      }
}

// При запуске пробуем загружать сразу все новости (одним методом)
// Сначала читаем и добавляем в базу все последние новости (обычно их 20 штук)
loadingFirstNews(rssURL);

// И потом добавляем раз в 30 минут свежие - (дополнительно проверяем существование в базе)

const job = new cronJob('*/15 * * * *', () => {
    //console.log("Every minute job");
    console.log("Читаем с RSS ленты сообщения - проверяем (если есть)");
    console.log("И добавляем новые в нашу Базу Данных");

    checkNewsUpdated(rssURL);
})

job.start()