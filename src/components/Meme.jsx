import React from "react";

export default function Meme({ topText, bottomText, url }) {
  return (
    <div className="meme">
      <img
        className="random-image"
        src={url}
        alt="Meme image which is generated randomly with text in the form"
      />
      <h2 className="meme-text top">{topText}</h2>
      <h2 className="meme-text bottom">{bottomText}</h2>
    </div>
  );
}
