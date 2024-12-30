import { useState, useEffect } from "react";

import "./App.css";

const imageArray = [
  { displayName: "Laptop", url: "https://picsum.photos/id/1/200/300" },

  { displayName: "Landscape", url: "https://picsum.photos/id/10/2500/1667" },

  { displayName: "Shoes", url: "https://picsum.photos/id/21/3008/2008" },

  { displayName: "Book", url: "https://picsum.photos/id/24/4855/1803" },

  { displayName: "Gear", url: "https://picsum.photos/id/26/4209/2769" },

  { displayName: "Mug", url: "https://picsum.photos/id/30/1280/901" },

  { displayName: "Camera", url: "https://picsum.photos/id/36/4179/2790" },

  { displayName: "Record", url: "https://picsum.photos/id/39/3456/2304" },

  { displayName: "Pier", url: "https://picsum.photos/id/47/4272/2848" },

  { displayName: "Mac", url: "https://picsum.photos/id/48/5000/3333" },

  { displayName: "Lighthouse", url: "https://picsum.photos/id/58/1280/853" },

  { displayName: "Fence", url: "https://picsum.photos/id/59/2464/1632" },
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

  function sortArrayByProperty(array) {
    function compare(a, b) {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    }

    array.sort(compare);
  }

  function shuffleCardOrder() {
    let temporaryArray = imageSourceUrlArray;

    let currentIndex = temporaryArray.length;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [temporaryArray[currentIndex], temporaryArray[randomIndex]] = [
        temporaryArray[randomIndex],
        temporaryArray[currentIndex],
      ];
    }

    setImageSourceUrlArray(temporaryArray);
  }

  function handleClick(id) {
    if (!clickedIds.includes(id)) {
      setClickedIds((clickedIds) => [...clickedIds, id]);

      if (clickedIds.length === 11) {
        setClickedIds([]);
        let temporaryArray = imageSourceUrlArray;
        sortArrayByProperty(temporaryArray);
        setImageSourceUrlArray(temporaryArray);
        alert("YOU WIN! CONGRATS!");
      } else {
        shuffleCardOrder();
      }
    } else {
      setClickedIds([]);
      let temporaryArray = imageSourceUrlArray;
      sortArrayByProperty(temporaryArray);
      setImageSourceUrlArray(temporaryArray);
      alert("YOU LOSE! Please try again");
    }
  }

  if (!isBusy) {
    return (
      <>
        <div className="game-screen">
          <h3>Current Score: {clickedIds.length}</h3>
          <div className="game-container">
            {imageSourceUrlArray.map((item) => (
              <div key={item.id} className="card-component">
                {/* <h1>{item.displayName}</h1> */}
                {/* <p>id: {item.id}</p> */}
                <img src={item.url} alt={item.displayName} />
                <button onClick={() => handleClick(item.id)}>
                  Click To Select
                </button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="loading-screen">
          <h1>LOADING!</h1>
        </div>
      </>
    );
  }
}

export default App;
