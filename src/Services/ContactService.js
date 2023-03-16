import axios from "axios";

export class ContactService {
  static serverURL = `http://localhost:9000`;

  static getALlContacts() {
    let DataURL = `${this.serverURL}/contacts`;
    return axios.get(DataURL);
  }
  static getContact(contactId) {
    let DataURL = `${this.serverURL}/contacts/${contactId}`;
    return axios.get(DataURL);
  }
  static createContact(contact) {
    let DataURL = `${this.serverURL}/contacts`;
    return axios.post(DataURL, contact);
  }
  static updateContact(contact, contactId) {
    let DataURL = `${this.serverURL}/contacts/${contactId}`;
    return axios.put(DataURL, contact);
  }
  static deleteContact(contactId) {
    const dataURL = `http://localhost:9000/contacts/${contactId}`;
    return axios.delete(dataURL);
  }
}
