import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        
        let {title,description, imgUrl, newsUrl, author, date} = this.props;   //read intro

    return (
      <div className="my-3">
        
            <div  className="card">
            <img src={!imgUrl?"https://www.aljazeera.com/wp-content/uploads/2026/07/2026-07-03T223244Z_1340742998_UP1EM731QMIPH_RTRMADP_3_SOCCER-WORLDCUP-ARG-CPV-1783118040.jpg?resize=1920%2C1440":imgUrl}  className="card-img-top" alt="..."/>
            <div  className="card-body" >
              
                <h5  className="card-title">{title}...</h5>
                <p  className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {!author?"Unknown": author} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>

            </div>
            </div>
      </div>
    )
  }
}
 
export default NewsItem
