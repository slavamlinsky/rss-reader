import React, { useState } from 'react'
import { postDelete } from '../../actions/post';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from "../../styles/App.module.scss";

const Post = ({id, title="", link="", date="", description="", image=""}) => {  

  //const [added, setAdded] = useState(false)
  const post = {id, title, link, date, description, image}

  const dispatch = useDispatch()

  let formattedTime = {hour: "numeric", minute: "numeric"}  
  let formattedData = {day: "numeric", month: "long", year: "numeric"}  
  let postTime = new Date(date).toLocaleTimeString("uk-UA", formattedTime);  
  let postDate = new Date(date).toLocaleDateString("uk-UA", formattedData);

//   function editPostHandler(id){
//     alert("Редактировать пост №" + id);
//     console.log(post);
//   }

  async function deletePostHandler(id) {
    if (window.confirm("Бажаєте видалити цей пост?")) {      
      //alert("Удаляем пост " + id);
      dispatch(postDelete(id)) 

    }
  }
    
  return (
    <div className={styles.onePost}>
        <div className='w-full md:w-4/12 relative'>
            <img src={image} className="pointer-events-none max-w-none w-full rounded-t-xl md:rounded-t-none" alt="logo" />
            <img src={image} className="hover:animate-ping-once opacity-0 md:opacity-5 absolute top-0 max-w-none w-full" alt="logo" />
        </div>        
        <div className='w-full md:w-8/12 flex flex-col items-start pl-0 mt-2 md:mt-0 md:pl-5'>
            <p className='text-xs font-bold text-slate-400 hover:text-slate-500'>{postTime}, {postDate}</p> 
              <a className="text-base md:text-lg my-2 md:leading-6 leading-5 underline hover:text-orange-500" href={link} target='_blank' rel='noreferrer'>{title}</a>            
            <p className='text-xs'>{description}</p>               
        </div>
        <div className='absolute bottom-1 right-12 w-14 flex'>            
            {/* <NavLink to='/news/edit' post={post} onClick={() => editPostHandler(id)} ></NavLink> */}
            <Link to='/news/edit' state={post} 
                //href={'/posts/'+ index}
                title='Редагувати пост' 
                className={styles.addPostBtn}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>   
            </Link>
            <button onClick={() => deletePostHandler(id)} 
                title='Видалити пост' 
                className={styles.addPostBtn}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg> 
            </button>
        </div>        
    </div>
  )
}

export default Post