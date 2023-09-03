const saveContactsToLocalStorage = (contacts) => {
  localStorage.setItem('contacts', JSON.stringify(contacts));

};

const loadContactsFromLocalStorage = () => {
  const storedContacts = localStorage.getItem('contacts');
  return storedContacts ? JSON.parse(storedContacts) : [];
};

export {saveContactsToLocalStorage, loadContactsFromLocalStorage};
