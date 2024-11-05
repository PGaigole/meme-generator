import React, { useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import Input from "./components/shared/Input";
import Button from "./components/shared/Button";

export default function App() {
  const [memes, setMemes] = useState([]);
  const [randomUrl, setRandomUrl] = useState("");
  const [formData, setFormData] = useState({
    top_text: "",
    bottom_text: "",
  });
  useEffect(() => {
    fetch("/memesData.json")
      .then((response) => response.json())
      .then((data) => setMemes(data));
  }, []);
  // const [randomUrl, setRandomUrl] = useState("");
  function generateRandomImage(event) {
    event.preventDefault();
    const index = Math.floor(Math.random() * memes.data.memes.length);
    const url = memes.data.memes[index].url;
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
    console.log(formData);
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
          <div className="meme">
            <img
              className="random-image"
              src={randomUrl}
              alt="Meme image which is generated randomly with text in the form"
            />
            <h2 className="meme-text top">{formData.top_text}</h2>
            <h2 className="meme-text bottom">{formData.bottom_text}</h2>
          </div>
        )}
      </main>
    </div>
  );
}
