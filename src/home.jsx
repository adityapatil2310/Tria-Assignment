import { useState } from "react";
import "./home.css";
import ContactCard from "./components/contactCard.jsx";

const initialContacts = [
	{
		id: 1,
		name: "Alice Johnson",
		phone: "9876543210",
		email: "alice@example.com",
	},
	{
		id: 2,
		name: "Bob Smith",
		phone: "8765432109",
		email: "bob@example.com"
	},
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
	const [currentPage, setCurrentPage] = useState(1);
	const [editingId, setEditingId] = useState(null);
	const contactsPerPage = 4;

	const filteredContacts = contacts.filter((c) => {
		const q = search.toLowerCase().trim();
		const qDigits = search.replace(/\D/g, "");
		const nameMatch = q && c.name.toLowerCase().includes(q);
		const phoneMatch = qDigits && c.phone.replace(/\D/g, "").includes(qDigits);

		return (!q && !qDigits) || nameMatch || phoneMatch;
	});

	// Calculate pagination
	const indexOfLastContact = currentPage * contactsPerPage;
	const indexOfFirstContact = indexOfLastContact - contactsPerPage;
	const currentContacts = filteredContacts.slice(
		indexOfFirstContact,
		indexOfLastContact
	);
	const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

	const handleAdd = (e) => {
        e.preventDefault();
        if (!newContact.name.trim()) return;
        
        if (editingId) {
            // Update existing contact
            setContacts(contacts.map(contact => 
                contact.id === editingId 
                    ? { ...contact, ...newContact }
                    : contact
            ));
            setEditingId(null);
        } else {
            // Add new contact
            setContacts([...contacts, { id: Date.now(), ...newContact }]);
        }
        
        setNewContact({ name: "", phone: "", email: "" });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

	const handleDelete = (contactId) => {
		setContacts((prev) => {
			const updated = prev.filter((c) => c.id !== contactId);

			// Recompute filtered contacts based on current search
			const q = search.toLowerCase().trim();
			const qDigits = search.replace(/\D/g, "");
			const filteredAfterDelete = updated.filter((c) => {
				const nameMatch = q && c.name.toLowerCase().includes(q);
				const phoneMatch =
					qDigits && c.phone.replace(/\D/g, "").includes(qDigits);
				return (!q && !qDigits) || nameMatch || phoneMatch;
			});

			const totalPagesAfter = Math.ceil(
				filteredAfterDelete.length / contactsPerPage
			);

			// If current page becomes empty, move to previous valid page (or 1)
			setCurrentPage((prevPage) => {
				if (totalPagesAfter === 0) return 1;
				return prevPage > totalPagesAfter ? totalPagesAfter : prevPage;
			});

			return updated;
		});
	};

    const handleEdit = (contact) => {
        setNewContact({
            name: contact.name,
            phone: contact.phone,
            email: contact.email || ""
        });
        setEditingId(contact.id);
    };

    const handleCancelEdit = () => {
        setNewContact({ name: "", phone: "", email: "" });
        setEditingId(null);
    };

	return (
		<div>
			<h1>Contact List</h1>
			<div className="search" style={{marginBottom: "5%"}}>
				<i 
					className="bi bi-search" 
					style={{
						position: "absolute",
						left: "12px",
						top: "50%",
						transform: "translateY(-50%)",
						color: "#888",
						fontSize: "16px",
						pointerEvents: "none"
					}}
				></i>
				<input
					type="text"
					placeholder="Search contacts by name or phone..."
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						setCurrentPage(1);
					}}
				/>
			</div>

			<h3 style={{ fontWeight: "bold", margin: "0"}}>
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
						{currentContacts.map((contact) => (
							<ContactCard key={contact.id} contact={contact} onEdit={handleEdit} onDelete={handleDelete} />
						))}
					</ul>
					{filteredContacts.length === 0 && <p style={{fontSize: "20px", fontWeight: 300}}>No contacts found.</p>}

					{/* Pagination */}
					{totalPages > 1 && (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								gap: "8px",
								marginTop: "20px",
							}}
						>
							<button
								onClick={() =>
									handlePageChange(currentPage - 1)
								}
								disabled={currentPage === 1}
								style={{
									padding: "8px 12px",
									border: "1px solid #ccc",
									borderRadius: "4px",
									backgroundColor:
										currentPage === 1 ? "#f5f5f5" : "#fff",
									cursor:
										currentPage === 1
											? "not-allowed"
											: "pointer",
								}}
							>
								Previous
							</button>
							{Array.from(
								{ length: totalPages },
								(_, i) => i + 1
							).map((page) => (
								<button
									key={page}
									onClick={() => handlePageChange(page)}
									style={{
										padding: "8px 12px",
										border: "1px solid #ccc",
										borderRadius: "4px",
										backgroundColor:
											currentPage === page
												? "#0DAAF0"
												: "#fff",
										color:
											currentPage === page
												? "#fff"
												: "#000",
										cursor: "pointer",
										fontWeight:
											currentPage === page
												? "bold"
												: "normal",
									}}
								>
									{page}
								</button>
							))}
							<button
								onClick={() =>
									handlePageChange(currentPage + 1)
								}
								disabled={currentPage === totalPages}
								style={{
									padding: "8px 12px",
									border: "1px solid #ccc",
									borderRadius: "4px",
									backgroundColor:
										currentPage === totalPages
											? "#f5f5f5"
											: "#fff",
									cursor:
										currentPage === totalPages
											? "not-allowed"
											: "pointer",
								}}
							>
								Next
							</button>
						</div>
					)}
				</div>
				<div className="contact-form" style={{ width: 320 }}>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							gap: 8,
							height: 40,
							fontSize: "24px",
						}}
					>
						<i className="bi bi-person-add"></i>
						<h5>{editingId ? "Update Contact" : "Add Contact"}</h5>
					</div>
					<form
						onSubmit={handleAdd}
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "8px",
						}}
					>
						<label>Name*</label>
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
						<label>Phone*</label>
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
						<button type="submit">{editingId ? "Update Contact" : "Add Contact"}</button>
						{editingId !== null && (
							<button type="button" style={{ marginTop: "5px", backgroundColor: "#ef5959ff"}} onClick={handleCancelEdit}>Cancel</button>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
