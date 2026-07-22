import React from 'react'
import image from './imgNotAvailable.jpg'

const NewsItem = (props) => {
        
        let {title,description, imgUrl, newsUrl, author, date} = props;   //read intro

    return (
      <div className="my-3">
        
            <div  className="card">
            <img
              src={imgUrl ? imgUrl : image}
              className="card-img-top"
              alt="News"
            />
            <div  className="card-body" >
              
                <h5  className="card-title">{title}...</h5>
                <p  className="card-text">{description}...</p>
                <p className="card-text "><small className="text-muted">By {!author?"Unknown": author} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>

            </div>
            </div>
      </div>
    )
  
}
 
export default NewsItem
