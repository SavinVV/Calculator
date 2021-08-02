import React from 'react';

import Btn from '../btn/btn';

import './workspace-row.css';

const WorkspaceRow = ({row, onClickBtn}) => {
    const btns = row.map(item => {
        return (
            <Btn
                key={item}
                val={item}
                onClickBtn={() => onClickBtn(item)}/>
        )
    })

    return (
        <div className='row'>
            {btns}
        </div>
    )
}

export default WorkspaceRow;