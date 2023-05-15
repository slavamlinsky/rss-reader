import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { postUpdate } from '../../actions/post';
import { useDispatch } from 'react-redux';

import styles from "../../styles/App.module.scss";

const EditNews = () => {

    const dispatch = useDispatch()

    const location = useLocation();
    const post = location.state;
    
    let date = post.date
    let formattedTime = {hour: "numeric", minute: "numeric"}  
    let formattedData = {day: "numeric", month: "long", year: "numeric"}  
    let postTime = new Date(date).toLocaleTimeString("uk-UA", formattedTime);
    let postDate = new Date(date).toLocaleDateString("uk-UA", formattedData);

    const [title, setTitle] = useState(post.title)
    const [pubDate, setPubDate] = useState(postTime + ', ' + postDate)
    const [link, setLink] = useState(post.link)
    const [image, setImage] = useState(post.image)
    const [description, setDescription] = useState(post.description.trim())

    const [updated, setUpdated] = useState(false)

    function resetForm(){
        setTitle(post.title)
        setLink(post.link)
        setImage(post.image)
        setPubDate(postTime + ', ' + postDate)
        setDescription(post.description)
    }

    function sendForm(){   
        
        if(!title){            
            document.querySelector("#titleError").innerHTML="Title не може бути пустим"
            setTimeout(() => {
              document.querySelector("#titleError").innerHTML=""              
            }, 3500);            
        }

        if(!link){            
            document.querySelector("#linkError").innerHTML="Link не може бути пустим"
            setTimeout(() => {
              document.querySelector("#linkError").innerHTML=""              
            }, 3500);            
        }

        if(!description){            
            document.querySelector("#descriptionError").innerHTML="Description не може бути пустим"
            setTimeout(() => {
              document.querySelector("#descriptionError").innerHTML=""              
            }, 3500);            
        }
        
        if (title && link && description) {
            dispatch(postUpdate(post.id, title, description, post.date, link, image ))  
            setUpdated(true)        
        }    
    }  

  return (
    <div className={styles.addNew} >
        <h1 className='text-center text-xl md:text-3xl my-5'>Сторінка редагування публікації</h1>        
        <div className={styles.addPostForm}>
        {!updated && 
        <>
            <label>Назва новини (Title)
                <input type='text' placeholder='Заголовок' value={title} onChange={(e) => setTitle(e.target.value)} />
                <div id="titleError" className={styles.addPostErrorMessage}></div>
            </label>
            <label>Дата публікації (PubDate)
                <input type='text' placeholder='Час публікації' value={pubDate} onChange={(e) => setPubDate(e.target.value)} />
            </label>
            <label>Посилання (Link)
                <input type='text' placeholder='url-адреса детальної новини' value={link} onChange={(e) => setLink(e.target.value)} />
                <div id="linkError" className={styles.addPostErrorMessage}> </div>
            </label>
            <label>Повідомлення (Description)
                <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <div id="descriptionError" className={styles.addPostErrorMessage}> </div>
            </label>
            <label className={styles.editNewsLabelImage}>
                <span className='relative'>Зображення (Image) 
                <strong className='ml-8 text-sm cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />                
                </svg> переглянути
                {image && (
                <div>
                    <img
                    src={image}
                    className="rounded-xl" 
                    alt='news'                   
                    />
                </div>)}
                </strong>                
                </span>
                <input type='text' placeholder='url-посилання на зображення' value={image} onChange={(e) => setImage(e.target.value)} />                
            </label>           
            
            <div className='flex justify-around items-center mt-3'>
                <button onClick={resetForm} className='bg-slate-400 hover:bg-slate-200  rounded-xl px-3 py-1 h-10 hover:shadow-lg'>Скинути</button>
                <button onClick={sendForm} className='bg-teal-500 rounded-xl px-8 py-3 hover:bg-teal-400 hover:shadow-lg'>Зберегти новину</button>
            </div>
        </>       
        }
        {updated && 
        <div className='mt-4 text-center pb-4'>
            <h3 className='text-2xl text-white mb-6 text-center'>Новина оновлена успішно</h3>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 m-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>            
            <br></br>
            <small className='text-white text-center'>Можете повернутись і <NavLink to='/news' className='underline'>подивитись всі новини</NavLink>.</small>
        </div>
        }
         </div>
    </div>
    
  )
}

export default EditNews