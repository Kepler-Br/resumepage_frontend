import React from 'react';
import { PopupContextProvider } from "./context/PopupContext";
import { InterfaceContextProvider } from "./context/InterfaceContext";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from "./components/Navbar";
import ContactMe from "./pages/ContactMe"
import PopupContainer from "./components/PopupContainer";
import MyProjects from "./pages/MyProjects";
import ProjectPage from "./pages/ProjectPage";
import "./App.css";
import ImageView from "./pages/ImageView";

function App() {
    console.log("Oh, hi there!");
    return (
        <div className="App">
          <InterfaceContextProvider>
            <PopupContextProvider>
              <BrowserRouter>
                <Navbar/>
                <div className="container-fluid mt-2">
                  <Switch>
                    {/*<Route exact path="/" component={AboutPage}*/}
                    <Route exact path="/contact_me" component={ContactMe} />
                    <Route exact path="/projects" component={MyProjects} />
                    <Route exact path="/project/:id" component={ProjectPage} />
                    <Route exact path="/image/:id" component={ImageView} />
                  </Switch>
                </div>
                <PopupContainer/>
              </BrowserRouter>
            </PopupContextProvider>
          </InterfaceContextProvider>
        </div>
    );
}

export default App;
