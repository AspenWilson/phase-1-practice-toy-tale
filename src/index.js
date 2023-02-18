let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
 const addBtn = document.querySelector("#new-toy-btn");
 const toyFormContainer = document.querySelector(".container");


 addBtn.addEventListener("click", () => {
   // hide & seek with the form
   addToy = !addToy;
   if (addToy) {
     toyFormContainer.style.display = "block";
     toyFormContainer.addEventListener('submit', (e)=> {
       // e.preventDefault()
       addNewToy(e)
     })
   } else {
     toyFormContainer.style.display = "none";
   }
 });
});
//add Toy Info the card
const toyContainer = document.getElementById("toy-collection")


function fetchToyData() {
 return fetch('http://localhost:3000/toys')
 .then(resp=>resp.json())
 .then(json=>toyCards(json))
}


function toyCards(toys) {
 toys.forEach(toy => {
   const toyDiv =document.createElement('div');
   toyDiv.className = 'card';
   const h2 = document.createElement('h2');
   h2.innerHTML = `${toy.name}`
   const img = document.createElement('img');
   img.src=`${toy.image}`;
   img.className = 'toy-avatar'
   const p = document.createElement('p');
   const msg = `${toy.likes} Likes`
   p.innerHTML = msg;
   const button = document.createElement('button');
   button.className= 'like-btn';
   button.id = `${toy.likes}`
   button.innerHTML=`Like ❤️`;
   button.setAttribute=`${toy.id}`
   button.addEventListener('click', (e) => {
     fetchLikes(e)
   })
   toyContainer.appendChild(toyDiv)
   toyDiv.appendChild(h2)
   toyDiv.appendChild(img)
   toyDiv.appendChild(p)
   toyDiv.appendChild(button)
 })
}




fetchToyData()


//Add New Toy




function addNewToy(event) {
 fetch ('http://localhost:3000/toys', {
   method: 'POST',
   headers: {
     "Content-Type": "application/json",
     Accept: "application/json"
   },
   body: JSON.stringify({
     'name': event.target.name.value,
     'image': event.target.image.value,
     'likes': 0
   })
 })
 .then(resp=> resp.json())
 .then(event => event);
 }


//likes function




function fetchLikes(event) {
 let likeCount= event.target.previousElementSibling
 let likeCountNum = parseInt(likeCount.innerHTML)
 likeCountNum+=1
 let newLikeCount = likeCountNum
 console.log(newLikeCount)
 likeCount.innerText=`${newLikeCount} Likes`
  return fetch('http://localhost:3000/toys/:id', {
   method: 'PATCH',
   headers: {
     "Content-Type": "application/json",
     Accept: "application/json"
   },
   body: JSON.stringify({
     'likes': newLikeCount
   })
})
.then(resp=> resp.json())
.then(event => event);
}




