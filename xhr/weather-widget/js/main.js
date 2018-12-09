const xhr = new XMLHttpRequest();
xhr.addEventListener("load", onLoad);
xhr.open('GET', 'https://neto-api.herokuapp.com/weather', true);
xhr.send();

function onLoad() {
  if (xhr.status === 200) {
    const response = JSON.parse(xhr.responseText);
    setData(response);
  }
}

