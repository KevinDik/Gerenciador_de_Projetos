import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Components/Pages/Home'
import Company from './Components/Pages/Company'
import Contact from './Components/Pages/Contact'
import NewProject from './Components/Pages/NewProject'
import Projects from './Components/Pages/Projects'

import Container from './Components/Layouts/Container'
import NavBar from './Components/Layouts/NavBar'
import Footer from './Components/Layouts/Footer'


function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Switch>
        <Container customClass="min-height">
          <Route exact path="/"><Home/></Route>
          <Route exact path="/projects"><Projects/></Route>
          <Route exact path="/company"><Company/></Route>
          <Route exact path="/contact"><Contact/></Route>
          <Route exact path="/newproject"><NewProject/></Route>
        </Container>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
