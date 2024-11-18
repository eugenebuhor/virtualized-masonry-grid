import { Main, Section } from '../components/Layout.tsx';

const SuspenseFallback = () => {
  return (
    <Main>
      <Section>
        <div>Loading...</div>
      </Section>
    </Main>
  );
};

export default SuspenseFallback;
