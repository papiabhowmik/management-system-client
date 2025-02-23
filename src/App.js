import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GetUser from './getUser/GetUser';
import GetCompany from './getCompany/GetCompany';
import CreateCompany from './createCompany/CreateCompany';
import CreateUser from './createUser/CreateUser';
import Search from './search/Search';
import Home from './home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-user" element={<GetUser />} />
        <Route path="/get-company" element={<GetCompany />} />
        <Route path="/create-company" element={<CreateCompany />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
 