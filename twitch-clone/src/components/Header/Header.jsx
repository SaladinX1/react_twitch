import React from 'react'
import logo from './logo_twitch.png'
import search from './loop.png'
import menuIco from './menu.png'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div>
        <nav className='headerTop'>

            <ul className='listeMenu'>

              <li className='liensNav'>
                  <Link to="/" className='lien'>
                    <img src={logo} alt="logo twitch" className='logo' />
                  </Link>
              </li>
              <li className="liensNav">
                <Link className='lien' to="/">
                  Top Games
                </Link>
              </li>
              <li className="liensNav">
                <Link to="/top-streams" className='lien'>
                    Top Streams
                </Link>
              </li>
              <li className="liensNav">
                  <form className='formSubmit'>

                    <input type="text" className='inputRecherche' />
                    <button type='submit' >
                      <img src={search} alt="icone loupe" className='logoLoupe' />
                    </button>

                  </form>
              </li>

            </ul>

        </nav>

        <div className="menuResBtn">
          <img src={menuIco} alt="icone menu responsive" />
        </div>

    </div>
  )
}
