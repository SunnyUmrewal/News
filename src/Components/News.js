import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps={
    country:'in',
    pageSize:8,
    category: 'general'
  }
  
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,

  };

  capitalizeFirstLetter = (string)=> {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
  }
    constructor(props){
    super(props);

    console.log("i am a constructor from news component");
      this.state={
        articles:[],
        loading: false,
        page:1
      }

      document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }


  async updateNews(){
const apiKey = process.env.REACT_APP_NEWS_API_KEY;

const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;    
    console.log(url);
    let data=await fetch(url);
    this.setState({loading:true});


    let parsedData= await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading:false
    })
  }


  async componentDidMount(){ //it will run after render method
    // console.log("cdm")

    // let url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=33f95ab4fa73453f9167e8eb5abfa17b&page=1&pageSize=${this.props.pageSize}`;
    
    // console.log(url);
    // let data=await fetch(url);
    // this.setState({loading:true});


    // let parsedData= await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles, 
    //   totalResults: parsedData.totalResults,
    //   loading:false
    // })

    this.updateNews();
  }

   handlePreviousClick=async()=>{
      // console.log("prev")
      //   let url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=33f95ab4fa73453f9167e8eb5abfa17b&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      //   let data=await fetch(url);
      //   this.setState({loading:true});

      //   let parsedData= await data.json();
      //   console.log(parsedData);
      //   this.setState({
      //     page:this.state.page-1,
      //     articles: parsedData.articles,
      //     loading:true
      //   })
      this.setState({page:this.state.page-1})
      this.updateNews();

  } 

  handleNextClick=async()=>{
  //   console.log("next")
  //   if(!(this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize))){


    
  //   let url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=33f95ab4fa73453f9167e8eb5abfa17b&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true});
  //   let data=await fetch(url);
  //   let parsedData= await data.json();
  //   this.setState({
  //     page:this.state.page+1,
  //     articles: parsedData.articles,
  //     loading:false


  //   })
  // }
  this.setState({page:this.state.page+1})
  this.updateNews();

  }



render() {
      console.log("render")

  return (
    <div className='containter my-3'>
      <h1 className="text-center" style={{margin: '35px'}}>NEWS - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
      {this.state.loading && <Spinner/>}

      <div className="row">
        {!this.state.loading && this.state.articles.map((element) => {
          return (
            <div className="col-md-4" key={element.url} >
              <NewsItem
                title={element.title?element.title.slice(0,45):""}
                description={element.description?element.description.slice(0,88):""}
                imgUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
              />
            </div>
          );
        })}
      </div>

      <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
      </div>
    </div>
  );
}
}

export default News;

