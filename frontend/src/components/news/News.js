import React from 'react'
import GetNews from './GetNews';
import picture from '../../images/wall-murals-dog-bringing-newspaper.jpg';

const News = () => {
    return (
        <div className="wrapper">
            <div className="wrapper-header">
                <img alt="news-heroimage" className="news-heroimage" src={picture} />
                <div>
                    <h1>Daily Dog News</h1>
                </div>
            </div>
            <div className="grid-form-wrapper">
                <GetNews />
            </div>
        </div>
    )
}

export default News
