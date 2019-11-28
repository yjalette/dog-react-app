import React from 'react';
import {Link} from 'react-router-dom';

const Article = ({ article }) => {
    console.log(article)
    return (
        <div className="card">
            <div>
                <img src={article.urlToImage} alt="Avatar" className="card_img_news" />
            </div>
            <h5 className="title">{article.title}</h5>
            <p>{article.description.slice(0, 150)}...</p>
            <button><a href={article.url} style={{color: 'white'}}>read more</a></button>
        </div>
    )
}

export default Article
