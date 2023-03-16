import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AddContact from "./components/Contacts/AddContacts/AddContact";
import ContactList from "./components/Contacts/ContactList/ContactList";
import ViewContact from "./components/Contacts/ViewContacts/ViewContact";
import EditContacts from "./components/Contacts/EditContacts/EditContact";
import Spinner from "./components/spinner/Spinner";
const App = () => {
  return (
    <>
      {/* <Spinner /> */}
      <Navbar />
      <div className="blur"></div>
      <div className="blur2"></div>
      <Routes>
        <Route path={"/"} element={<Navigate to={"/contacts/list"} />} />
        <Route path={"/contacts/list"} element={<ContactList />} />
        <Route path={"/contact/add"} element={<AddContact />} />
        <Route path={"/contact/view/:contactId"} element={<ViewContact />} />
        <Route path={"/contact/edit/:contactId"} element={<EditContacts />} />
      </Routes>
    </>
  );
};

export default App;
