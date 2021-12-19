import React from 'react';
import { DependencyProvider } from './useDependency';
import { User } from './User';

// Define dependencies array for the app
const dependencies = [{ content: 'user' }];

// Create config object for DependencyProvider
const config = { options: {}, dependencies };

const App = () => {
  return (
    <DependencyProvider config={config}>
      {/* Wrap the app with DependencyProvider for `useDependency` to work */}
      <div className="App">
        <User />
      </div>
    </DependencyProvider>
  );
};

export default App;
