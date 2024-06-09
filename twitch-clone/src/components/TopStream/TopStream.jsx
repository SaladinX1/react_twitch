import React, {useEffect, useState} from 'react'
import api from '../../api'

export default function TopStream() {

  const [channels, setChannels] = useState([]);


  useEffect(() => {

    const fetchData = async () => {

      const result = await api.get("https://api.twitch.tv/helix/streams");

      let dataArray = result.data.data;

      console.log(dataArray);

      let gameIDs = dataArray.map(stream => {
        return stream.game_id
      })

      let userIDs = dataArray.map(stream => {
        return stream.user_id;
      })

      console.log(gameIDs, userIDs);


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

          let newUrl = stream.thumbnail_url
          .replace("{width}","320")
          .replace("{height}","180");
          stream.thumbnail_url = newUrl;
          return stream;
       })

       setChannels(finalArray);

    }

    fetchData()

  }, [])



  return (
    <div>

      <h1 className='titreGames'>Stream les plus populaires</h1>

        <div className='flexAccueil'>

          {channels.map((channel, index) => (

              <div key={index} className='carteStream'>

                  <img src={channel.thumbnail_url} alt="jeu" className='imgCarte'/>

                  <div className='cardBodyStream'>

                      <h5 className='titreCartesStream'>{channel.user_name}</h5>

                      <p className='txtStream'>Jeu : {channel.gameName}</p>

                      <p className='txtStream viewers'> Viewers : {channel.viewer_count}</p>

                      <div className='btnCarte'>Regarder {channel.user_name}</div>
                      

                  </div>
                

              </div>

          ))}

        </div>
     

     </div>
  )
}
