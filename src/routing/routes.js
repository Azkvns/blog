export const articles = {
  all: () => '/articles',
  bySlug: (slug) => `/articles/${slug}`,
  edit: (slug) => `/articles/${slug}/edit`,
  create: () => '/new-article',
};

export const user = {
  edit: () => '/profile',
  create: () => '/sign-up',
};

export const auth = {
  login: () => '/sign-in',
};
