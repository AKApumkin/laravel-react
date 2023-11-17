import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// PAGES
import  Login from "./pages/login/Login";
import  Display from "./pages/display/Display";

// COMPONENTS
import  Header from "./components/header/Header";


function App() {

  const [appState, setappState] = useState<string>("/") ;

    /**
     * gets the current route and changes the appState to manage the display of diffrent components  
     */ 
    const location = useLocation();
    useEffect(() => {
      setappState(location.pathname);
    }, [location]);

  return (
    <div>
      { appState !== "/" &&  
        <Header/> 
      }
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Display/> } />
      </Routes> 
    </div>
  );
}

export default App;
