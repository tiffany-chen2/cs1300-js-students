var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=E71bXcPP2DPcUgW8eR57VJGAYoMKaZPa6EFIMe1urCE";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

const addToDom = (plant) => {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.setAttribute("class", plant.common_name);

  const plant_name = document.createElement('h3');
  plant_name.innerText = plant.common_name;

  const plant_year = document.createElement('h4');
  plant_year.innerText = "Year: " + plant.year;

  const plant_family = document.createElement('h4');
  plant_family.innerText = "Family: " + plant.family;

  const plant_familyname = document.createElement('h4');
  plant_familyname.innerText = "Family Common Name: " + plant.family_common_name;

  const plant_genus = document.createElement('h4');
  plant_genus.innerText = "Genus: " + plant.genus;

  const plant_sname = document.createElement('h4');
  plant_sname.innerText = "Scientific Name: " + plant.scientific_name;

  const plant_rank = document.createElement('h4');
  plant_rank.innerText = "Rank: " + plant.rank;


  const image_url = plant.image_url;
  const plant_img = document.createElement('img');
  plant_img.setAttribute('src', image_url);

  wrapperDiv.appendChild(plant_name);
  wrapperDiv.appendChild(plant_sname);
  wrapperDiv.appendChild(plant_year);
  wrapperDiv.appendChild(plant_family);
  wrapperDiv.appendChild(plant_familyname);
  wrapperDiv.appendChild(plant_genus);
  wrapperDiv.appendChild(plant_rank);
  wrapperDiv.appendChild(plant_img);

  document.getElementById("plants").appendChild(wrapperDiv);
}

const getData = (response) => {
  const plantData = JSON.parse(response).data;
  console.log(plantData);
  console.log(plantData[0])
  console.log(plantData[0].common_name)

  const beechfamily = plantData.filter(p => p.year == 1753);

  const plantDataSet = beechfamily.map(addToDom)
}

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
const displayContent = () => {
  corsPromise().then(
    (request) =>
      (request.onload = request.onerror = function () {
        getData(request.response)
      })
  );
}


//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
