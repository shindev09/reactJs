import React from 'react'
import logo from "../../assets/images/logo-is.png"
import './Header.scss'

export default function Header() {
    return (
        <header className="header">
            <a href="https://community.algolia.com/instantsearch.js/" className="header-logo">
                <img src={logo} alt="logo" />
                <span>amazing</span>
            </a>
            <div className="header-input-search">
                <div className="input-form">
                    <input type="text" placeholder="Search a product" />
                </div>
                <span className="icon-search">
                    <i className="fa fa-search"></i>
                </span>
            </div>
        </header>
    )
}
