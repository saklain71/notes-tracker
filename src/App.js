
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import InputForm from './components/InputForm/InputForm';
import NoteCard from './components/NoteCard/NoteCard';



function App() {

  //get data
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/notes`)
      .then(res => res.json())
      .then(data => setNotes(data))
  }, []);
  /*
1. here there will be a function named handleSearch
to handle search by query, and it will be passed as props to header
  */

  const handleSearch = (event) => {
    event.preventDefault();
    const queryText = event.target.searchText.value;

    if (queryText) {
      fetch(`http://localhost:5000/notes?userName=${queryText}`)
        .then((res) => res.json())
        .then((data) => setNotes(data))
    }
  };

  /*
4.  there will be a function named handlePost
to post data to backend, and it will be passed as props to InputFrom.
 */

const handlePost =(event)=>{
  event.preventDefault();
  const userName = event.target.userName.value;
  const textData = event.target.textData.value;

  fetch('http://localhost:5000/note', {
    method: 'POST',
    headers : {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ userName , textData })
  })
  .then(res => res.json())
  .then(data => console.log(data))

}



  return (
    <div className="App">

      <Header handleSearch={handleSearch}></Header>
      <InputForm handlePost={handlePost}></InputForm>
      <div className='row  row-cols-1 row-cols-md-3 g-4 m-2'>
        {
          notes.map(note =>
            <NoteCard
              key={note._id}
              note={note}
            />
          )}
      </div>


    </div>
  );
}

export default App;
