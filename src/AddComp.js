import React from 'react';

export default function AddComp(props) {
    return (
        <div>
            <a href="#" onClick={() => { props.setListType(props.type) }}>Go back</a>
            <br />
            {props.type === 'todo' ?
                <div>Add a new todo</div>
                :
                <div>Add a new task</div>
            }
            <input type="text" required placeholder={`Enter ${props.type} name`} value={props.newItemName} onChange={(e) => {
                props.setItemName(e.target.value)
            }} />
            <button onClick={() => {
                if (props.newItemName !== '') {
                    props.addToList(props.operationType, props.newItemName, props.type, props.todoId)
                    props.setListType(props.type)
                }

            }}>{props.operationType === 'edit' ? 'UPDATE' : 'ADD'}</button>
        </div >
    )

}
