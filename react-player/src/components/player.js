import React, { useState, useEffect } from 'react';

import './play.css';

const PlayControl = () => {

    const [datas, setDatas] = useState(null);

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
            console.log(responseAsJson);
        })
        .catch(function(error) {
            console.log('Looks like there was a problem: \n', error);
        });
}


useEffect(() => {
    LoadDatas()
},[])

	return (
       <>
          <div className="boxbtn mx-outo">
            <button type="button" className="btn btn-outline-primary">Play</button>
            <button type="button" className="btn btn-outline-danger">Pause</button>
            <button type="button" className="btn btn-outline-secondary">Previous</button>
            <button type="button" className="btn btn-outline-success">Next</button>

          </div>
          <div>
            <ol className="list-group">
            { !datas ? ("Loading...") : datas.map(( item, index) => {
                return (
                    <li key={index} className="list-group-item clickme">{item.id} - {item.name} - URL = {item.url}</li>
                )

            } ) }
            </ol>
          </div>
      </>
	);

};

export default PlayControl;
