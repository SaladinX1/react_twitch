import React, {useState, useEffect} from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'

export default function Sidebar() {

  const [topStreams, setTopStreams] = useState([])

  useEffect(() => {

    const fetchData = async () => {

      const result = await api.get("https://api.twitch.tv/helix/streams");

      let dataArray = result.data.data;


      let gameIDs = dataArray.map(stream => {
        return stream.game_id
      })

      let userIDs = dataArray.map(stream => {
        return stream.user_id;
      })



      let baseUrlGames = "https://api.twitch.tv/helix/games?"
      let baseUrlUsers = "https://api.twitch.tv/helix/users?"

      let queryParamsGames = "";
      let queryParamsUsers = "";

      gameIDs.map(id => {
        return (queryParamsGames = queryParamsGames + `id=${id}&`)
      })

      userIDs.map(id => {
        return (queryParamsUsers = queryParamsUsers + `id=${id}&`) 
      })

      // URL final 

      let urlFinalGames = baseUrlGames + queryParamsGames;
      let urlFinalusers = baseUrlUsers + queryParamsUsers;

      // appel 
      let gamesNames = await api.get(urlFinalGames);
      let getUsers = await api.get(urlFinalusers);

      let gamesNameArray = gamesNames.data.data;
      let arrayUsers = getUsers.data.data;

       // creation du tableau final 

       let finalArray = dataArray.map(stream =>{

        stream.gameName = "";
        stream.truePic = "";
        stream.login = "";

        gamesNameArray.forEach(name => {
          arrayUsers.forEach(user => {
            if(stream.user_id === user.id && stream.game_id === name.id) {

                stream.truePic = user.profile_image_url;
                stream.gameName = name.name;
                stream.login = user.login;

            }
          })
        })

          return stream;
       })

       setTopStreams(finalArray.slice(0,6));

    }

    fetchData()

  }, [])



  return (
    <div className='sidebar'>
        <h2 className='titreSidebar'>Chaînes recommandées</h2>
        <ul className='listeStream'>

          

          {topStreams.map((stream, index) => (

            <Link key={index} to={{pathname: `/live/${stream.login}`}} className='lien'>
                <li key={index} className='containerFlexSideBar'> 

                    <img src={stream.truePic} alt="logo user" className='profilePicRonde' />

                    <div className='streamUser'>{stream.user_name}</div>

                    <div className='viewerRight'>

                      <div className='pointRouge'></div>
                      <div>{stream.viewer_count}</div>

                    </div>


                    <div className='gameNameSidebar'>{stream.gameName}</div>

                </li>
            </Link>
          ))

          }

        </ul>
    </div>
  )
}
