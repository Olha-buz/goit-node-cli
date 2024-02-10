const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    // ...твій код. Повертає масив контактів.
    try {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);
    } catch (err) {
        console.log(err.message);
    }
}

async function getContactById(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    try {
        const contacts = await listContacts();
        const findContact = contacts.find(contact => contact.id === contactId);
        if (!findContact) {
            return null
        };
        return findContact;
    } catch (err) {
        console.log(err.message);
    }
    
}

async function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    try {
        const contacts = await listContacts();
        const index = contacts.findIndex(contact => contact.id === contactId);
        if (index === -1) { return undefined };
        const removeContact = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return removeContact;
    } catch (err) {
        console.log(err.message);
    }
    

}

async function addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту (з id).
    try {
        const contacts = await listContacts();
        const newContact = {
            name,
            email,
            phone,
            id: v4,
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return newContact; 
    } catch (err) {
        console.log(err.message);
    }
    
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}