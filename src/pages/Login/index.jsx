import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post('/users', { email });

      const id = response.data;

      localStorage.setItem('user_id', id);

      navigate('/dashboard');
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response.data.error.message)
      } else {
        toast.error('Error. Try later')
      }
    }
  }

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>
        <input
          id="email"
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <button className="btn" type="submit">Entrar</button>
      </form>
    </>
  )
}