import {TextField, Box, Grid, Paper, Table, TableBody, TableHead, TableRow, TableCell, TableContainer } from '@material-ui/core'
import React from 'react'
import { renderText, renderButton, renderInputText } from '../common/displayComponents'
import { useState, Fragment } from "react";
import { nanoid } from "nanoid";
// import "./form_table.css";
import data from "./data.json";
import ReadOnlyRow from "../ReadOnlyRow";
import EditableRow from "../EditableRow";

const Step2b = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    courseName: "",
    uniName: "",
    specialization: "",
    periodFrom: "",
    periodTo:"",
    grade:"",
  });

  const [editFormData, setEditFormData] = useState({
    courseName: "",
    uniName: "",
    specialization: "",
    periodFrom: "",
    periodTo:"",
    grade:"",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    console.log("run")
    // courseName: "",
    // uniName: "",
    // specialization: "",
    // periodFrom: "",
    // periodTo:"",
    // grade:"",
    const newContact = {
      id: nanoid(),
      courseName: addFormData.courseName,
      uniName: addFormData.uniName,
      specialization: addFormData.specialization,
      periodFrom: addFormData.periodFrom,
      periodTo: addFormData.periodTo,
      grade: addFormData.grade,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      courseName: editFormData.courseName,
      uniName: editFormData.uniName,
      specialization: editFormData.specialization,
      periodFrom: editFormData.periodFrom,
      periodTo: editFormData.periodTo,
      grade: editFormData.grade,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
        courseName: contact.courseName,
        uniName: contact.uniName,
        specialization: contact.specialization,
        periodFrom: contact.periodFrom,
        periodTo: contact.periodTo,
        grade: contact.grade,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Name of University</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Grade/Marks(%)</TableCell>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <Fragment>
                {/* {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                    // handleEditFormSubmit={handleEditFormSubmit}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )} */}
                <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </form>
      <Paper component={Box} p={2}>
      <h3>Add Course</h3>
      <Grid container spacing={2} p={2}>
      <form>
        {/* <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        /> */}
         {/* fullName: "",
    address: "",
    phoneNumber: "",
    email: "", */}
        {/* {renderInputText({label:"Enter", 
                name: "FullName",                  
                handleOnChange: handleAddFormChange })} */}
                <TextField
            label="Enter Course Name"
            // color={color ? color : "primary"}
            variant="outlined"
            name="courseName"
            // fullWidth={true}
            size="small"
            onChange={handleAddFormChange} 
            
            style={{margin:'1px'}}/>
            <TextField
            label="Enter university Name"
            // color={color ? color : "primary"}
            variant="outlined"
            name="uniName"
            // fullWidth={true}
            size="small"
            style={{margin:'1px'}}
            onChange={handleAddFormChange} />
            <TextField
            label="Specialization"
            // color={color ? color : "primary"}
            variant="outlined"
            name="specialization"
            // fullWidth={true}
            size="small"
            style={{margin:'1px'}}
            onChange={handleAddFormChange} />
            <TextField
            label="Period From"
            // color={color ? color : "primary"}
            variant="outlined"
            name="periodFrom"
            // fullWidth={true}
            size="small"
            style={{margin:'1px'}}
            onChange={handleAddFormChange} />
            <TextField
            label="Period To"
            // color={color ? color : "primary"}
            variant="outlined"
            name="periodTo"
            // fullWidth={true}
            size="small"
            style={{margin:'1px'}}
            onChange={handleAddFormChange} />
            <TextField
            label="Grade"
            // color={color ? color : "primary"}
            variant="outlined"
            name="grade"
            // fullWidth={true}
            size="small"
            style={{margin:'1px'}}
            onChange={handleAddFormChange} />
        {/* <input
          type="text"
          name="address"
          required="required"
          placeholder="Enter an addres..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        /> */}
        
        {renderButton({label:"Add", handleOnClick: handleAddFormSubmit})}        
      </form>
      </Grid>
      </Paper>
    </div>
  );
};

export default Step2b;