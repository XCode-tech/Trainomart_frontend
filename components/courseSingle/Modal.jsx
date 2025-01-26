import React, { useState } from "react"
import API_URL from "@/data/config";

const Modal = ({ isOpen, onClose, onSubmit, pageItem }) => {
    const [email, setEmail] = useState("")

    if (!isOpen) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            email: email,
            course_name: pageItem.course_name // Passing the course name to the backend
        }
        console.log("data :", data);
        
        // Send the data to the Django backend API endpoint
        try {
            const response = await fetch(`${API_URL}/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            
            if (response.ok) {
                const result = await response.json()
                console.log("Success:", result)
                onSubmit(email) // Callback function after successful submit
                setEmail("") // Reset the form
            } else {
                console.error("Error:", response.statusText)
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <div className="fixed inset-0 z-100">
            {/* Backdrop with blur */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            {/* Modal Content */}
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="relative bg-[#f5f7fe] w-full max-w-md rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
                    <div className="p-6 text-center">
                        <h2 className="text-2xl font-semibold text-center mb-4">Inquire Now</h2>
                        {/* Dynamic Image */}
                        <img src={pageItem.course_image} alt="Course Image" className="w-1/3 h-auto mb-4" />
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="w-1">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="button -md -outline-dark-1 text-dark-1 w-1/1 mt-10 bg-white"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            {/* Hidden input for Course Name */}
                            <input
                                type="hidden"
                                name="course_name"
                                value={pageItem.course_name} // Passing course name
                            />

                                <button
                                    type="button"
                                    onClick={onClose}
                                    className=" -md -outline-dark-1 text-dark-1 w-1/2 mt-10"
                                    style={{
                                        // display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        verticalAlign: 'middle',
                                        textAlign: 'center',
                                        borderRadius: '8px',
                                        lineHeight: '1',
                                        fontWeight: '400',
                                        transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
                                        padding: '12px 55px',
                                        fontSize: '16px',
                                        lineHeight: '18px',
                                        fontWeight: '500',
                                        height: '60px',
                                        border: 'double',
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className=" -md -outline-dark-1 text-dark-1 w-1/2 mt-10"
                                    style={{
                                        // display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        verticalAlign: 'middle',
                                        textAlign: 'center',
                                        borderRadius: '8px',
                                        lineHeight: '1',
                                        fontWeight: '400',
                                        transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
                                        padding: '12px 55px',
                                        fontSize: '16px',
                                        lineHeight: '18px',
                                        fontWeight: '500',
                                        height: '60px',
                                        border: 'double',
                                    }}
                                >
                                    Submit
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
