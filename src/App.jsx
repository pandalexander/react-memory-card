import { useState, useEffect } from "react";

import "./App.css";

async function fetchBlob(url) {
  const response = await fetch(url);
  return response.blob();
}

function App() {
  const [imageSourceUrl, setImageSourceUrl] = useState("");

  async function getBlobAndAssign(imageURL) {
    const image = await fetchBlob(imageURL);
    setImageSourceUrl(URL.createObjectURL(image));
  }

  const getBlobAndAssignUrl = async (imageURL) => {
    const image = await fetchBlob(imageURL);
    setImageSourceUrl(URL.createObjectURL(image));
    console.log("Things worked?");
  };

  useEffect(() => {
    getBlobAndAssign("https://picsum.photos/id/1/200/300");
  }, []);

  return (
    <>
      <img src={imageSourceUrl} alt="" />
    </>
  );
}

export default App;
