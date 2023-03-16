import React, { useState, useEffect } from "react";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { ContactService } from "../../../Services/ContactService";
import Spinner from "../../spinner/Spinner";

const ContactList = () => {
  let [query, setQuery] = useState({
    text: "",
  });
  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: "",
  });

  useEffect(() => {
    (async function () {
      try {
        setState({ ...state, loading: true });
        const response = await ContactService.getALlContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data,
        });
      } catch (e) {
        console.error(e);
        setState({ ...state, loading: false, errorMessage: e.data });
      }
    })();
  }, []);

  let clickDelete = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId);
      if (response) {
        setState({ ...state, loading: true });
        const response = await ContactService.getALlContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data,
        });
      }
    } catch (e) {
      setState({ ...state, loading: false, errorMessage: e.data });
    }
  };
  let searchContacts = (e) => {
    setQuery({
      ...query,
      text: e.target.value,
    });
    let allContacts = state.contacts.filter((contact) => {
      return contact.name.toUpperCase().includes(e.target.value.toUpperCase());
    });
    setState({
      ...state,
      filteredContacts: allContacts,
    });
  };
  let { loading, contacts, filteredContacts, errorMessage } = state;
  return (
    <>
      {/* <pre>{JSON.stringify(query.text)}</pre> */}

      <section className="contact-search">
        <div className="container mt-3">
          <div className="grid">
            <div className="row">
              <div className="col">
                <h2 className="h2">
                  Contact manager
                  <Link to={"/contact/add"} className="btn btn-primary ms-2">
                    <i className="fa fa-circle-plus " /> New
                  </Link>
                </h2>
                <p className="fst-italic">
                This is a software program that enables you to easily store and find contact information, such as names, addresses, and Phone numbers. 
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="row">
                  <div className="col">
                    <div className="mb-2">
                      <input
                        name="text"
                        value={query.text}
                        onChange={searchContacts}
                        type="text"
                        className="form-control"
                        placeholder="Search Name"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <input
                        type="submit"
                        value="Search"
                        className="btn btn-outline-dark  "
                        placeholder="Search Name"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {Object.keys(ContactService).length > 0 && (
            <section className="contact-list ">
              <div className="container mt-3 ">
                <div className="row">
                  {filteredContacts.length > 0 &&
                    filteredContacts.map((contact) => {
                      return (
                        <div className="col-md-6 " key={contact.id}>
                          <div className="card mb-4">
                            <div className="card-body">
                              <div className="row align-items-center d-flex justify-content-around">
                                <div className="container">
                                  <ul className="list-group">
                                    <li className="list-group-item list-group-item-action">
                                      <div className="fa fa-user" /> :
                                      <span className="fw-bold p-3">
                                        {contact.name}
                                      </span>
                                    </li>
                                    <li className="list-group-item list-group-item-action">
                                      <PhoneIcon></PhoneIcon> :
                                      <span className="fw-bold p-3">
                                        {contact.phone}
                                      </span>
                                    </li>
                                    <li className="list-group-item list-group-item-action">
                                      <EmailIcon></EmailIcon> :
                                      <span className="fw-bold p-3">
                                        {contact.email}
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                                <div className=" d-flex align-items-center justify-content-evenly  mt-3">
                                  <Link
                                    to={`/contact/view/${contact.id}`}
                                    className="btn btn-warning"
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                  <Link
                                    to={`/contact/edit/${contact.id}`}
                                    className="btn btn-primary"
                                  >
                                    <i className="fa fa-pen" />
                                  </Link>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => clickDelete(contact.id)}
                                  >
                                    <i className="fa fa-trash" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>
          )}
        </React.Fragment>
      )}
    </>
  );
};

export default ContactList;
