import React from 'react';

import WorkspaceRow from '../workspace-row';

import './workspace.css'

const Workspace = ({onClickBtn, handleKeyPress}) => {
    const rows = [
        ['C', '+/-', '%', '/'],
        [7, 8, 9, 'x'],
        [4, 5, 6, '-'],
        [1, 2, 3, '+'],
        [0, '.', '=']
    ]
    const workspaceRows = rows.map((row, index) => {
        return (
            <WorkspaceRow
                key={index}
                row={row}
                onClickBtn={onClickBtn}/>
        )
    })

    return (
        <div className='workspace'>
            <div className='workspace__inner'>
                {workspaceRows}
            </div>
        </div>
    )
}

export default Workspace;