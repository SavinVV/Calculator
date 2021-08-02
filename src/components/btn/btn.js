import React from 'react';

import './btn.css'

const Btn = (props) => {

    const val = props.val;
    let color = 'blue';
    if (['C', '+/-', '%'].indexOf(val) > -1) {
        color = 'silver'
    } else if (['/', '+', '-', 'x'].indexOf(val) > -1) {
        color = 'purple'
    } else if (val === '=') {
        color = 'green'
    } else if (val === 0) {
        color = 'big'
    }
    return (
        <button 
            key={val} 
            className={color}
            onClick={props.onClickBtn}>{val}</button>
    )
}

export default Btn;
