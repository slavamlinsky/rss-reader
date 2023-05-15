import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { hidePreloader, showPreloader } from "../../reducers/appReducer";
import { API_URL } from "../../config";
import RssPost from "./RssPost";

import styles from "../../styles/App.module.scss";

const Feed = () => {
    const dispatch = useDispatch();

    const isLoading = useSelector(state => state.app.loader)

    const [feedLink, setFeedLink] = useState("https://www.radiosvoboda.org/api/zrqiteuuir");

    const [feedInfo, setFeedInfo] = useState("");
    const [posts, setPosts] = useState([]);
    //const [filteredPosts, setFilteredPosts] = useState([]);

    const [total, setTotal] = useState(30);


    async function loadPosts(feedUrl) {
        try {
            dispatch(showPreloader())
            const params = { url: feedUrl };

            await axios
                .get(`${API_URL}api/posts`, {
                    params: params,
                })
                .then(function (response) {
                    if (response?.status === 200) {
                        //alert("Список вдало!");
                        //console.log(response.data);
                        setPosts(response.data.posts)
                        setFeedInfo(response.data.info)
                    }
                });
        } catch (e) {
            if (e.response?.status === 404) {
                alert("Не вдалося завантажити новини!");
            }
            console.log(e);
        } finally {
            dispatch(hidePreloader())            
        }
    }

    useEffect(() => {
        loadPosts(feedLink);        
    }, [feedLink])

    return (
        <div className={styles.postsFeed}>
            <h1>
                Стрічка найсвіжіших новин
            </h1>
            <h2 className="text-center">
                Слідкуйте на нашому сайті за найактуальнішими новинами світу
            </h2>

            {/* кнопки быстрой навигации по RSS лентам  */}
            <button className="py-2 px-4 bg-slate-100 rounded-md mx-3 hover:bg-slate-300 items-center"
                onClick={() => setFeedLink("https://www.radiosvoboda.org/api/zrqiteuuir")}
            >
                RadioSvoboda
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 inline-block ml-1 mb-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </button>
            <button className="py-2 px-4 bg-slate-100 rounded-md mx-3 hover:bg-slate-300 items-center"
                onClick={() => setFeedLink("https://www.techradar.com/rss/news/computing")
                }
            >
                RadarTech
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 inline-block ml-1 mb-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </button>
            <button className="py-2 px-4 bg-slate-100 rounded-md mx-3 hover:bg-slate-300 items-center"
                onClick={() => setFeedLink("https://static.censor.net/censornet/rss/rss_ru_events.xml")}
            >
                Цензор.Нет
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 inline-block ml-1 mb-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </button>
            <button className="py-2 px-4 bg-slate-100 rounded-md mx-3 hover:bg-slate-300 items-center"
                onClick={() => setFeedLink("https://tsn.ua/rss/full.rss")}
            >
                ТСН
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 inline-block ml-1 mb-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </button>
            <button className="py-2 px-4 bg-slate-100 rounded-md mx-3 hover:bg-slate-300 items-center"
                onClick={() => setFeedLink("https://www.dailystar.co.uk/sport/football/?service=rss")}
            >
                DailyStar
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 inline-block ml-1 mb-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </button>

            {isLoading &&
                <div className="p-3"><span className="preloader"></span></div>
            }

            {feedInfo.img && (
                <div className={styles.feedLogo}>
                    <a href={feedInfo.url} target='_blank' rel="noreferrer"><img
                        src={feedInfo.img}
                        className="Feed-logo h-full rounded-3xl"
                        alt="logo"
                    /></a>
                </div>
            )}

            <h1 className="text-3xl mt-4">{feedInfo.title}</h1>
            <h4 className="text-base mb-4">{feedInfo.date}</h4>
            <div className={styles.feedline}>                
                {posts.filter((item, i) => i < 25).map((item, i) => {
                    return (
                        <RssPost
                            index={i}
                            title={item.item.title.replaceAll("&quot;", "\"").replaceAll("&#039;", "'")}
                            link={item.item.link}
                            date={item.item.pubDate}
                            description={item.item.content.replaceAll("&quot;", "\"").replaceAll("&#039;", "'")}
                            category={item.item.categories || []}
                            image={item.item.enclosure?.url}
                            key={item.item.pubDate + i + i}
                        />
                    );
                }
                )}

            </div>
        </div>
    );
}

export default Feed