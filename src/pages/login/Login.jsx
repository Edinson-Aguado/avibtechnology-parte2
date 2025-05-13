import { useForm } from 'react-hook-form';
import { useUser } from '../../context/UserContext';
import './Login.css';
import { Link } from 'react-router-dom';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, isLoading } = useUser();

    return (
        <>
            <div className="login-wrapper">
                <form className="login-card" onSubmit={handleSubmit(login)}>
                    <h2 className="login-title">Iniciar sesión</h2>

                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="ejemplo@correo.com"
                            {...register('email', {
                                required: 'El correo es obligatorio',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Formato de correo inválido'
                                }
                            })}
                        />
                        {errors.email && <span className="error-text">{errors.email.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', {
                            required: 'La contraseña es obligatoria',
                            minLength: {
                                value: 4,
                                message: 'Mínimo 4 caracteres'
                            }
                            })}
                        />
                        {errors.password && <span className="error-text">{errors.password.message}</span>}
                    </div>

                    <button 
                        type="submit" 
                        className="login-btn">
                            Entrar
                    </button>

                    <p className="register-link">¿No tienes cuenta? <Link to="/Register">Regístrate</Link></p>
                </form>
            </div>
            {isLoading && <LoadingOverlay/>}
        </>
        
    );
};

export default Login;
