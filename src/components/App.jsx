import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './FilterItem/FilterItem';
import styles from './App.module.css'
import { saveContactsToLocalStorage, loadContactsFromLocalStorage } from './ContactLocalStorage/localStoraje';

const App = () => {
 const [contacts, setContacts] = useState([]);
 const [filter, setFilter] = useState('')
 const [searchByPhone, setSearchByPhone] = useState(false);

  useEffect(() => {
    const storedContacts = loadContactsFromLocalStorage();
    setContacts(storedContacts);
  }, []);

  useEffect(() => {
    saveContactsToLocalStorage(contacts);
  }, [contacts]);

  const addContact = (newContact) => {
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

    setContacts((prevContacts) => [...prevContacts, { ...newContact, id: nanoid() }]);
  };


  const deleteContact = (id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };


  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleToggleSearchByPhone = () => {
    setSearchByPhone((prevSearchByPhone) => !prevSearchByPhone);
    setFilter('');
  };

  const getFilteredContacts = () => {
   return contacts.filter((contact) =>
      searchByPhone
        ? contact.number.includes(filter)
        : contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
      <div className={styles.adressBookContainer}>
        <h1 className={styles.header}>Телефонна книга</h1>
        <ContactForm addContact={addContact} />

        <div className={styles.contactContainer}>
          <h2 className={styles.subHeader}>Контакти</h2>
          <p className={styles.searchHeader}>Пошук за іменем або номером телефону</p>
          <Filter
            filter={filter}
            onChange={handleFilterChange}
            onToggleSearchByPhone={handleToggleSearchByPhone}
            searchByPhone={searchByPhone}
          />
          <ContactList contacts={filteredContacts} onDeleteContact={deleteContact} />
        </div>
      </div>
    );
  };


export default App;
