import setupEntity from '../setup/setupEntity';

export async function getServerSideProps(context) {
  // Supondo que setupEntity seja uma função assíncrona que retorna a entidade
  const entity = await setupEntity();

  if (entity) {
    return {
      redirect: {
        destination: `/${entity.slug}`, // Redireciona para a página do slug da entidade
        permanent: false, // Define se o redirecionamento é temporário ou permanente
      },
    };
  }

  // Se não houver entidade, definir status de resposta 403 (Forbidden)
  context.res.statusCode = 403;
  return {
    props: {
      errorMessage: 'Acesso negado. Você não tem permissão para acessar essa página.',
    },
  };
}

export default function Home({ errorMessage }) {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Erro 403</h1>
        <p style={styles.message}>{errorMessage}</p>
      </div>
    </div>
  );
}

// Estilos para centralizar o conteúdo
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center', // Centraliza horizontalmente
    alignItems: 'center', // Centraliza verticalmente
    height: '100vh', // Define a altura para 100% da viewport
    backgroundColor: '#f0f0f0', // Fundo cinza claro para destacar a mensagem
  },
  content: {
    textAlign: 'center', // Alinha o texto no centro
    padding: '20px',
    backgroundColor: '#fff', // Fundo branco para o aviso
    borderRadius: '8px', // Bordas arredondadas
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para dar destaque
  },
  heading: {
    fontSize: '2rem',
    color: '#ff0000', // Cor vermelha para o título de erro
  },
  message: {
    fontSize: '1.2rem',
    color: '#333', // Cor cinza para o texto da mensagem
  },
};
