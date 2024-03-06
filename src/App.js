import React, {useState} from 'react';
import customers from './memdb.js'
import'./App.css'; //allows for being able to reference styles

function log(message){console.log(message);}

export function App(params) {
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  const [formObject, setFormObject] = useState(blankCustomer);
  let mode = (formObject.id >= 0) ? 'Update' : 'Add';

  const getCustomers =  function(){
    log("in getCustomers()");
  }

  const [customersList,setCustomersList] = useState(customers); //is this needed given lines 12-13?

  const handleListClick = (item) => {
    if (formObject.id === item.id) {//req 9, clicking on selected record removes the selection
      setFormObject(blankCustomer);
    } else {
      setFormObject(item);
    }
    log("in handleListClick()");
  }  

  const handleInputChange = function (event) {
    const { name, value} = event.target;
    setFormObject(prevState =>
      ({
        ...prevState,
        [name]: value
      }))
    log("in handleInputChange()");
  }

  let onCancelClick = function () {
    log("in onCancelClick()");
  }

  let onDeleteClick = () => {
      if (formObject.id >= 0) {//trying to delete the record in the customer list
          const updatedCustomers = customersList.filter(customer => customer.id !== formObject.id);
        
          setCustomersList(updatedCustomers);
          log("in onDeleteClick()");
          setFormObject(blankCustomer);
      }
  }

  let onSaveClick = function () {
    log("in onSaveClick()");
  }

  return (
    <div>
      <div className="boxed" >
        <h4>{mode}</h4>
        <table id="customer-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {customersList.map(//referencing new updated list after
              (item, index) => {
                return (<tr key={item.id} 
                className={(item.id === formObject.id )?'selected': ''} //Step 14
                onClick={()=>handleListClick(item)} 
                >
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                </tr>);
              }
            )}
          </tbody>
        </table>
    </div>
    <div className="boxed">
      <div>
        <h4>{mode}</h4>
      </div>
      <form >
        <table id="customer-add-update" >
          <tbody>
            <tr>
              <td className={'label'} >Name:</td>
              <td><input
                type="text"
                name="name"
                value={formObject.name}
                onChange={handleInputChange} //allows this field to be changesd
                placeholder="Customer Name"
                required /></td>
            </tr>
            <tr>
              <td className={'label'} >Email:</td>
              <td><input
                type="email"
                name="email"
                value={formObject.email}
                onChange={handleInputChange} //allows this field to be changed
                placeholder="name@company.com" /></td>
            </tr>
            <tr>
              <td className={'label'} >Pass:</td>
              <td><input
                type="text"
                name="password"
                value={formObject.password}
                onChange={handleInputChange} //allows this field to be changed
                placeholder="password" /></td>
            </tr>
            <tr className="button-bar">
              <td colSpan="2">
                <input type="button" value="Delete" onClick={onDeleteClick} />
                <input type="button" value="Save" onClick={onSaveClick} />
                <input type="button" value="Cancel" onClick={onCancelClick} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
    </div>
  );
}

export default App;