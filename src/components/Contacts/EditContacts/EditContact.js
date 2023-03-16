import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ContactService } from "../../../Services/ContactService";
import Spinner from "../../spinner/Spinner";

const EditContact = () => {
  let Navigate = useNavigate();

  let { contactId } = useParams();

  const [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      phone: "",
      email: "",
      errorMessage: "",
    },
  });

  useEffect(() => {
    (async function () {
      try {
        setState({ ...state, loading: true });

        const response = await ContactService.getContact(contactId);
        setState({ ...state, loading: false, contact: response.data });
      } catch (e) {
        console.error(e);
        setState({ ...state, loading: false, errorMessage: e.data });
      }
    })();
  }, [contactId]);
  let updateInput = (e) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [e.target.name]: e.target.value,
      },
    });
  };
  let formSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await ContactService.updateContact(
        state.contact,
        contactId
      );
      if (response) {
        Navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      Navigate(`/`, { replace: false });
    }
  };
  let { loading, contact, errorMessage } = state;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="add-contact pt-3 ">
            <div className="container">
              <div className="row">
                <div className="col">
                  <h3 className="text-primary ">Edit Contact</h3>
                  <p className="fst-italic">
                  This is a software program that enables you to easily store and find contact information, such as names, addresses, and Phone numbers.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <form onSubmit={formSubmit}>
                    <div className=" d-flex flex-column gap-2">
                      <input
                        required={true}
                        name="name"
                        value={contact.name}
                        onChange={updateInput}
                        type="text"
                        placeholder="Name"
                        className="form-control"
                      />
                      <input
                        required={true}
                        name="phone"
                        value={contact.phone}
                        onChange={updateInput}
                        type="number"
                        placeholder="Mobile Number"
                        className="form-control"
                      />
                      {/* <input
                    type="file"
                    placeholder="Photo"
                    className="form-control"
                  /> */}
                      <input
                        required={true}
                        name="email"
                        value={contact.email}
                        onChange={updateInput}
                        type="email"
                        placeholder="Email Id"
                        className="form-control"
                      />
                      <input
                        type="submit"
                        className="btn btn-primary  fs-5"
                        value="Update"
                      />
                      <Link
                        to={"/contacts/list"}
                        className="btn btn-outline-warning"
                      >
                        Close
                      </Link>
                    </div>
                  </form>
                </div>
                {/* <div className="col-md-6">
              <img src="" alt="UserImage" />
            </div> */}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
