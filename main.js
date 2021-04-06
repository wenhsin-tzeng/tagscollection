console.log("TAGS");

var Airtable = require('airtable');
console.log(Airtable);

var base = new Airtable({apiKey: 'key3HvxrMD4oBsB4C'}).base('applOVw32gRipkREK');

base('Tags').select({}).eachPage(gotPageOfTags, gotAllTags);

const tags = [];

function gotPageOfTags(records, fetchNextPage){
  console.log("gotPageOfTags()");
  tags.push(...records);
  fetchNextPage();
}

function gotAllTags(err){
  console.log("gotAllTags()");

  if (err){
  console.log("error loading tags");
  console.error(err);
  return;
  }

  consoleLogTags();
  showTags();
}

function consoleLogTags(){
  console.log("consoleLogTags()");
  tags.forEach((tag) => {
    console.log("Tag:", tag);
  });
}

function showTags() {
  console.log("showTags()");
  const gridcontainer = document.getElementById("grid-container");
  tags.forEach((tag) => {
    const div = document.createElement("div");
    div.innerText = tag.fields.Name;
    div.classList.add("grid-item");
    div.addEventListener("mouseover", () => {
      div.innerText = tag.fields.Category;
    });
    div.addEventListener("mouseout", () => {
      div.innerText = tag.fields.Name;
    });
    gridcontainer.appendChild(div);

    // div.getElementByClassName("grid-item")[0].src = tag.fields.image[0].url;
    //
    // const h2 = document.createElement("h2");
    // h2.innerText = tag.fields.Name;
    // document.body.appendChild(h2);

  });
}