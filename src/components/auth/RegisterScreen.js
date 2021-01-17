import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator'
import useForm from '../../hooks/useForm';
import { startRegisterWithEmailPasswordName } from '../../redux/actions/auth';
import { removeError, setError } from '../../redux/actions/ui';


export const RegisterScreen = () => {
    const [formValues, handlenInputChange, reset] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formValues;

    const distpatch = useDispatch();

    const { msgError } = useSelector((state) => state.ui);

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            distpatch(removeError());
            distpatch(startRegisterWithEmailPasswordName(email, password, name))
        }
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            distpatch(setError("name is required"));
            return false;
        } else if (!validator.isEmail(email)) {
            distpatch(setError('Email is not valid'));
            return false;
        } else if (password !== password2 || password.length < 5) {
            distpatch(setError("password should be at least caracters end match each other"));
            return false
        }
        return true;
    }
    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}>
                {msgError !== null && (
                    <div className="auth__alert-error">{msgError}</div>
                )}
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="offI"
                    value={name}
                    onChange={handlenInputChange}
                />


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
                <input
                    type="pasword"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handlenInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>


                <Link to="/auth/login" className="link">
                    Already registered?
                </Link>
            </form>
        </>
    )
}
