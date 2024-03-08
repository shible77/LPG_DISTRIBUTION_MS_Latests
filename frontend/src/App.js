import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';
import UserManagement from './components/UserManagement';
import Contacts from './components/Contacts';
import Employee from './components/Employee';
import Product from './components/Product';
import Accounts from './components/Accounts';
import ContactReports from './components/ContactReports';
import Expanses from './components/Expanses';
import Income from './components/Income';
import Profile from './components/Profile';
import About from './components/About';
import ContactUs from './components/ContactUs';
import Register from './components/Register';
import AddEmployee from './components/AddEmployee';
import {useState } from 'react';
import axios from 'axios';
import AddProducts from './components/AddProducts';
import AddPurchases from './components/AddPurchases';
import ListPurchases from './components/ListPurchases';
import ListSales from './components/ListSales';
import AddSale from './components/AddSale';
import AddContacts from './components/AddContacts';
import ContactCustomers from './components/ContactCustomers';
import ContactSuppliers from './components/ContactSuppliers'
import Sells_Report from './components/Sells_Report';
import Purchase_Report from './components/Purchase_Report';
import Sells_Summary_Report from './components/Sells_Summary_Report';
import Purchases_Summary_Report from './components/Purchases_Summary_Report';
import StockList from './components/StockList';
import StockReport from './components/StockReport'
function App() {

  const [userName, setUserName] = useState('')

  const setName = (name) => {
    setUserName(name)
  }
  axios.defaults.withCredentials = true
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login userName={userName} setName={setName}/>} />
          <Route path='/home' element={<Home userName={userName} setName={setName}/>}>
            <Route path='/home/userManagement' element={<UserManagement userName={userName} />}></Route>
            <Route path='/home/contacts' element={<Contacts userName={userName} />}></Route>
            <Route path='/home/employee' element={<Employee userName={userName} />}></Route>
            <Route path='/home/addEmployee' element={<AddEmployee userName={userName} />}></Route>
            <Route path='/home/products' element={<Product userName={userName} />}></Route>
            <Route path='/home/addProducts' element={<AddProducts userName={userName}/>}></Route>
            <Route path='/home/accounts' element={<Accounts userName={userName} />}></Route>
            <Route path='/home/contactReports' element={<ContactReports userName={userName} />}></Route>
            <Route path='/home/listPurchases' element={<ListPurchases userName={userName} />}></Route>
            <Route path='/home/addPurchases' element={<AddPurchases userName={userName} />}></Route>
            <Route path='/home/listSales' element={<ListSales userName={userName} />}></Route>
            <Route path='/home/addSale' element={<AddSale userName={userName} />}></Route>
            <Route path='/home/StockList' element={<StockList userName={userName}/>}></Route>
            <Route path='/home/StockReport' element={<StockReport userName={userName}/>}></Route>            
            <Route path='/home/expanses' element={<Expanses userName={userName} />}></Route>
            <Route path='/home/income' element={<Income userName={userName} />}></Route>
            <Route path='/home/addContact' element={<AddContacts/>}></Route>
            <Route path='/home/contactCustomer' element={<ContactCustomers/>}></Route>
            <Route path='/home/contactSupplier' element={<ContactSuppliers/>}></Route>
            <Route path='/home/sells_Report' element={<Sells_Report/>}></Route>
            <Route path='/home/purchase_Report' element={<Purchase_Report/>}></Route>
            <Route path='/home/sells_Summary_Report' element={<Sells_Summary_Report/>}></Route>
            <Route path='/home/purchases_Summary_Report' element={<Purchases_Summary_Report/>}></Route>
          </Route>
          <Route path='/profile' element={<Profile userName={userName}/>} />
          <Route path='/about' element={<About userName={userName}/>} />
          <Route path='/contactUs' element={<ContactUs userName={userName}/>} />
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
