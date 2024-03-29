const { program } = require("commander");
const { listContacts, getContactById, addContact, removeContact } = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":

          const contactsAll = await listContacts();
          console.table(contactsAll);
      break;

    case "get":

          const get = await getContactById(id);
          console.log(get);
      break;

    case "add":

          const add = await addContact(name, email, phone);
          console.log(add);
      break;

    case "remove":

          const remove = await removeContact(id);
          console.log(remove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);