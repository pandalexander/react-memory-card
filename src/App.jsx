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
  const [clickedIds, setClickedIds] = useState([]);

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
        id: i + 1,
      };
    }
    setImageSourceUrlArray(newData);
    setIsBusy(false);
  }

  useEffect(() => {
    fetchAllBlobsAndAssign(imageArray);
  }, []);

  function handleClick(id) {
    setClickedIds((clickedIds) => [...clickedIds, id]);
  }

  if (!isBusy) {
    return (
      <>
        <h3>Clicked Ids: {clickedIds}</h3>
        {imageSourceUrlArray.map((item) => (
          <div key={item.id} className="card-component">
            <h1>{item.displayName}</h1>
            <p>id: {item.id}</p>
            <img src={item.url} alt={item.displayName} />
            <button onClick={() => handleClick(item.id)}>
              Click To Select
            </button>
          </div>
        ))}
      </>
    );
  }
}

export default App;
