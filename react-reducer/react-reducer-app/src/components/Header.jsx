import React from 'react'

const Header = ({title}) => {
    return (
        <header>
            <h1>To Do List</h1>
            <h2>{title}</h2>
        </header>
    )
}

export default Header
