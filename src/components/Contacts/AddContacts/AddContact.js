import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../../Services/ContactService";
import ContactList from "../ContactList/ContactList";

const AddContact = () => {
  let Navigate = useNavigate();
  const [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      phone: "",
      email: "",
    },
  });

  let UpdateInput = (e) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [e.target.name]: e.target.value,
      },
    });
  };

  let { loading, contact, errorMessage } = state;

  let submitForm = async (e) => {
    e.preventDefault();
    try {
      let response = await ContactService.createContact(state.contact);
      if (response) {
        Navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      Navigate("/contact/add", { replace: false });
    }
  };
  return (
    <>
      {/* <pre>{JSON.stringify(state.contact)}</pre> */}
      <section className="add-contact pt-3 m-auto">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2 className="text-success ">Create Contact</h2>
              <p className="fst-italic">
              This is a software program that enables you to easily store and find contact information, such as names, addresses, and Phone numbers.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={submitForm}>
                <div className=" d-flex flex-column gap-2">
                  <input
                    required={true}
                    name="name"
                    value={contact.name}
                    onChange={UpdateInput}
                    type="text"
                    placeholder="Name"
                    className="form-control"
                  />
                  <input
                    required={true}
                    name="phone"
                    value={contact.phone}
                    onChange={UpdateInput}
                    type="number"
                    placeholder="Mobile Number"
                    className="form-control"
                  />
                  {/* <input type="file" placeholder="Photo" className="form-control"/> */}
                  <input
                    required={true}
                    name="email"
                    value={contact.email}
                    onChange={UpdateInput}
                    type="email"
                    placeholder="Email Id"
                    className="form-control"
                  />
                  <input
                    type="submit"
                    className="btn btn-success  fs-5"
                    value="Create"
                  />
                  <Link
                    to={"/contacts/list"}
                    className="btn btn-outline-danger"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddContact;
