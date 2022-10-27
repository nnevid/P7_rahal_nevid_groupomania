import { useEffect, useState } from "react";
import { UidContext } from "./components/AppContext";
import Routes from "./components/Routes";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/actions/user.actions";
import Footer from "./components/Footer";


function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => setUid(res.data))
        .catch((err) => console.log("no token"));
    };
    fetchToken();
    if (uid) {
     dispatch(getUser(uid))
    }
    
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
      <Footer/>
    </UidContext.Provider>
  );
}

export default App;
