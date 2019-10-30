import React from 'react'

const Article = ({ article }) => {
    console.log(article)
    return (
        <div className="card">
            <div>
                <img src={article.urlToImage} alt="Avatar" className="card_img" />
            </div>
            <h5 className="title">{article.title}</h5>
            <p>{article.description.slice(0, 150)}...</p>
            <button>read more</button>
        </div>
    )
}

export default Article
