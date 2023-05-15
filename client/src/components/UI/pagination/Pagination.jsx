import { getPagesArray } from '../../../utils/page';

const Pagination = ({totalPages, page, changePage}) => {     
    let pagesArray = getPagesArray(totalPages);
    //let pagesArray = [1,2,3,4,5,6];
    //let page=4
    return (
    <div className='page__wrapper'>
      {pagesArray.map(p => 
        <span 
          onClick={() => changePage(p)}
          key={p} 
          className={page===p ? 'page page__current' : 'page'}
          >{p}</span>
      )}           
      </div> 
  )
}

export default Pagination;