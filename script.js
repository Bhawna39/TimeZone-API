const inputbox = document.getElementById("inputbox");
const resultcontainer = document.getElementById("resultcont");
const error = document.getElementById("error");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  fetchTimeZone(position.coords.latitude, position.coords.longitude, 0);
}

function fetchTimeZone(lat, lon) {
  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=45401202a53e490e83ea90125e7a9d4a`
  )
    .then((resp) => resp.json())
    .then((result) => {
      yourTimeZone(result.results[0], lat, lon);
    });
}

function searchTimeZone(data) {
  const name = document.getElementById("name-r");
  const lati = document.getElementById("lati-m");
  const longi = document.getElementById("longi-n");
  const offSTD = document.getElementById("offSTD-r");
  const offSTDsec = document.getElementById("offSTDsec-r");
  const offDST = document.getElementById("offDST-r");
  const offDSTsec = document.getElementById("offDSTsec-r");
  const country = document.getElementById("country-r");
  const post = document.getElementById("post-r");
  const city = document.getElementById("city-r");

  
  name.textContent = data.timezone.name;
  lati.textContent = data.lat;
  longi.textContent = data.lon;
  offSTD.textContent = data.timezone.offset_DST;
  offSTDsec.textContent = data.timezone.offset_STD_seconds;
  offDST.textContent = data.timezone.offset_DST;
  offDSTsec.textContent = data.timezone.offset_DST_seconds;
  country.textContent = data.country;
  post.textContent = data.post;
  city.textContent = data.city;
}
function search() {
  const address = inputbox.value;

  fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      address
    )}&apiKey=45401202a53e490e83ea90125e7a9d4a`
  )
    .then((resp) => resp.json())
    .then((geocodingResult) => {
      if (geocodingResult.features.length > 0) {
        error.classList.add("alert");
        resultcontainer.classList.remove("alert");
        searchTimeZone(geocodingResult.features[0].properties);
      } else {
        resultcontainer.classList.add("alert");
        error.classList.remove("alert");
      }
    });
  return false;
}
function yourTimeZone(data, lat, lon) {
  const name = document.getElementById("name");
  const lati = document.getElementById("lati");
  const longi = document.getElementById("longi");
  const offSTD = document.getElementById("offSTD");
  const offSTDsec = document.getElementById("offSTDsec");
  const offDST = document.getElementById("offDST");
  const offDSTsec = document.getElementById("offDSTsec");
  const country = document.getElementById("country");
  const city = document.getElementById("city");
  const postcode = document.getElementById("post");
  name.textContent = data.timezone.name;
  lati.textContent = lat;
  longi.textContent = lon;
  offSTD.textContent = data.timezone.offset_DST;
  offSTDsec.textContent = data.timezone.offset_STD_seconds;
  offDST.textContent = data.timezone.offset_DST;
  offDSTsec.textContent = data.timezone.offset_DST_seconds;
  country.textContent = data.country;
  city.textContent = data.city;
  postcode.textContent = data.postcode;
}
document.addEventListener("DOMContentLoaded", getLocation);
