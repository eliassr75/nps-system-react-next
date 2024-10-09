import setupEntity from '../setup/setupEntity';

export async function getServerSideProps(context) {
  
  const entity = await setupEntity();

  if (entity) {
    return {
      redirect: {
        destination: `/${entity.slug}`, 
        permanent: false, 
      },
    };
  }

  
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


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    backgroundColor: '#f0f0f0', 
  },
  content: {
    textAlign: 'center', 
    padding: '20px',
    backgroundColor: '#fff', 
    borderRadius: '8px', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
  },
  heading: {
    fontSize: '2rem',
    color: '#ff0000', 
  },
  message: {
    fontSize: '1.2rem',
    color: '#333', 
  },
};
