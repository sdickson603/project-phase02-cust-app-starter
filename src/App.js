import React, { useState, useEffect } from 'react';
import './App.css';
import CustomerList from './CustomerList';
import CustomerAddUpdate from './CustomerAddUpdate';
import { getAll, post, put, deleteById } from './memdb.js';

function log(message) {
  console.log(message);
}

function App(params) {
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);
  let mode = (formObject.id >= 0) ? 'Update' : 'Add';
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

  const onSaveClick = function () {
    log("in onSaveClick()");
    if (mode === 'Add') {
      post(formObject);
    }
    if (mode === 'Update') {
      put(formObject.id, formObject);
    }
    setFormObject(blankCustomer);
  }

  return (
    <div>
      <h1 className="main-header">Client Database</h1>
      <CustomerList
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
    </div>
  );
}

export default App;
