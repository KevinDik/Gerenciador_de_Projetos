import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Components/Pages/Home'
import Company from './Components/Pages/Company'
import Contact from './Components/Pages/Contact'
import NewProject from './Components/Pages/NewProject'
import Projects from './Components/Pages/Projects'
import Project from './Components/Pages/Project'

import Container from './Components/Layouts/Container'
import NavBar from './Components/Layouts/Navbar'
import Footer from './Components/Layouts/Footer'


function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Switch>
        <Container customClass="min-height">
          <Route exact path="/"><Home/></Route>
          <Route path="/projects"><Projects/></Route>
          <Route path="/company"><Company/></Route>
          <Route path="/contact"><Contact/></Route>
          <Route path="/newproject"><NewProject/></Route>
          <Route path="/project/:id"><Project/></Route>
        </Container>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
