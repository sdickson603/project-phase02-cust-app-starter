import React, { useState, useEffect } from 'react';
import './App.css';
import CustomerList from './CustomerList'; //imports the CustomerList JS component
import CustomerAddUpdate from './CustomerAddUpdate'; //imports the CustomerAddUpdate JS component
import { getAll, post, put, deleteById } from './memdb.js';

function log(message) {
  console.log(message);
}

function App(params) {
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);
  let mode = (formObject.id >= 0) ? 'Update Customer' : 'Add Customer';//this dymanically changes the heading
  useEffect(() => { getCustomers() }, []);

  const getCustomers = function () {
    log("in getCustomers()");
    setCustomers(getAll());
  }

  const handleListClick = function (item) {
    log("in handleListClick()");
    if (formObject.id === item.id) {
      setFormObject(blankCustomer);
    } else {
      setFormObject(item);
    }
  }

  const handleInputChange = function (event) {
    log("in handleInputChange()");
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = { ...formObject }
    newFormObject[name] = value;
    setFormObject(newFormObject);
  }

  const onCancelClick = function () {
    log("in onCancelClick()");
    setFormObject(blankCustomer);
  }

  const onDeleteClick = function () {
    if (formObject.id >= 0) {
      deleteById(formObject.id);
    }
    setFormObject(blankCustomer);
    log("in onDeleteClick()");
  }

  const onSaveClick = function () { //when the save button is clicked, mode is used to determine if its an add or update
    log("in onSaveClick()");
    if (mode === 'Add Customer') {
      post(formObject);
    }
    if (mode === 'Update Customer') {
      put(formObject.id, formObject);
    }
    setFormObject(blankCustomer);
  }

  return (
    <div>
      <h1 className="main-header">Client Database</h1>
      
      <CustomerList  //this loads from the customer list file building that structure
        customers={customers}
        formObject={formObject}
        handleListClick={handleListClick} 
      />
      <CustomerAddUpdate
        formObject={formObject}
        handleInputChange={handleInputChange}
        onCancelClick={onCancelClick}
        onDeleteClick={onDeleteClick}
        onSaveClick={onSaveClick}
        mode={mode}
      />
      <div className="logo-container">
        <div style={{ width: '100%', height: 0, paddingBottom: '48%', position: 'relative' }}>
          <iframe src="https://giphy.com/embed/2Xivj1ssDH0KgtTp86" width="100%" height="100%" style={{ position: 'absolute' }} frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      </div>
    </div>
    </div>
  );
}

export default App;
