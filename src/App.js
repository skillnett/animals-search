import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';

const App = () => {

  const [search, setSearch] = useState(''); 
  const [animals, setAnimals] = useState('dogs');
  const [pictures, setPictures] = useState([]);

  const apiKey = '6b3575d10435de5f010fc941f5eff94a';
  const flickrUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${animals}&&format=json&nojsoncallback=true`;

  useEffect(() => {
    getPicturesSources();
  }, [search, animals]);

  const getPicturesSources = () => axios.get(flickrUrl)
    .then(({ data }) => {
      const picturesSources = data.photos.photo
        .filter(({ title }) => title.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        .map(({ farm, server, id, secret, title }) => ({
          id: id,
          title: title,
          src: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
        }))
      setPictures(picturesSources);
    });

  const onSearch = ({ target }) => setSearch(target.value);
  const setKindOfAnimals = ({ target }) => setAnimals(target.innerHTML);

  return (
    <div className="search-app d-flex align-items-center">
      <div className="container">
        <div className="btn-group search-app__btn-group">
          <h5 className="mt-5">Who are you looking for?:)</h5>
          <button type="button" className="btn btn-outline-primary" onClick={setKindOfAnimals}>Cats</button>
          <button type="button" className="btn btn-outline-primary" onClick={setKindOfAnimals}>Dogs</button>
        </div>
        <input type="search" onChange={onSearch} placeholder="Search by name" className="search-app__input col-6 mt-3" />
        <div className="row mt-3 d-flex justify-content-center">
          {
            search && !pictures.length ?
              <p>No results :(</p> :
              pictures.map(({ title, src, id }) => (
                <div className="col-md-4 col-sm-6 mt-3 d-flex flex-column justify-content-end" key={id}>
                  <img src={src} alt={title} className="search-app__image" />
                  <span>{title}</span>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
