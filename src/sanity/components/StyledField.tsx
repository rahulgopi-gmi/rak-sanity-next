import React from "react";
import { StringFieldProps } from "sanity";

export function StyledField(props: StringFieldProps) {
    return (
        <div
            style={{
                padding: "16px",
                border: "2px solid #4A90E2",
                borderRadius: "10px",
                background: "#F0F6FF",
                marginTop: "10px",
                marginBottom: "15px",
            }}
        >
            {/* Custom label */}
            <div style={{ fontWeight: "bold", marginBottom: "8px", fontSize: "14px" }}>
                {props.schemaType.title}
            </div>

            {/* Default Sanity input */}
            {props.renderDefault(props)}

            {/* Custom helper text */}
            <p style={{ marginTop: "6px", fontSize: "12px", color: "#555" }}>
                This is a styled field. Feel free to customize further!
            </p>
        </div>
    );
}
