import React from 'react';
import style from './descriptionBox.module.css';


const DescriptionBox = (props) => {
    const { description } = props;
    return (
        <div className={style.description}>
            <h1>{description}</h1>
        </div>
    )
}

export default DescriptionBox