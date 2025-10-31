import React from 'react';
import './contactCard.css';

export default function ContactCard({ contact }) {
    return (
        <div style={{ marginBottom: "16px", display: "flex", gap: "12px" }}>
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
            <div style={{ border: "none", flex: 1 }}>
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
    );
}