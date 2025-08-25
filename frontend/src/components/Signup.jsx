import React, { useContext, useState } from 'react'
import { authStyles as styles } from '../assets/dummyStyle'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { validateEmail } from '../utils/helper';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import { Input } from './Inputs';

function Signup({ setCurrentPage }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    async function handleSignup(e) {
        e.preventDefault();
        if (!fullName) {
            setError("Please enter Full Name");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
        if (!password) {
            setError("Please enter password");
            return;
        }
        setError('');

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name: fullName,
                email,
                password
            })
            const { token } = response.data
            if (token) {
                localStorage.setItem("token", token);
                updateUser(response.data);
                navigate("/dashboard")
            }
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong. Please try again.")
        }
    }

    return (
        <div className={styles.signupContainer}>
            <div className={styles.headerWrapper}>
                <h3 className={styles.signupTitle}>Create Account</h3>
                <p className={styles.signupSubtitle}>Join thousands of professionals today</p>
            </div>
            <form onSubmit={handleSignup} className={styles.signupForm}>
                <Input
                    value={fullName}
                    onChange={({ target }) => setFullName(target.value)}
                    placeholder="John Doe"
                    label="Full Name"
                    type="text"
                />
                <Input
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    placeholder="johndoe@example.com"
                    label="Email"
                    type="email"
                />
                <Input
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    placeholder="Min 8 characters"
                    label="Password"
                    type="password"
                />

                {error && <div className={styles.errorMessage}>{error}</div>}

                <button type='submit' className={styles.signupSubmit}>
                    Create Account
                </button>

                <p className={styles.switchText}>
                    Already have an account?{' '}
                    <button onClick={() => setCurrentPage("login")}
                        type='button' className={styles.signupSwitchButton}>
                        Sign In
                    </button>
                </p>
            </form>
        </div>
    )
}

export default Signup