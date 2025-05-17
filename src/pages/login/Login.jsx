import { useForm } from 'react-hook-form';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import logo from '../../assets/images/logo.png';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, isLoading } = useUser();
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => setShowPassword(prev => !prev);

    return (
        <>
            <div className={'login-wrapper'}>
                <form className={'login-card'} onSubmit={handleSubmit(login)}>
                    <img src={logo} alt="Logo" className={'login-logo'} />
                    <h2 className={'login-title'}>Iniciar sesión</h2>

                    <div className={'form-group'}>
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="ejemplo@correo.com"
                            {...register('email', {
                                required: 'El correo es obligatorio',
                                pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Formato de correo inválido',
                                },
                            })}
                        />
                        {errors.email && (
                        <span className={'error-text'}>
                            {errors.email.message}
                        </span>
                        )}
                    </div>

                    <div className={'form-group'}>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                                    required: 'La contraseña es obligatoria',
                                    minLength: {
                                    value: 4,
                                    message: 'Mínimo 4 caracteres',
                                },
                            })}
                        />
                        <button
                            type="button"
                            className={'toggle-password'}
                            onClick={togglePassword}
                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            tabIndex={-1}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                        {errors.password && (
                        <span className={'error-text'}>
                            {errors.password.message}
                        </span>
                        )}
                    </div>

                    <button type="submit" className={'login-btn'}>
                        Entrar
                    </button>

                    <p className={'register-link'}>
                        ¿No tienes cuenta? <Link to="/Register">Regístrate</Link>
                    </p>
                </form>
            </div>

            {isLoading && <LoadingOverlay />}
        </>
    );
};

export default Login;
