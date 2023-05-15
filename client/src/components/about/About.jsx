import React from 'react'
import styles from "../../styles/App.module.scss";

const About = () => {
  return (
    <div className={styles.pageBack}>
        <h1 className='text-2xl md:text-3xl'>Огляд проекту RSS Reader</h1>
        {/* https://api.jobitt.com/api/images/17920 */}
        <h2 className={styles.company}>Тестове завдання для компанії <span><img src='https://api.jobitt.com/api/images/17920' className="h-10 rounded-3xl inline-block pr-1" />DevIT</span></h2>        
        <h4 className='text-center mb-8'>Виконав: Млинський Вячеслав (slavam<span className='hidden'>text</span>linsky@g****.com)</h4>        
        <div className='w-full px-8 md:w-4/5 m-auto'>
        <h3 className='text-xl font-bold text-center'>Parser RSS ленты + Admin UI</h3>
        <p><strong>Описание задачи</strong><br></br>
            1. Реализовать на NodeJS/<span className='text-slate-300'>Laravel</span> Parser RSS ленты +
            <br></br><small> * например, https://tsn.ua/rss/full.rss (можно выбрать любой на ваше усмотрение)</small> 
            <br></br>2. Обновляем раз в 30 минут по cron task (или с помощью worker будет плюсом). +
            <br></br>3. Новые публикации должны будут сохранены в БД в таблице 'posts'. +
            <br></br>4. Создать CRUD для Posts -- REST API <span className='font-normal text-slate-300'>(или GraphQL API)</span> +
            <br></br><p className='list-item ml-10'>Поиск, пагинация, сортировка, фильтрация !!! +</p>
            
            <br></br><strong>Создать Admin UI SPA (на выбор React/<span className='font-normal text-slate-300'>Vue/Angular2</span>)</strong> 
            <br></br>5. Управление записями в виде списка с пагинацией, возможностью сортировки и поиска. +
            <br></br>6. Должна быть реализована возможность создания, редактирования и удаления постов. +
            <br></br>7. Закрыть доступ к Admin UI с помощью <span className='text-slate-300'>HTTP Basic Auth</span> (плюсом будет реализовать JWT Auth).  +
            <br></br>8. Создать Public GitHub(Gitlab etc.) репозиторий. Выложить код. Выслать ссылку. +</p>
        </div>        
        
    </div>
  )
}

export default About