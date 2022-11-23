import React, { useState, useEffect } from "react";
import "./Gallery.css";
import useFetch from '../../../CustomHooks/useFetch';

const Gallery = () => {
  const apiKey = `5dc8da9950191123fe0a706966b868bb`;
  const [gallery, setGallery] = useState([]);

  const { data } = useFetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US&page=1`)

  useEffect(() => {
    setTimeout(() => 
      setGallery(data.slice(0, 5)), 500)
  },[data])
  

  return (
    <div className="gallery-wrapper">
      <h2 className="py-4 text-center">Tv series Airing today</h2>
      <div id="gallery">
        <div>
          <div class="creationsBlocUl">
            {gallery?.map((single) => {
              return (
                <figure class="creaBlock creaBlockPrez">
                  <figcaption>{single.name}</figcaption>
                  <div class="lineSeparator"></div>
                  <div class="blocImg">
                    <img
                      src={`http://image.tmdb.org/t/p/w500${single.poster_path}`}
                      // src={single.poster_path}
                      alt="single-pic"
                    />
                  </div>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
