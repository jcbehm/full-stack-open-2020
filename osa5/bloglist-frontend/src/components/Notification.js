import React from 'react'

const Notification = ({ message }) => {
    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === null) {
        return null
    }

    if (message.split(" ")[0] === 'error:') {
        return (
            <div style={errorStyle}>
                {message.substring(7)}
            </div>
        )
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification