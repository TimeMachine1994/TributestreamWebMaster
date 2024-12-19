import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, cookies }) => {
  const authToken = cookies.get('auth_token');

  if (!authToken) {
    return {
      authenticated: false
    };
  }

  if (params.slug === 'hello-world') {
    return {
      authenticated: true,
      title: 'Hello world!',
      content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
    };
  }

  return {
    authenticated: true
  };
};
