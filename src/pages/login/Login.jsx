import { useForm } from 'react-hook-form';
import { useUser } from '../../context/UserContext';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useUser();

    const onSubmit = data => {
        login(data);
    };

    return (
        <div className="login-wrapper">
            <form className="login-card" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="login-title">Iniciar Sesión</h2>

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
                        placeholder="••••••••"
                        {...register('password', {
                        required: 'La contraseña es obligatoria',
                        minLength: {
                            value: 6,
                            message: 'Mínimo 6 caracteres'
                        }
                        })}
                    />
                    {errors.password && <span className="error-text">{errors.password.message}</span>}
                </div>

                <button type="submit" className="login-btn">Entrar</button>

                <p className="register-link">¿No tienes cuenta? <Link to="/Register">Regístrate</Link></p>
            </form>
        </div>
    );
};

export default Login;
