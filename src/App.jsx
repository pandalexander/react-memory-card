import { useState, useEffect } from "react";

import "./App.css";

const imageArray = [
  { displayName: "Laptop", url: "https://picsum.photos/id/1/200/300" },

  { displayName: "Landscape", url: "https://picsum.photos/id/10/2500/1667" },
];

async function fetchBlob(url) {
  const response = await fetch(url);
  return response.blob();
}

function App() {
  const [imageSourceUrlArray, setImageSourceUrlArray] = useState([]);
  const [isBusy, setIsBusy] = useState(true);

  async function fetchAllBlobsAndAssign(data) {
    const allData = await Promise.all(
      // this is assuming the 'data' in question is an array of objects, objects with a displayName and url
      data.map((item) => fetchBlob(item.url))
    );

    const allBlobUrlStrings = allData.map((item) => URL.createObjectURL(item));

    let newData = [];

    for (let i = 0; i < data.length; i++) {
      newData[i] = {
        displayName: data[i].displayName,
        url: allBlobUrlStrings[i],
      };
    }
    setImageSourceUrlArray(newData);
    setIsBusy(false);
  }

  useEffect(() => {
    fetchAllBlobsAndAssign(imageArray);
  }, []);

  if (!isBusy) {
    return (
      <>
        <div className="card-component">
          <h1>{imageSourceUrlArray[0].displayName}</h1>
          <img src={imageSourceUrlArray[0].url} alt="" />
        </div>
        <div className="card-component">
          <h1>{imageSourceUrlArray[1].displayName}</h1>
          <img src={imageSourceUrlArray[1].url} alt="" />
        </div>
      </>
    );
  }
}

export default App;
