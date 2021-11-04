import { useCallback } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export const Login = () => {
    const handleSubmit = useCallback(async e => {
        e.preventDefault()

        const { email, password } = e.target
    })
}