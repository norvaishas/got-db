import React from 'react';
import './header.css'

const Header = () => {
    return (
      <header className={'header-block'}>
          <h1 className={'header-title'}>
              <a href="#">
                  Game of Thrones DB
              </a>
          </h1>
          <ul className={'header-links'}>
              <li>
                  <a href="#">Characters</a>
              </li>
              <li>
                  <a href="#">Houses</a>
              </li>
              <li>
                  <a href="#">Books</a>
              </li>
          </ul>
      </header>
    )
}

export default Header;