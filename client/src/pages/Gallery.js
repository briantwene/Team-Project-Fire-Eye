import React from "react";

function Gallery() {
  return (
    <div className="gallery">
      <h1>Gallery</h1>
      <div className="gallery__items">
        <div className="gallery__items--item">
          <a target="_blank" href="img_5terre.jpg">
            <img
              src="https://images.unsplash.com/photo-1644027616320-b378fc57f78e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="Cinque Terre"
              width="600"
              height="400"
            ></img>
          </a>
          <div className="desc">Add a description of the image here</div>
        </div>

        <div className="gallery__items--item">
          <a target="_blank" href="img_forest.jpg">
            <img
              src="https://images.unsplash.com/photo-1644027616320-b378fc57f78e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="Forest"
              width="600"
              height="400"
            ></img>
          </a>
          <div className="desc">Add a description of the image here</div>
        </div>

        <div className="gallery__items--item">
          <a target="_blank" href="img_lights.jpg">
            <img
              src="https://images.unsplash.com/photo-1644027616320-b378fc57f78e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="Northern Lights"
              width="600"
              height="400"
            ></img>
          </a>
          <div className="desc">Add a description of the image here</div>
        </div>

        <div className="gallery__items--item">
          <a target="_blank" href="img_mountains.jpg">
            <img
              src="https://images.unsplash.com/photo-1644027616320-b378fc57f78e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="Mountains"
              width="600"
              height="400"
            ></img>
          </a>
          <div className="desc">Add a description of the image here</div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
