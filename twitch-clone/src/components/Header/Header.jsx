import React, {useState, useEffect} from 'react'
import logo from './logo_twitch.png'
import search from './loop.png'
import menuIco from './menu.png'
import cross from './cross.png'

import { Link } from 'react-router-dom'

export default function Header() {

  const [menu, showMenu] = useState(false)
  const [smallScreen, setSmallScreen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {

    const mediaQuery = window.matchMedia("(max-width: 900px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    }

  }, [])

  const handleMediaQueryChange = mediaQuery => {
    if(mediaQuery.matches) {
      setSmallScreen(true);
    }else {
      setSmallScreen(false);
    }
  }

  const toggleNavRes = () => {
    showMenu(!menu);
  } 

  const hideMenu = () => {
    if(menu === true) {
      showMenu(!menu);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleKeyPress = (e => {
    setSearchInput(e.target.value)
  })

  return (
    <div>
        <nav className='headerTop'>
              {(menu || !smallScreen) && (
                
                <ul className='listeMenu'>

              <li onClick={hideMenu} className='liensNav'>
                  <Link to="/" className='lien'>
                    <img src={logo} alt="logo twitch" className='logo' />
                  </Link>
              </li>
              <li onClick={hideMenu} className="liensNav">
                <Link className='lien' to="/">
                  Top Games
                </Link>
              </li>
              <li onClick={hideMenu} className="liensNav">
                <Link to="/top-streams" className='lien'>
                    Top Streams
                </Link>
              </li>
              <li className="liensNav">
                  <form className='formSubmit' onSubmit={handleSubmit}>

                    <input required value={searchInput} onChange={(e) => handleKeyPress(e)} type="text" className='inputRecherche' />
                <Link className='lien' to={{pathname: `/resultats/${searchInput}`}}>
                    <button type='submit' >
                      <img src={search} alt="icone loupe" className='logoLoupe' />
                    </button>
                </Link>

                  </form>
              </li>

            </ul>

            )}

        </nav>

        <div className="menuResBtn">
          <img onClick={toggleNavRes} src={!menu ? menuIco : cross} alt="icone menu responsive" />
        </div>

    </div>
  )
}
