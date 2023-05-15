import axios from 'axios'
import {API_URL} from "../config";
import { hidePreloader, showPreloader } from '../reducers/appReducer';
import { setPosts, deletePost, setPostsCount, addPost } from '../reducers/postReducer';

// getPosts - получаем все посты из БД
export function getPosts(sort, page, limit) {
  return async (dispatch) => {
    try {
      dispatch(showPreloader());
      dispatch(getPostsCount());

      let length;

      const response = await axios
        .get(`${API_URL}api/posts/all`, {
          params: { sort: sort, page: page, limit: limit },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(function (response) {
          dispatch(setPosts(response.data));
          length = response.data.length;
        });

      // Если мы удалили все посты на текущей странице - переходим на предыдущую
      if (page > 1 && length === 0) {
        const PrevPage = page - 1;
        //alert('Попробуем поискать что-то на предудущей странице' + PrevPage )
        const response = await axios
          .get(`${API_URL}api/posts/all`, {
            params: { sort: sort, page: PrevPage, limit: limit },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(function (response) {
            dispatch(setPosts(response.data));
          });
      }
    } catch (e) {
      if (e.response?.status === 404) {
        alert("Не вдалося загрузити новини!");
      }
      //console.log(e.response.data.message);
      console.log(e);
    } finally {
      dispatch(hidePreloader());
    }
  };
}

// getPostCount - получаем количество постов
export function getPostsCount(){        
    return async dispatch => {
        try {
            dispatch(showPreloader())
            
            const response = await axios.get(`${API_URL}api/posts/count`, {                
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }).then(function(response){                                        
                    
                    dispatch(setPostsCount(response.data))
                    //console.log(response.data);
            })              

        } catch (e) {
            if (e.response?.status === 404) {
                alert("Не вдалося завантажити кількість новин!");
            }
            //console.log(e.response.data.message);
            console.log(e);
        } finally {
            dispatch(hidePreloader()) 
        }
    }
}

// searchPosts - поиск фильтр постов в БД
export function searchPosts(search) {
    return async dispatch => {
        try {
            dispatch(showPreloader());

            const response = await axios.get(`${API_URL}api/posts/search?search=${search}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            
            dispatch(setPosts(response.data))
            //console.log(response.data);
            //alert(response.data.message)
            
        } catch (e) {
            console.log(e.response.data.message)            
        } finally {
            dispatch(hidePreloader())
        }
    }
}

// postAdd - добавление нового поста в БД
export function postAdd(title, description, pubDate = 0, link, image){    

    return async dispatch => {
        try {
            dispatch(showPreloader()) 

            const params = { title, description, pubDate, link, image };

            const response = await axios.post(`${API_URL}api/posts/add`, params, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
            });

            if (response?.status === 200) {
                //console.log(response.data.post);
                dispatch(addPost(response.data.post))
                dispatch(getPostsCount())
                alert("Пост успішно додано!");        
            }            
            
        } catch (e) {
            if (e.response?.status === 404) {
                alert("Не вдалося додати новий пост!");
            }
            //console.log(e.response.data.message);
            console.log(e);
        } finally {
            dispatch(hidePreloader()) 
        }
    }
}

// postUpdate - обновление поста в БД
export function postUpdate(id, title, description, pubDate = 0, link, image){    
    return async dispatch => {
        try {
            dispatch(showPreloader()) 

            const params = {id, title, description, pubDate, link, image };

            const response = await axios.post(`${API_URL}api/posts/update`, params, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
            });

            if (response?.status === 200) {
                //console.log(response.data.post);                
                dispatch(getPostsCount())
                //alert("Пост успішно оновлено!");        
            }            
            
        } catch (e) {
            if (e.response?.status === 404) {
                alert("Не вдалося оновити цей пост!");
            }
            //console.log(e.response.data.message);
            console.log(e);
        } finally {
            dispatch(hidePreloader()) 
        }
    }
}

// postDelete - удаление поста из БД
export function postDelete(id) {
  return async (dispatch) => {
    try {
      dispatch(showPreloader());
      //const params = { post_id: id };

      await axios
        .delete(`${API_URL}api/posts/delete?id=${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(function (response) {
          if (response?.status === 200) {
            //console.log(response.data);
            //alert("Пост успішно видалено!");
            dispatch(deletePost(id))            
          }
        });

    } catch (e) {
      if (e.response?.status === 404) {
        alert("Не вдалося видалити пост!");
      }
      console.log(e);
    } finally {
      dispatch(hidePreloader());
    }    
  };
}


