import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { postAdd } from '../../actions/post';
import styles from "../../styles/App.module.scss";

const AddNew = () => {

    const dispatch = useDispatch()

    let date = Date(Date.now())
    let formattedTime = {hour: "numeric", minute: "numeric"}  
    let formattedData = {day: "numeric", month: "long", year: "numeric"}  
    let postTime = new Date(date).toLocaleTimeString("uk-UA", formattedTime);
    let postDate = new Date(date).toLocaleDateString("uk-UA", formattedData);

    const [title, setTitle] = useState("")
    const [pubDate, setPubDate] = useState(postTime + ', ' + postDate)
    const [link, setLink] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")

    const [added, setAdded] = useState(false)

    function resetForm(){
        setTitle("")
        setLink("")
        setImage("")
        setPubDate(postTime + ', ' + postDate)
        setDescription("")
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
            dispatch(postAdd(title, description, "" , link, image))           
            setAdded(true)           
        }    
    }

    function addOneMore(){
        resetForm()
        setAdded(false)
    }

  return (
    <div className={styles.addNew} >
        <h1 className='text-center text-xl md:text-3xl my-5'>Сторінка додавання нової публікації</h1>        
        
        {!added && 
        <>
        <h3 className='text-center text-lg md:text-2xl my-4'>Заповнюйте форму</h3>
        <div className={styles.addPostForm}>
            <label>Назва новини (Title)
                <input type='text' placeholder='Заголовок' value={title} onChange={(e) => setTitle(e.target.value)} />
                <div id="titleError" className={styles.addPostErrorMessage}> </div>
            </label>
            <label>Дата публікації (PubDate)
                <input type='text' placeholder='Час публікації' value={pubDate} onChange={(e) => setPubDate(e.target.value)} />
            </label>
            <label>Посилання (Link)
                <input type='text' placeholder='url-адреса детальної новини' value={link} onChange={(e) => setLink(e.target.value)} />
                <div id="linkError" className={styles.addPostErrorMessage}> </div>
            </label>
            <label>Зображення (Image)
                <input type='text' placeholder='url-посилання на зображення' value={image} onChange={(e) => setImage(e.target.value)} />
            </label>
            <label>Повідомлення (Description)
                <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <div id="descriptionError" className={styles.addPostErrorMessage}> </div>
            </label>
            
            <div className='flex justify-around items-center mt-3'>
                <button onClick={resetForm} className='bg-slate-400 hover:bg-slate-200  rounded-xl px-3 py-1 h-10 hover:shadow-lg'>Скинути</button>
                <button onClick={sendForm} className='bg-teal-500 rounded-xl px-5 py-3 hover:bg-teal-400 hover:shadow-lg'>Додати новину в БД</button>
            </div>
        </div>
        </>       
        }
        {added && 
        <>
        <br></br><br></br>
        <div className={styles.addPostForm}>
            <h3 className='text-2xl text-white mb-4 text-center'>Новина додана успішно</h3>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 m-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg> 
            <button onClick={addOneMore} className='rounded-xl bg-teal-300 px-3 py-2 hover:bg-teal-400 mt-8 mb-2 w-60 m-auto cursor-pointer'> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 inline-block mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Додати ще одну новину
            </button>
            <br></br>
            <small className='text-white text-center'>Або можете прямо зараз <NavLink to='/news' className='underline'>подивитись всі новини</NavLink>.</small>
        </div>
        </>
        }
         
    </div>
  )
}

export default AddNew
