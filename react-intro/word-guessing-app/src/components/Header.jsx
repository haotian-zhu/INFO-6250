import React from 'react'

const Header = ({title}) => {
    return (
        <header>
            <h1>Word Guessing Game!</h1>
            <h2>{title}</h2>
        </header>
    )
}

export default Header
