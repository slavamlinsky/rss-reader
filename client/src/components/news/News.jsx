import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getPosts, searchPosts } from '../../actions/post';
import { getNewsEnding, getPagesEnding } from '../../utils/page';
import Post from './Post';
import Pagination from '../UI/pagination/Pagination';

import styles from "../../styles/App.module.scss";

const News = () => {
    
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.app.loader)
    const posts = useSelector(state => state.posts.posts)
    const totalCount = useSelector(state => state.posts.totalCount)
           
    const [sort, setSort] = useState("date")
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(15)
    const [totalPages, setTotalPages] = useState(1);  

    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)

    function PageCounter(totalCount, freshlimit){
        setTotalPages(Math.ceil(totalCount/freshlimit)); 
        if(totalPages !== Math.ceil(totalCount/freshlimit))
        {
            dispatch(getPosts(sort, page, freshlimit))
        }
        return Math.ceil(totalCount/freshlimit);        
    }

    function changeLimit(newLimit){
        //alert("CurrentLimit " + limit + "NewLimit " + newLimit) 
        if(newLimit >= totalCount && limit >= totalCount){ 
            //alert("Все влезут")
            setLimit(newLimit)
        }
        if(newLimit >= totalCount && limit < totalCount){ 
            alert("Тоже пересчитываем")
            setLimit(newLimit)
            //setTotalPages(totalCount, newLimit)
            setTotalPages(PageCounter(totalCount, newLimit))   
        }
        if(newLimit < totalCount){ 
            setLimit(newLimit)
            //alert("Все не влезут: Сейчас страниц -" + totalPages + " А нужно - " + PageCounter(totalCount, newLimit) + " А limit " + limit + " А fresh limit " + newLimit)
            //setLimit(newLimit)
            //alert("Counter " + PageCounter(totalCount, newLimit));
            setTotalPages(PageCounter(totalCount, newLimit))            
            //setTotalPages(totalCount, newLimit)            
            //alert("Пересчитаем и получим - " + totalPages + " страниц")
        }
    }

    const changePage = (page) => {
      setPage(page);      
    }

    function searchChangeHandler(e){
        setSearchName(e.target.value)  
        if(searchTimeout!==false){
            clearTimeout(searchTimeout)
        }        
        if(e.target.value!=="")
        {
            setSearchTimeout(setTimeout((value)=>{
                dispatch(searchPosts(value.toLowerCase()))            
            }, 150, e.target.value))  
            
        } else {
            dispatch(getPosts(sort, page, limit))
        }        
    }    

    // function editPostHandler(num) {
    //     alert("Редактировать пост №" + num.index);        
    // }    
    
    useEffect(() => {              
        PageCounter(totalCount, limit); 
        dispatch(getPosts(sort, page, limit))                
    }, [totalCount, sort, page])
  
  return (
    <div className={styles.postsFeed}>
        <h1 className='text-center text-3xl mt-4 mb-6'>Адміністрування стрічки новин з бази даних</h1>
        <div className='text-center flex justify-between w-11/12 md:w-10/12 lg:w-2/3 xl:w-3/5 m-auto items-center px-0'>
            <NavLink to='/news/add' className='rounded-xl bg-emerald-400 px-3 py-2 hover:bg-emerald-500'> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 inline-block mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Додати новину
            </NavLink>
            <div className='flex flex-row items-center'>            
            Фільтр (пошук): 
            <div className='relative' >                
                <input 
                value={searchName} 
                onChange={e => searchChangeHandler(e)} 
                // onFocusCapture={e => console.log("Searching...")}
                className='ml-1 pl-7 pr-24 rounded-lg py-1 outline-none border-b focus:border-b-teal-600 focus:border-b' 
                type="text" 
                placeholder="Введіть заголовок новини..."/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block absolute left-2 top-2 opacity-20">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />                    
                </svg>
            </div>
              
            </div>
        </div>
        <div className='text-center text-sm flex justify-between w-full md:w-10/12 lg:w-2/3 xl:w-3/5 m-auto items-center px-4 mt-12 mb-8'>
            <h4 className='text-center'>Усього: {totalCount} {getNewsEnding(totalCount)} ({totalPages} {getPagesEnding(totalPages)})</h4>
            <div className='relative'>            
              Показати по:            
              <select className='py-1 pl-1 ml-1 pr-1 mr-2 outline-none' value={limit} onChange={(e) => changeLimit(e.target.value)}>                
                  <option value="5">5шт</option>
                  <option value="10">10шт</option>
                  <option value="15">15шт</option>
                  <option value="25">25шт</option>
                  <option value="50">50шт</option>
              </select>   
              Сортувати:            
              <select className='py-1 pl-1 ml-1 pr-1 outline-none' value={sort} onChange={(e) => setSort(e.target.value)}>                
                  <option value="date">По даті</option>
                  <option value="title">По назві</option>
              </select>
            </div>
        </div>
        
        {isLoading &&       
          <div className="p-3"><span className="preloader"></span></div>
        }        

        {/* Загружаем новости из базы данных */}

        <div className={styles.feedline}>
          {posts.map((item, i) => {
            //console.log(i);            
              return (
                <Post
                  id={item._id}
                  title={item.title}
                  link={item.link}
                  date={item.pubDate}
                  description={item.description}
                  image={item.image}
                  key={item._id}
                />
              );            
          })}
        </div>
        {!searchName &&
        <>
            <div className='text-center text-sm flex justify-between w-full md:w-10/12 lg:w-2/3 xl:w-3/5 m-auto items-center px-4 mt-4'>
                <h4 className='text-center'>Усього: {totalCount} {getNewsEnding(totalCount)} ({totalPages} {getPagesEnding(totalPages)})</h4>
                <div className='relative'>            
                Показати по:            
                <select className='py-1 pl-1 ml-1 pr-1 mr-2 outline-none' value={limit} onChange={(e) => changeLimit(e.target.value)}>                
                    <option value="5">5шт</option>
                    <option value="10">10шт</option>
                    <option value="15">15шт</option>
                    <option value="25">25шт</option>
                    <option value="50">50шт</option>
                </select>   
                Сортувати:            
                <select className='py-1 pl-1 ml-1 pr-1 outline-none' value={sort} onChange={(e) => setSort(e.target.value)}>                
                    <option value="date">По даті</option>
                    <option value="title">По назві</option>
                </select>
                </div>
            </div>
            <Pagination 
                page={page}                 
                changePage={changePage} 
                totalPages={totalPages} 
            />
        </>
        }
    </div>
  )
}

export default News