import {collection, addDoc, getDocs} from 'firebase/firestore'

import {db} from './src/firebase'
import { questions } from './src/questions'

import './style.css'

const container = document.querySelector('#app')

const addQuestions = () => questions.map( async question => {
  await addDoc(collection(db, "questions"), question)
  console.log('pregunta añadidas')
});



container.innerHTML = `
  <div>
    <h1>Hello Vite!</h1>
    <button id="btnAdd">Añadir preguntas a Firebase</button>
  </div>
`
const btnAdd = document.querySelector('#btnAdd');
btnAdd.addEventListener('click', addQuestions);

const querySnapshot = await getDocs(collection(db, "questions"));
querySnapshot.forEach((doc) => {
  // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  // container.innerHTML += `<h4>${doc.id}</h4>`
  // <pre> ${JSON.stringify(doc.data(), undefined, 2)}</pre>

  container.innerHTML += `<h4>${doc.data().question}</h4>`
  doc.data().answers.sort( (a,b) => b.points - a.points).map( ({answer, points}) => {
    container.innerHTML += `<div>
    <p>${answer} - <span>${points}</span></p>
    </div>`
  })
});

