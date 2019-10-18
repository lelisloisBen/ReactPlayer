import React, { useState, useEffect } from 'react';

import './play.css';

const PlayControl = () => {

    const [data, setData] = useState(null);
    const [myMusic, setMyMusic] = useState();
    const [myMusicName, setMyMusicName] = useState();
    const [currentSongNum, setCurrentSongNum] = useState(0);

    var songURL = "";

    const LoadData = () => {
     fetch('https://assets.breatheco.de/apis/sound/songs')
        .then(function(response) {
            if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
        })
        .then(function(responseAsJson) {
            setData(responseAsJson);
        })
        .catch(function(error) {
            console.log('Looks like there was a problem: \n', error);
        });
    }

    const Getplay = (event) => {
        songURL = "https://assets.breatheco.de/apis/sound/"+event.target.dataset.url;
        setCurrentSongNum(event.target.dataset.songnum);
        setMyMusic(new Audio(songURL));
        setMyMusicName(event.target.dataset.name);
    }
    const PlaySong = () => {
        myMusic.pause();
        myMusic.currentTime = 0;
        myMusic.play();
    }
    const PauseSong = () => {
        myMusic.pause();
        myMusic.currentTime = 0;
        myMusic.pause();
    }
    const PreviousSong = () => {
          setCurrentSongNum(currentSongNum - 1);
          if (currentSongNum === 0) {
             let lastIndex = data.length-1;
             songURL =  "https://assets.breatheco.de/apis/sound/"+ data[lastIndex].url;
             setCurrentSongNum(lastIndex);
             setMyMusic(new Audio(songURL));
             setMyMusicName(data[lastIndex].name);
             PauseSong();
          }else{
             songURL =  "https://assets.breatheco.de/apis/sound/"+ data[currentSongNum].url;
             setMyMusic(new Audio(songURL));
             setMyMusicName(data[currentSongNum].name);
             PauseSong();
          }
    }
    const NextSong = () => {
          setCurrentSongNum(currentSongNum + 1);
          if (currentSongNum < data.length - 1 ) {
              songURL =  "https://assets.breatheco.de/apis/sound/"+ data[currentSongNum].url;
              setMyMusic(new Audio(songURL));
              setMyMusicName(data[currentSongNum].name);
              PauseSong();
          }else{
              let firstindex = 1;
              songURL =  "https://assets.breatheco.de/apis/sound/"+ data[firstindex].url;
              setMyMusic(new Audio(songURL));
              setMyMusicName(data[firstindex].name);
              PauseSong();
          }
    }
    useEffect(() => {
         LoadData()
    },[myMusic]);
	return (
       <>
        <div className="boxbtn mx-outo text-center">
            <button type="button" className="btn btn-outline-primary m-3" onClick={PlaySong}>Play</button>
            <button type="button" className="btn btn-outline-danger m-3" onClick={PauseSong}>Pause</button>
            <button type="button" className="btn btn-outline-secondary m-3" onClick={PreviousSong}>Previous</button>
            <button type="button" className="btn btn-outline-success m-3" onClick={NextSong}>Next</button>
        </div>
        <div className="container">
            <div class="alert alert-primary my-3" role="alert">
                {myMusicName}
            </div>
            <div>
                <ol className="list-group">
                    { !data ? ("Loading...") : data.map(( item, index) => {
                        return (
                            <li
                                key={index}
                                className="list-group-item clickme"
                                onClick={Getplay}
                                data-name={item.name}
                                data-url={item.url}
                                data-songnum={index}
                            >
                                {index + 1} - {item.name} - URL = {item.url}
                            </li>
                        )

                    } ) }
                </ol>
            </div>
        </div>
      </>
	);

};

export default PlayControl;
