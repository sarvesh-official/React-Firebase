import { useEffect, useState } from "react";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);
  const movieCollectionRef = collection(db, "movies");

  //& New Movie Stats
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieBlockBuster, setNewMovieBlockBuster] = useState(false);

  // update title
  const [updatedTitle, setUpdatedTitle] = useState("");

  // file upload state
  const [fileUpload, setFileUpload] = useState(null);
  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filterdData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filterdData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  });

  const onSubmitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        movieName: newMovieTitle,
        releaseDate: newReleaseDate,
        BlockBuster: isNewMovieBlockBuster,
        userId: auth?.currentUser?.uid,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
    } catch (err) {
      console.log(err);
    }
  };
  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { movieName: updatedTitle });
    } catch (err) {
      console.log(err);
    }
  };

  const UploadFiles = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="app">
      <Auth />
      <div className="update">
        <input
          type="text"
          placeholder="Movie title..."
          onChange={(e) => {
            setNewMovieTitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Release Date..."
          onChange={(e) => {
            setNewReleaseDate(Number(e.target.value));
          }}
        />
        <input
          type="checkbox"
          checked={isNewMovieBlockBuster}
          onChange={(e) => setNewMovieBlockBuster(e.target.checked)}
        />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Button</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1>{movie.movieName}</h1>
            <p>Block Buster : {movie.BlockBuster && "yes"}</p>
            <button
              onClick={() => {
                deleteMovie(movie.id);
              }}
            >
              Delete Movie
            </button>
            <input
              type="text"
              onChange={(e) => setUpdatedTitle(e.target.value)}
              placeholder="new title..."
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              Update Title
            </button>
            <div>
              <input
                type="file"
                onChange={(e) => setFileUpload(e.target.files[0])}
              />
              <button onClick={UploadFiles}>Upload File</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
