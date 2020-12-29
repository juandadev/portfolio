import React from 'react';
import TagManager from 'react-gtm-module';

const TagManagerArgs = {
  gtmId: 'GTM-P9B2VRQ',
};

TagManager.initialize(TagManagerArgs);

const Home = () => (
  <>
    <div>Hola mundo!</div>
  </>
);

export default Home;
