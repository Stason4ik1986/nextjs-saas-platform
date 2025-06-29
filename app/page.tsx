import React from 'react';

import CTA from '@/components/CTA';
import CompanionCard from '@/components/CompanionCard';
import CompanionsList from '@/components/CompanionsList';

import { recentSessions } from '@/constants';

const HomePage = () => {
  return (
    <main>
      <h1>Popular Companions</h1>
      <section className='home-section'>
        <CompanionCard
          id='123'
          name='Neura the Brainy Expolorer'
          topic='Neural Network of the Brain'
          subject='science'
          duration={45}
          color='#ffda6e'
        />
        <CompanionCard
          id='456'
          name='Countsy the Number Wizard'
          topic='Derivatives & Integrals'
          subject='maths'
          duration={45}
          color='#e5d0ff'
        />
        <CompanionCard
          id='789'
          name='Verba the Vocabulary Builder'
          topic='English Literature'
          subject='language'
          duration={30}
          color='#bde7ff'
        />
      </section>
      <section className='home-section'>
        <CompanionsList
          title='Recently completed sessions'
          companions={recentSessions}
          classNames='w-2/3 max-lg:w-full'
        />
        <CTA />
      </section>
    </main>
  );
};

export default HomePage;
