import { useState } from "react";

const initialContacts = [
  { id: 1, name: "Alice Johnson", phone: "9876543210", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", phone: "8765432109", email: "bob@example.com" },
  { id: 3, name: "Charlie Brown", phone: "7654321098", email: "charlie@example.com" },
];

export default function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [search, setSearch] = useState("");
  const [newContact, setNewContact] = useState({ name: "", phone: "", email: "" });

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newContact.name.trim()) return;
    setContacts([...contacts, { id: Date.now(), ...newContact }]);
    setNewContact({ name: "", phone: "", email: "" });
  };

return (
    <div>
            <h1 style={{ textAlign: "center" }}>Contact List</h1>
            <input
                type="text"
                placeholder="Search contacts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <ul>
                {filteredContacts.map((contact) => (
                    <li key={contact.id}>
                        <h2>{contact.name}</h2>
                        <p>{contact.phone}</p>
                        <p>{contact.email}</p>
                    </li>
                ))}
                {filteredContacts.length === 0 && (
                    <p>No contacts found.</p>
                )}
            </ul>

            <form onSubmit={handleAdd}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newContact.email}
        />
        <button
          type="submit"
        >
          Add Contact
        </button>
      </form>
    </div>
  );
}