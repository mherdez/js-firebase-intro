import { collection, addDoc, getDocs } from 'firebase/firestore';

import { db } from './src/firebase';
import { questions } from './src/questions';

function showAnswer( answer ) {
  console.log(answer)
}

const $ = selector => document.querySelector(selector);


const $app = $('#app');

const addQuestions = () => questions.map(async question => {
  await addDoc(collection(db, "questions"), question);
  console.log('pregunta añadidas');
});

const querySnapshot = await getDocs(collection(db, "questions"));

querySnapshot.forEach((doc) => {

  // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  // container.innerHTML += `<h4>${doc.id}</h4>`
  // <pre> ${JSON.stringify(doc.data(), undefined, 2)}</pre>

  console.log(doc.data().question);

  $app.innerHTML += `<h4>Pregunta: ${doc.data().question}</h4>`;

  const $table = document.createElement('table');
  $table.classList.add('table');

  const $thead = document.createElement('thead');
  const $tr = document.createElement('tr');
  const $th1 = document.createElement('th');
  $th1.setAttribute('scope', 'col');
  $th1.textContent = 'Respuesta';
  const $th2 = document.createElement('th');
  $th2.setAttribute('scope', 'col');
  $th2.textContent = 'Puntos';
  const $th3 = document.createElement('th');
  $th3.setAttribute('scope', 'col');
  $th3.textContent = 'Acciones';


  $tr.append($th1);
  $tr.append($th2);
  $tr.append($th3);
  $thead.append($tr);
  $table.append($thead);
  $app.append($table);

  const $tbody = document.createElement('tbody');

  doc.data().answers.sort((a, b) => b.points - a.points).map(({ answer, points }) => {

    const $tr = document.createElement('tr');
    const $td1 = document.createElement('td');
    $td1.textContent = answer;
    const $td2 = document.createElement('td');
    $td2.textContent = points;

    const $td3 = document.createElement('td');
    const $button = document.createElement('button');
    $button.classList.add('btn');
    $button.classList.add('btn-danger');
    $button.textContent = 'View';
    $button.addEventListener('click', () => showAnswer(answer));
    // $button.setAttribute('click', `showAnswer('${answer}')`)

    $td3.append($button);

    $tr.append($td1);
    $tr.append($td2);
    $tr.append($td3);
    $tbody.append($tr);

  });
  $table.append($tbody);

});


const $btnAddFirebase = document.createElement('button');
$btnAddFirebase.classList.add('btn');
$btnAddFirebase.classList.add('btn-info');
$btnAddFirebase.textContent = 'Añadir preguntas a Firebase';

$app.append($btnAddFirebase);

$btnAddFirebase.addEventListener('click', addQuestions);


