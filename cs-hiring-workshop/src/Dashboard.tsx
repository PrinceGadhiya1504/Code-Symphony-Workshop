"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useNavigate } from 'react-router-dom'

export function Dashboard() {
    const [user, setUser] = useState({
        email: "",
        fullname: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get('http://localhost:3003/profile', { withCredentials: true })
                if (response.status === 200) {
                    setUser(response.data)
                } else {
                    setErrorMessage("Failed to fetch user details.")
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    setErrorMessage(error.response.data.message)
                } else {
                    setErrorMessage("Server Error")
                }
            }
        }

        fetchUserData()
    }, [])

    function handleLogout() {
        localStorage.removeItem('email')
        navigate('/')
    }

    return (
        <div className="w-full p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
            {errorMessage && (
                <Alert>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
            )}
            {user ? (
                <div className="mt-6">
                    <div className="p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">User Details</h2>
                        <p><strong>Email : </strong> {user.email}</p>
                        <p><strong>Full Name : </strong> {user.fullname}</p>
                        <p><strong>Password : </strong> {user.password}</p>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
