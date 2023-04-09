import {collection, addDoc, getDocs} from 'firebase/firestore'

import {db} from './src/firebase'
import { questions } from './src/questions'

const container = document.querySelector('#app')

const addQuestions = () => questions.map( async question => {
  await addDoc(collection(db, "questions"), question)
  console.log('pregunta añadidas')
});





const querySnapshot = await getDocs(collection(db, "questions"));
querySnapshot.forEach((doc) => {
  // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  // container.innerHTML += `<h4>${doc.id}</h4>`
  // <pre> ${JSON.stringify(doc.data(), undefined, 2)}</pre>

  container.innerHTML += `<h4>Pregunta: ${doc.data().question}</h4>`
  container.innerHTML += `<table class="table">
  <thead>
    <tr>
      <th scope="col">Respuesta</th>
      <th scope="col">Puntos</th>
    </tr>
  </thead>
  `
  doc.data().answers.sort( (a,b) => b.points - a.points).map( ({answer, points}) => {
    // container.innerHTML += `<table>
    // <p>${answer} - <span>${points}</span></p>
    // </table>`
    container.innerHTML += `
      <tbody>
      <tr>
        <td>${answer}</td>
        <td>${points}</td>
        </tr>
        </tbody>
        `

    })
    container.innerHTML += `
  </table>`
});

container.innerHTML += `
  <div>
    <button id="btnAdd" class="btn btn-success">Añadir preguntas a Firebase</button>
  </div>
`
const btnAdd = document.querySelector('#btnAdd');
btnAdd.addEventListener('click', addQuestions);