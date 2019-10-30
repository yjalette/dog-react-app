import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Grid from '../grid/Grid';
import Article from './Article';

const GetNews = () => {
    const [state, setState] = useState({articles: []});

    useEffect(() => {
        axios
        .get('https://newsapi.org/v2/everything?q=dog&apiKey=291c49589a7544e48fce12657ed4f64a')
        .then(res => {
            console.log(res)
            setState({
                articles: res.data.articles
            })
            
        })
    }, [])
    return (
        <div className="grid">
          {state.articles.slice(9).map( article => <Article article={article} key={article.title}/>)}  
        </div>
    )
}

export default GetNews