import React, {useState, useEffect} from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import api from '../../api'

export default function GameStreams() {

    let location = useLocation();
    let {slug} = useParams();
    console.log(location.pathname.slice(21, location.pathname.length));
  
    const [streamData, setStreamData] = useState([]);
    const [viewers, setViewers] = useState(0)
// location.pathname.slice(21, location.pathname.length)  
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`);
            console.log(result);
            let dataArray = result.data.data;

            let finalArray = dataArray.map(stream => {
            let newUrl = stream.thumbnail_url
            .replace('{width}','320')
            .replace('{height}', "180");
            stream.thumbnail_url = newUrl;
            return stream;
            });

            // calcul du total des viewers
            let totalViewers = finalArray.reduce((acc, val) => {
                return acc + val.viewer_count;
            }, 0)

            let userIDs = dataArray.map(stream => {
                return stream.user_id;
            })

            let baseUrl = "https://api.twitch.tv/helix/users?"

            let queryParamsUsers = "";

            userIDs.map(id => {
                return (queryParamsUsers = queryParamsUsers + `id=${id}&`)
            })
            let finalUrl = baseUrl + queryParamsUsers;

            let getUsersLogin = await api.get(finalUrl);
            let userLoginArray = getUsersLogin.data.data;

            finalArray = dataArray.map(stream => {

                stream.login = "";

                userLoginArray.forEach(login => {
                    if(stream.user_id === login.id) {
                        stream.login = login.login;
                    }
                })

                return stream;
            })

        fetchData(totalViewers);
        setStreamData(finalArray)
        }

        fetchData();
        
            console.log(viewers);
            console.log(streamData);

    }, [])

    return (
    <div>
       <h1 className="tritreGamesStreams">Streams : {slug}</h1>
       <h3 className='sousTitreGameStreams'>
            <strong className='textColored'>{viewers}</strong>
       </h3>

       <div className='flexAcceuil'>

            {(streamData && viewers) && streamData.map((stream, index) => {

                <div className='carteGameStreams' key={index}>

                    <img src={stream.thumbnail_url} alt="jeu carte img" className='imgCarte' />

                    <div className='cardBodyGameStreams'>

                        <h5 className='titreCartesStream'>{stream.user_name}</h5>
                        <p className='txtStream'>Nombre de viewers: {stream.viewer_count}</p>

                        <Link className='lien' to={{
                            pathname: `/live/${stream.login}`
                        }}>
                            <div className='btnCarte'>Regarder {stream.user_name}</div>
                        </Link>


                    </div>

                </div>

            })}

       </div>

    </div>
  )
}
