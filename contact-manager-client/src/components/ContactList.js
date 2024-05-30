import React, { useEffect, useState } from 'react';
import ContactItem from './ContactItem';
import ContactForm from './ContactForm';
import '../styles/ContactList.css';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5143/api/contacts')
            .then(response => response.json())
            .then(data => setContacts(data))
            .catch(error => console.error('Error fetching contacts:', error));
    }, []);

    const addContact = (contact) => {
        fetch('http://localhost:5143/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        })
        .then(response => response.json())
        .then(newContact => setContacts([...contacts, newContact]))
        .catch(error => console.error('Error adding contact:', error));
    };

    const editContact = (contact) => {
        fetch(`http://localhost:5143/api/contacts/${contact.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        })
        .then(response => response.json())
        .then(updatedContact => {
            setContacts(contacts.map(c => c.id === updatedContact.id ? updatedContact : c));
        })
        .catch(error => console.error('Error editing contact:', error));
    };

    const deleteContact = (id) => {
        fetch(`http://localhost:5143/api/contacts/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            setContacts(contacts.filter(contact => contact.id !== id));
        })
        .catch(error => console.error('Error deleting contact:', error));
    };

    return (
        <div className="contact-list container">
            <ContactForm onSave={addContact} />
            {contacts.map(contact => (
                <ContactItem key={contact.id} contact={contact} onEdit={editContact} onDelete={deleteContact} />
            ))}
        </div>
    );
};

export default ContactList;
