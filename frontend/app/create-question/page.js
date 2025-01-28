"use client";
import React, { useState } from "react";

const CreateQuestion = () => {
    const [message, setMessage] = useState("Submit");
    const [formdata, setFormdata] = useState({
        index: "",
        answer: "",
        hint1: "",
        hint2: "",
        hint3: "",
        l1: "",
        l2: "",
        l3: "",
        l4: "",
        l5: "",
        l6: "",
        l7: "",
        l8: "",
        l9: "",
        l10: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Submitting...");
        console.log("Form Data before submission:", formdata);

        try {
            // Format the body to match the required structure
            const body = JSON.stringify({
                body: JSON.stringify(formdata),
            });

            const response = await fetch("https://40ikiwic12.execute-api.ap-southeast-2.amazonaws.com/questions/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: body,
            });
            const result = await response.json();
            console.log("Response from server:", result);
            if (response.ok) {
                console.log("Form submitted successfully", result);
                alert("Form submitted successfully");
                // Reset the form data
                setFormdata({
                    index: "",
                    answer: "",
                    hint1: "",
                    hint2: "",
                    hint3: "",
                    l1: "",
                    l2: "",
                    l3: "",
                    l4: "",
                    l5: "",
                    l6: "",
                    l7: "",
                    l8: "",
                    l9: "",
                    l10: "",
                });
            } else {
                console.error("Form submission failed", result);
                alert(`Form submission failed: ${result.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting form: " + error.message);
        } finally {
            console.log("Form Data after submission:", formdata);
            setMessage("Submit");
        }
    };

    // General input field rendering
    const renderInputField = (label, key) => (
        <div className="mb-4" key={key}>
            <label className="block text-gray-700">{label}:</label>
            <input
                type="text"
                value={formdata[key]}
                onChange={(e) => setFormdata({ ...formdata, [key]: e.target.value })}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-black">
                <h1 className="text-2xl font-bold mb-6 text-center text-black">Create Question</h1>
                <form onSubmit={handleSubmit}>
                    {renderInputField("Index", "index")}
                    {renderInputField("Answer", "answer")}
                    {renderInputField("Hint 1", "hint1")}
                    {renderInputField("Hint 2", "hint2")}
                    {renderInputField("Hint 3", "hint3")}

                    {["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9", "l10"].map((label, i) =>
                        renderInputField(`Option ${label.toUpperCase()}`, label)
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {message}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateQuestion;
