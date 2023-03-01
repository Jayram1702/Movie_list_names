import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Modal from "react-modal";
import  React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from './config';

function App() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
    const [movieData, setMovieData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editTableNo, setEditTableNo] = useState(null);
    const [newMovie, setNewMovie] = useState({
      name: "",
      date: "",
      genre: "",
    });

    const { name, date, genre } = newMovie;

    useEffect(() => {
      findAllmovies();
    }, []);
  
    function findAllmovies() {
      axios
        .get(url.API + "movies/", {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          if (res.data.length > 0) setMovieData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    const handleInputChange = (e) => {
      setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
    };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTableNo !== null && editTableNo !== undefined) {
      setMovieData(
        movieData.map((moviee, index) => {
          if (index === editTableNo) {
            return { ...newMovie };
          }
          return moviee;
        })
      );
    } 
    else {
      axios
        .post(url.API + "addNewMovie/", newMovie, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          if (res.data.length > 0) {
            setMovieData(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    handleClose();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (index) => {
    setEditTableNo(index);
    setNewMovie(movieData[index]);
    handleOpen();
  };

  const handleDelete = (index) => {
    axios
      .delete(url.API + "deleteMovie/" + movieData[index]._id, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setMovieData(movieData.filter((moviee, i) => i !== index));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClose = () => {
    setModalIsOpen(false);
    setEditTableNo(null);
    setNewMovie({ name: "", role: "", genre: "" });
  };

  const handleOpen = () => {
    setModalIsOpen(true);
  };

  const filteredData = movieData.filter(
    (moviee) =>
      moviee.genre
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
  return (
    <>
    <nav class="navbar navbar-light bg-dark">
      <div class="container-fluid">
        <img src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/design/discover/mascot-logo-design/mascot-logo-design_fb-img_1200x800.jpg" style ={{width:"50px", height:"50px"}}alt="company logo" />
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search"  onChange={handleSearch} />
        <button class="btn btn-outline-success" type="submit" >Search</button>
      </form>
        <button className="btn btn-outline-light" onClick={handleOpen}>Create</button>
      </div>
    </nav>

      <Modal isOpen={modalIsOpen} onRequestClose={handleClose}>
        <h2>Create Movie Record</h2>
        <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputName" class="form-label">MovieName</label>
          <input type="text" class="form-control" id="exampleInputName" name = "name"  value={newMovie[name]} onChange={handleInputChange} required/>
        </div>
        <div class="mb-3">
          <label for="exampleInputRole" class="form-label">Releasedate</label>
          <input type="date" class="form-control" name = "date" value={newMovie[date]} onChange={handleInputChange} required/>
      </div>
        <div className='select' >
      <select>
      <option onChange={handleInputChange} value={newMovie[genre]} >Genre</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
      </select> 
      </div><br />
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </Modal>
      <div className='fixed-bottom'>
      {/* onClick={() => findAllmovies()} */}
            <button className='btn btn-light border d-flex float-end m-3' >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                </svg>
            </button>
        </div>
      <div style={{padding:"20px", margin:"20px"}}>
      <table class="table table-primary table-stripped" > 
        <thead>
          <tr>
            <th>No</th>
            <th>MovieName</th>
            <th>Releasedate</th>
            <th>Genre</th>
            <th>Changes</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.name}</td>
              <td>{data.date}</td>
              <td>{data.genre}</td>
              <td><button className="btn btn-primary" onClick={handleEdit}>Edit</button></td>
              <td><button className="btn btn-danger"  onClick={handleDelete}>Delete</button></td>
              
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default App;
