import React, { useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import Input from "./components/shared/Input";
import Button from "./components/shared/Button";
import Meme from "./components/Meme";

export default function App() {
  const [memes, setMemes] = useState([]);
  const [randomUrl, setRandomUrl] = useState("");
  const [formData, setFormData] = useState({
    top_text: "",
    bottom_text: "",
  });
  
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => setMemes(data.data.memes));
  }, []);

  function generateRandomImage(event) {
    event.preventDefault();
    const index = Math.floor(Math.random() * memes.length);
    const url = memes[index].url;
    setRandomUrl(url);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    generateRandomImage(event);
    event.preventDefault();
  }

  return (
    <div className="container">
      <Header />
      <main className="main-container">
        <form onSubmit={handleSubmit}>
          <div className="input-fields">
            <Input
              label="Top text"
              change={handleChange}
              name="top_text"
              value={formData.top_text}
            />
            <Input
              label="Bottom text"
              change={handleChange}
              name="bottom_text"
              value={formData.bottom_text}
            />
          </div>
          <Button text="Get a new meme image 🖼" />
        </form>
        {randomUrl && (
          <Meme
            topText={formData.top_text}
            bottomText={formData.bottom_text}
            url={randomUrl}
          />
        )}
      </main>
    </div>
  );
}
