import React from 'react';
import { PopupContextProvider } from "./context/PopupContext";
import { InterfaceContextProvider } from "./context/InterfaceContext";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from "./components/Navbar";
import ContactMe from "./pages/ContactMe"
import PopupContainer from "./components/PopupContainer";

function App() {
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
