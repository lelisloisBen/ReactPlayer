import React, { useState, useEffect } from 'react';

import './play.css';

const PlayControl = () => {

    const [datas, setDatas] = useState(null);
    const [myMusic, setMyMusic] = useState();

    var songURL = "";
    var currentSongNum = 0;

    const LoadDatas = () => {
     fetch('https://assets.breatheco.de/apis/sound/songs')
        .then(function(response) {
            if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
        })
        .then(function(responseAsJson) {
            setDatas(responseAsJson);
            //console.log(responseAsJson);
        })
        .catch(function(error) {
            console.log('Looks like there was a problem: \n', error);
        });
    }

    const Getplay = (e) => {
          songURL = "https://assets.breatheco.de/apis/sound/"+e.target.dataset.url;
          currentSongNum = e.target.dataset.songnum;
          setMyMusic(new Audio(songURL));
          console.log(currentSongNum)
    }

   // console.log(myMusic);
   // console.log("num" + currentSongNum + songURL)

    const PlaySong = () => {
          myMusic.play();

    }
    const PauseSong = () => {
          myMusic.pause();
    }
    const PreviousSong = () => {
          myMusic.play();
    }


    useEffect(() => {
         LoadDatas()
    },[])

	return (
       <>
          <div className="boxbtn mx-outo">
            <button type="button" className="btn btn-outline-primary" onClick={PlaySong}>Play</button>
            <button type="button" className="btn btn-outline-danger" onClick={PauseSong}>Pause</button>
            <button type="button" className="btn btn-outline-secondary" onClick={PreviousSong}>Previous</button>
            <button type="button" className="btn btn-outline-success">Next</button>

          </div>
          <div>
            <ol className="list-group">
            { !datas ? ("Loading...") : datas.map(( item, index) => {
                return (
                    <li
                        key={index}
                        className="list-group-item clickme"
                        onClick={Getplay}
                        data-url={item.url}
                        data-songnum={index}
                    >
                        {index + 1} - {item.name} - URL = {item.url}
                    </li>
                )

            } ) }
            </ol>
          </div>
      </>
	);

};

export default PlayControl;
