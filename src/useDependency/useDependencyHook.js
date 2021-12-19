import { useEffect, useState, useContext } from 'react';
import { getDataFromApi } from './getDataFromApi';
import { DependencyProviderContext } from './DependencyProvider';

// This is where we define the actual logic in a custom hook
export const useDependencyHook = content => {
  const { dependencies } = useContext(DependencyProviderContext);
  /**
   * We maintain the props state in this pattern
   * { user: null } or { user: { USER_DATA } }
   */
  const [props, setProps] = useState({
    [content]: null
  });

  // Returns the resolver function for current `content`
  // It is set to getDataFromApi always for our case
  const getResolver = () => getDataFromApi;

  useEffect(() => {
    // Check if the requested `content` is registered in dependencies config.
    if (!dependencies.filter(d => d.content === content)[0]) {
      throw new Error(`Did you forget to register dependency for ${content}?`);
    }

    // A helper to set the data in React state
    // Note the shape of prop state mentioned above
    const setPropsData = data => {
      setProps({
        [content]: data
      });
    };

    // Get the resolver function
    const resolver = getResolver();

    // Run the resolver to receive response
    const response = resolver();

    // Process a `Promise` if needed
    if (typeof response.then === 'function') {
      response.then(data => {
        // Set the props state once resolved
        setPropsData(data);
      });
    } else {
      // If response is not a Promise, simply set the props state
      // Later we will see how it can be useful
      setPropsData(response);
    }
  }, [content, dependencies]);

  // Output of useDependencyHook hook is the prop state for requested `content`
  return { [content]: props[content] };
};
