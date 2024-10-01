import React,{useEffect, useRef} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import Register from "./pages/register";
import Private from "./pages/private";
import Card from "./pages/card";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    useEffect(() => {
        generateStars();
      }, []);
    
      const starsRef = useRef(null);
    
      const generateStars = () => {
        const starsContainer = starsRef.current;
        const starCount = 1300;
        for (let i = 0; i < starCount; i++) {
          const star = document.createElement('div');
          star.className = 'star';
          star.style.left = `${Math.random() * 100}%`;
          star.style.top = `${Math.random() * 100}%`;
          star.style.width = `${Math.random() * 3 + 1}px`;
          star.style.height = `${Math.random() * 3 + 1}px`;
          starsContainer.appendChild(star);
        }
      };

    return (
        <div id="root">
          <div className="main-content light-speed-background text-center">
        <div className="stars" ref={starsRef}></div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Private />} path="/Private" />
                        <Route element={<Card />} path="/Card" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
            </div>
        </div>
    );
};

export default injectContext(Layout);
