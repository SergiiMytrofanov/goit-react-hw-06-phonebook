import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './FilterItem/FilterItem';
import styles from './App.module.css';
import { saveContactsToLocalStorage, loadContactsFromLocalStorage } from './ContactLocalStorage/localStoraje';
import { useSelector, useDispatch } from 'react-redux';
import {
  addContact,
  deleteContact,
  setFilter,
  toggleSearchByPhone,
  loadContacts,
} from './redux/contactSlice.js';

const App = () => {
  const contacts = useSelector((state) => state.contacts.contacts);
  const filter = useSelector((state) => state.contacts.filter);
  const searchByPhone = useSelector((state) => state.contacts.searchByPhone);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedContacts = loadContactsFromLocalStorage();
    dispatch(loadContacts(storedContacts));
  }, [dispatch]);
  useEffect(() => {
    saveContactsToLocalStorage(contacts);
  }, [contacts]);


  const handleAddContact = (newContact) => {
    const existingName = contacts.find(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    const existingNumber = contacts.find(
      (contact) => contact.number === newContact.number
    );

    if (existingName) {
      alert(`Контакт з ім'ям ${newContact.name} вже присутній у телефонній книзі.`);
      return;
    }

    if (existingNumber) {
      alert(`Контакт з номером телефону ${newContact.number} вже присутній у телефонній книзі.`);
      return;
    }

    dispatch(addContact({ ...newContact, id: nanoid() }));
  };


  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };


  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };


  const handleToggleSearchByPhone = () => {
    dispatch(toggleSearchByPhone());
  };


  const filteredContacts = contacts.filter((contact) =>
    searchByPhone
      ? contact.number.includes(filter)
      : contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.adressBookContainer}>
      <h1 className={styles.header}>Телефонна книга</h1>
      <ContactForm addContact={handleAddContact} />
      <div className={styles.contactContainer}>
        <h2 className={styles.subHeader}>Контакти</h2>
        <p className={styles.searchHeader}>Пошук за іменем або номером телефону</p>
        <Filter
          filter={filter}
          onChange={handleFilterChange}
          onToggleSearchByPhone={handleToggleSearchByPhone}
          searchByPhone={searchByPhone}
        />
        <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} /> 
      </div>
    </div>
  );
};

export default App;
