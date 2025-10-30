import { useState } from "react";
import "./home.css";

const initialContacts = [
	{
		id: 1,
		name: "Alice Johnson",
		phone: "9876543210",
		email: "alice@example.com",
	},
	{ id: 2, name: "Bob Smith", phone: "8765432109", email: "bob@example.com" },
	{
		id: 3,
		name: "Charlie Brown",
		phone: "7654321098",
		email: "charlie@example.com",
	},
];

export default function App() {
	const [contacts, setContacts] = useState(initialContacts);
	const [search, setSearch] = useState("");
	const [newContact, setNewContact] = useState({
		name: "",
		phone: "",
		email: "",
	});

	const filteredContacts = contacts.filter((c) =>
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
			<h1>Contact List</h1>
			<div className="search">
				<input
					type="text"
					placeholder="Search contacts by name..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>

			<h3 style={{ fontWeight: "bold" }}>
				Contacts ({filteredContacts.length})
			</h3>

			<div
				className="contacts-container"
				style={{
					display: "flex",
					gap: "24px",
					alignItems: "flex-start",
				}}
			>
				<div className="contact-list" style={{ flex: 1 }}>
					<ul style={{ padding: 0, listStyle: "none" }}>
						{filteredContacts.map((contact) => (
							<li
								key={contact.id}
								style={{ marginBottom: "16px" }}
							>
								<h2 style={{ margin: 0 }}>{contact.name}</h2>
								<p style={{ margin: "4px 0" }}>
									{contact.phone}
								</p>
								<p style={{ margin: "4px 0" }}>
									{contact.email}
								</p>
							</li>
						))}
					</ul>
					{filteredContacts.length === 0 && <p>No contacts found.</p>}
				</div>
				<div className="contact-form" style={{ width: 320 }}>
					<div style={{ display: "flex", flexDirection: "row", marginLeft: 60, alignItems: "center", gap: 8 }}>
						<i class="bi bi-person-add"></i>
						<h5>Add Contact</h5>
					</div>
					<form
						onSubmit={handleAdd}
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "8px",
						}}
					>
						<label>Name *</label>
						<input
							type="text"
							placeholder="John Doe"
							value={newContact.name}
							onChange={(e) =>
								setNewContact({
									...newContact,
									name: e.target.value,
								})
							}
							style={{ width: "100%", boxSizing: "border-box" }}
							required
						/>
						<label>Phone *</label>
						<input
							type="tel"
							placeholder="1234567890"
							value={newContact.phone}
							onChange={(e) => {
								const value = e.target.value
									.replace(/\D/g, "")
									.slice(0, 10);
								setNewContact({ ...newContact, phone: value });
							}}
							pattern="[0-9]{10}"
							maxLength="10"
							style={{ width: "100%", boxSizing: "border-box" }}
							required
						/>
						<label>Email</label>
						<input
							type="email"
							placeholder="john@example.com"
							value={newContact.email}
							onChange={(e) =>
								setNewContact({
									...newContact,
									email: e.target.value,
								})
							}
							style={{ width: "100%", boxSizing: "border-box" }}
						/>
						<button type="submit">
							Add Contact
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
