import { useState } from 'react';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const NpsForm = () => {

  const [score, setScore] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (score === null) {
      alert('Selecione uma nota!');
      return;
    }
    
    if (name.trim() === '') {
      alert('O nome é obrigatório!');
      return;
    }
    
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ score, name, phone, feedback }),
    });

    if (response.ok) {
      alert('Avaliação enviada! Obrigado pelo seu feedback.');
    } else {
      alert('Ocorreu um erro. Tente novamente.');
    }
  };
  

  return (
    <MDBContainer>
      <form className='mt-5' onSubmit={handleSubmit}>
        <h1>Avaliação NPS</h1>
        <p>Qual a probabilidade de você nos recomendar de 0 a 10?</p>
        <div className='row p-2'>
          {[...Array(11).keys()].map((num) => (
            <MDBBtn
              key={num}
              name="score"
              id={`score-${num}`}
              color={score === num ? 'primary' : 'secondary'} // Muda a cor se o botão estiver selecionados
              type='button'
              onClick={() => setScore(num)}
              className='col m-1 mb-1 btn btn-lg border border-1'
            >
              {num}
            </MDBBtn>
          ))}
        </div>
        
        <div className='my-2'>
          <MDBInput
            type="text"
            label="Deixe seu nome (obrigatório)"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='my-2'>
          <MDBInput
            type="tel"
            label="Deixe um telefone (opcional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className='my-2'>
          <MDBInput
            type="textarea"
            label="Deixe um feedback (opcional)"
            rows="3"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
        <MDBBtn type="submit" className="mt-3">
          Enviar
        </MDBBtn>
      </form>
    </MDBContainer>
  );
};

export default NpsForm;
