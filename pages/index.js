import NpsForm from '../components/NpsForm';
import setupEntity from '../setup/VerifyEntity'

setupEntity();

export default function Home() {
  return (
    <div>
      <NpsForm />
    </div>
  );
}
