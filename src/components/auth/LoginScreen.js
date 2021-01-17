import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import useForm from '../../hooks/useForm'
import { startLoginEmailPassword, startGoogleLogin } from '../../redux/actions/auth';
import { removeError, setError } from '../../redux/actions/ui';

export const LoginScreen = () => {
    const [formValues, handlenInputChange, reset] = useForm({
        email: '',
        password: ''
    })

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.ui);

    const { email, password } = formValues;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isformValid()) {
            removeError()
            dispatch(startLoginEmailPassword(email, password))
        }

    }

    const isformValid = () => {
        if (email.trim().length === 0) {
            dispatch(setError('El email is required'))
            return false
        } else if (!validator.isEmail(email) || email.trim().length === 0) {
            dispatch(setError('Estableca un correo valido'))
            return false;
        }
        return true;
    }

    const handleLoginGoogle = () => {
        dispatch(startGoogleLogin());
    }
    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="offI"
                    value={email}
                    onChange={handlenInputChange}
                />
                <input
                    type="pasword"
                    placeholder="Contraseña"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handlenInputChange}
                />

                <button
                    disabled={loading}
                    type="submit"
                    className="btn btn-primary btn-block"

                >
                    Login
                    </button>



                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div
                        className="google-btn"
                        onClick={handleLoginGoogle}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register" className="link">
                    Create new account

                </Link>
            </form>
        </>
    )
}