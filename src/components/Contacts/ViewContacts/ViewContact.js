import React, { useState, useEffect } from "react";
import { EmailIcon, Icon, PhoneIcon } from "@chakra-ui/icons";
import { Link, useParams } from "react-router-dom";
import { ContactService } from "../../../Services/ContactService";
import Spinner from "../../spinner/Spinner";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

const ViewContact = () => {
  let { contactId } = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: "",
  });

  useEffect(() => {
    (async function () {
      try {
        setState({ ...state, loading: true });
        const response = await ContactService.getContact(contactId);
        setState({ ...state, loading: false, contact: response.data });
        // console.log(response.data);

      } catch (e) {
        console.error(e);
        setState({ ...state, loading: false, errorMessage: e.data });
      }
    })();
  }, [contactId]);

  let { loading, contact, errorMessage } = state;

  return (
    <>
      <pre>{JSON.stringify(contact)}</pre>
      <section className="view-contact-intro mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2 className="text-warning ">View Contact</h2>
              <p className="fst-italic">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Reprehenderit repellat fuga, quaerat excepturi odit ut odio
                vitae harum, praesentium eligendi delectus aut. Soluta nostrum,
                minus omnis magni rem eius delectus quibusdam sint nobis
                nostrum, minus omnis magni rem eius delectus quibusdam sint
                nobis.
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {Object.keys(contact).length> 0 && (        
            <section className="view-contact mt-3">
              <div className="container">
                <div className=" row ">
                  <div className="col-md-6 mb-4">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action">
                        <div className="fa fa-user" /> :{" "}
                        <span className="fw-bold p-3">{contact.name}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        <PhoneIcon></PhoneIcon> :
                        <span className="fw-bold p-3">{contact.phone}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        <EmailIcon></EmailIcon> :
                        <span className="fw-bold p-3">
                          {contact.email}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="">
                    <Link to={"/contacts/list"} className="btn btn-warning ">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </React.Fragment>
      )}
    </>
  );
};

export default ViewContact;
