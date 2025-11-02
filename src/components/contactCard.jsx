import './contactCard.css';

export default function ContactCard({ contact, onEdit, onDelete }) {
    return (
        <div style={{ marginBottom: "16px", display: "flex", gap: "12px", position: "relative", paddingRight: "96px" }}>
            <i 
                className="bi bi-person" 
                style={{
                    fontSize: "40px",
                    height: "40px",
                    marginTop: "2%",
                    backgroundColor: "#0DAAF0",
                    color: "white",
                    padding: "10px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            ></i>
            <div style={{ border: "none", display: "flex", flexDirection: "row", justifyContent: "center", flex: 1 }}>
                <div style={{ flex: 1, border: "none" }}>
                    <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
                        {contact.name}
                    </h2>
                    <p style={{ margin: "4px 0", color: "#555" }}>
                        <i className="bi bi-telephone" style={{ marginRight: "8px" }}></i>
                        {contact.phone}
                    </p>
                    {contact.email && (
                        <p style={{ margin: "4px 0", color: "#555" }}>
                            <i className="bi bi-envelope" style={{ marginRight: "8px" }}></i>
                            {contact.email}
                        </p>
                    )}
                </div>
            </div>
            <div style={{ position: "absolute", top: "8px", right: "8px", display: "flex", gap: "8px", border: "none" }}>
                <button 
                    onClick={() => onEdit(contact)}
                    style={{
                        padding: "6px 6px 6px 12px",
                        backgroundColor: "#039a63ff",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    <i className="bi bi-pencil" style={{ marginRight: "4px" }}></i>
                </button>
                <button 
                    onClick={() => onDelete(contact.id)}
                    style={{
                        padding: "6px 6px 6px 10px",
                        backgroundColor: "#ef5959ff",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    <i className="bi bi-trash" style={{ marginRight: "4px" }}></i>
                </button>
            </div>
        </div>
    );
}