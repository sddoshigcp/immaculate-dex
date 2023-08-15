import React from "react";
import "./App.css";
// import Grid from "./Grid/Grid";
import Header from "./Header/Header";
import Grid from "./Grid/Grid";
import { EndGame } from "./EndGame/EndGame";

function App() {
  const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <div className="App">
      {/* <Header></Header> */}
      <Grid></Grid>

    </div>
  );
}

export default App;