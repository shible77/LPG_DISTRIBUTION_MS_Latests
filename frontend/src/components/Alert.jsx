import React from 'react'

function Alert(props) {
    return (
        <div  style={{height: '0px'}}>
            <div className={`alert alert-${props.type} fade show`} role="alert">
                <strong>{`${props.message}`}</strong>
            </div>
        </div>
    )
}

export default Alert
