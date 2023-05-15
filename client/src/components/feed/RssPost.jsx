import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdd } from "../../actions/post";

import styles from "../../styles/App.module.scss";

const RssPost = ({ index, title = "", link = "", date = "", description = "", category = '', image = "" }) => {

    //console.log(category.length);

    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.user.isAuth)

    const newPost = {
        title: title,
        link: link,
        date: date,
        description: description,
        image: image,
    };

    //const [added, setAdded] = useState(false);

    let formattedTime = { hour: "numeric", minute: "numeric" };
    let formattedData = { day: "numeric", month: "long", year: "numeric" };
    let postTime = new Date(date).toLocaleTimeString("uk-UA", formattedTime);
    let postDate = new Date(date).toLocaleDateString("uk-UA", formattedData);

    async function addPostHandler(post) {        
        dispatch(postAdd(title, description, date, link, image))

    }

  return (
    <div className="w-full border-b-2 border-t-2 shadow-lg bg-slate-50 shadow-gray-400 border-cyan-700 hover:border-orange-400 px-5 py-6 my-8 rounded-xl flex text-left relative">
      <div className="w-4/12 relative">
        <img src={image} className="pointer-events-none max-w-none w-full" alt="logo" />
        <img src={image} className="hover:animate-ping-once opacity-15 absolute top-0 max-w-none w-full" alt="logo" />
      </div>
      <div className="w-8/12 flex flex-col items-start pl-5">
        <div className="flex flex-row justify-between w-full"><p className="text-xs font-bold text-slate-400 hover:text-slate-500">
          {postTime}, {postDate}
        </p>
        <p className="text-xs font-bold text-slate-400 hover:text-slate-500">{category[0]}</p>
        </div>
        <h3 className="text-lg my-2 leading-5">
          <a className="underline hover:text-orange-500" href={link} target="_blank" rel="noreferrer">
            {title}
          </a>
        </h3>
        <p className="text-xs">{description}</p>
      </div>
      <div className="absolute bottom-1 right-6 w-6 flex">
        {isAuth &&
        <button onClick={() => addPostHandler(newPost)}          
          title="Зберегти цей пост в БД"
          className={styles.addPostBtn}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
          </svg>
        </button>      
        }  
      </div>
    </div>
  );
};

export default RssPost;
