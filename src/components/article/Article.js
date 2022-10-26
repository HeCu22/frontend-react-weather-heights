import React from 'react';
import './Article.css';

function Article({description, image, title,tag}) {
    return (
        <article className="card">
            <span className="tag">{tag}</span>
            <div className="pictures">
            <span className="small-picture-span">
                <img className="small-picture-img" src={image} alt={title} />
            </span>
        </div>
            <p><span>{description}</span></p>
        <p>{title}</p>
        </article>
    );
}

export default Article;