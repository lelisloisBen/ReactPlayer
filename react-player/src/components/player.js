import React, { useState, useEffect } from 'react';

import './play.css';

const PlayControl = () => {

    const [data, setData] = useState(null);
    const [myMusic, setMyMusic] = useState();
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
            //console.log(responseAsJson);
        })
        .catch(function(error) {
            console.log('Looks like there was a problem: \n', error);
        });
    }

    const Getplay = (event) => {
          songURL = "https://assets.breatheco.de/apis/sound/"+event.target.dataet.url;
          //currentSongNum = event.target.dataet.songnum;
          setCurrentSongNum(event.target.dataet.songnum);
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
             let lastIndex = data.length-1;
             songURL =  "https://assets.breatheco.de/apis/sound/"+ data[lastIndex].url;
             setCurrentSongNum(lastIndex);
             //console.log(currentSongNum + "Last Index" + lastIndex + songURL);
             setMyMusic(new Audio(songURL));
             PauseSong();
          }else{
             songURL =  "https://assets.breatheco.de/apis/sound/"+ data[currentSongNum].url;
             setMyMusic(new Audio(songURL));
             PauseSong();
              //console.log(currentSongNum +"previous" +songURL);
          }
          //console.log(currentSongNum);
    }
    //console.log("previous" + currentSongNum);

    const NextSong = () => {
          setCurrentSongNum(currentSongNum + 1);

          if (currentSongNum < data.length - 1 ) {
              songURL =  "https://assets.breatheco.de/apis/sound/"+ data[currentSongNum].url;
              setMyMusic(new Audio(songURL));
              //console.log(currentSongNum + "Last Index" + (data.length - 1)  + songURL);
              PauseSong();
          }else{
              let firstindex = 1;
              songURL =  "https://assets.breatheco.de/apis/sound/"+ data[firstindex].url;
              setMyMusic(new Audio(songURL));
              //console.log(currentSongNum +"next" +songURL);
              PauseSong();
          }
    }

    //console.log("next" + currentSongNum);

    useEffect(() => {
         LoadData()
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
            { !data ? ("Loading...") : data.map(( item, index) => {
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
