import React ,{useState}from 'react'

const App = () => {

 const[search,setsearch] = useState('');
 const[data,setdata]=useState([]);
 const submitHandler = e =>{
  e.preventDefault();
  fetch('https://www.omdbapi.com/?s=star%20wars&apikey=263d22d8').then(
    response => response.json()
  ).then(
    value =>setdata(value.Search)
  )
 }

 const dowload = url =>{
  fetch(url).then(response =>{
    response.arrayBuffer().then(function(buffer){
       const url = window.url.createObjectURL(new Blob([buffer]));
       const link = document.createElement("a");
       link.href = url;
       link.setAttribute("download", "image.png");
       document.body.appendChild(link);
       link.click();
    });
  })
  .catch(err =>{
    console.log(err);
  });
 };


  return (
    <div>
      <center>
        <form onSubmit={submitHandler}>
      <h2 style={{"color":"red"}}>Search Favorite Movie</h2>
      <input value={search} onChange={(e)=>setsearch(e.target.value)}    type="text"></input><br/>
      <button  className='btn btn-primary m-3'  type='Submit' value="submit">Search</button>
      </form>
      <div className='row '>
        {data.map(movie=>
          <div className='col-md-4'>
            <div className='card m-3'  >
            <img className='card-img-top ' src={movie.Poster} alt="card image cap"></img>

            <div className='card-body'>
              <h2 className='card-tittle '>{movie.Title}</h2>
              <button className='btn btn-primary' onClick={()=>dowload(movie.Poster)}>download here</button>

            </div>
            </div>

          </div>
          
          
          )}


      </div>
      </center>
    </div>


  )
}

export default App
