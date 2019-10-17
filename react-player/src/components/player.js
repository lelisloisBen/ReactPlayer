import React, { useState, useEffect } from 'react';

import './play.css';

const PlayControl = () => {

    const [datas, setDatas] = useState(null);
    const [myMusic, setMyMusic] = useState();
    const [currentSongNum, setCurrentSongNum] = useState(0);

    var songURL = "";

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

    const Getplay = (event) => {
          songURL = "https://assets.breatheco.de/apis/sound/"+event.target.dataset.url;
          //currentSongNum = event.target.dataset.songnum;
          setCurrentSongNum(event.target.dataset.songnum);
          //setCurrentSongNum(event.url);
          setMyMusic(new Audio(songURL));

    }
 //console.log("here samir "+currentSongNum);
   // console.log(myMusic);
   // console.log("num" + currentSongNum + songURL)

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
             let lastIndex = datas.length-1;
             songURL =  "https://assets.breatheco.de/apis/sound/"+ datas[lastIndex].url;
             console.log(songURL);
             setMyMusic(new Audio(songURL));
             PauseSong();
          }else{
             songURL =  "https://assets.breatheco.de/apis/sound/"+ datas[currentSongNum].url;
             setMyMusic(new Audio(songURL));
             PauseSong();
          }
          //console.log(currentSongNum);
    }
    //console.log("previous" + currentSongNum);

    const NextSong = () => {
          setCurrentSongNum(currentSongNum + 1);
          songURL =  "https://assets.breatheco.de/apis/sound/"+ datas[currentSongNum].url;
          setMyMusic(new Audio(songURL));
          PauseSong();
    }

    //console.log("next" + currentSongNum);

    useEffect(() => {
         LoadDatas()
    },[])

	return (
       <>
          <div className="boxbtn mx-outo">
            <button type="button" className="btn btn-outline-primary" onClick={PlaySong}>Play</button>
            <button type="button" className="btn btn-outline-danger" onClick={PauseSong}>Pause</button>
            <button type="button" className="btn btn-outline-secondary" onClick={PreviousSong}>Previous</button>
            <button type="button" className="btn btn-outline-success" onClick={NextSong}>Next</button>

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
