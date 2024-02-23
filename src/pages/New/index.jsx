import  { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function New() {
  const [thumbnail, setThumbnail] = useState(null); // para preview
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  // useMemo, memoriza em uma variável o valor de outra variável
  const preview = useMemo(() => {
                        // URL variável do html temporária
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spots', data, {
      headers: { user_id }
    })

    navigate('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Na label foi colocada o useMemo() preview como background  */}
      <label 
        id="thumbnail" 
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : ''}
      > 
      {/* no event.target.files[0] pega a posição 0 do array que tem em files, capturando o nome do arquivo */}
        <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
        <img src={camera} alt="Select img" />
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input 
        id="company"
        placeholder="Sua empresa incrível"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
      <input 
        id="techs"
        placeholder="Quais tecnologias usam?"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
      <input 
        id="price"
        placeholder="Valor cobrado por dia"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />

      <button type="submit" className="btn">Cadastrar</button>
    </form>
  )
}