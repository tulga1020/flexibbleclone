import { graph, auth, connector, scalar, config } from "@grafbase/sdk";

// Welcome to Grafbase!
//
// Configure authentication, data sources, resolvers and caching for your GraphQL API.

const g = graph.Standalone();

const Project = g.type("Project", {
  title: scalar.string(),
  description: scalar.string(),
  image: scalar.url(),
  liveSiteUrl: scalar.url(),
  githubUrl: scalar.url(),
  category: scalar.string(),
  createdBy: scalar.string(),
});
const User = g.type("User", {
  name: scalar.string(),
  email: scalar.string(),
  avatarUrl: scalar.url(),
  description: scalar.string().optional(),
  githubUrl: scalar.url().optional(),
  linkedInUrl: scalar.url().optional(),
  projects: g.ref(Project).list().optional(),
});
const UserwithProject = g.type("UserwithProject", {
  project: g.ref(User),
});

// Data Sources - https://grafbase.com/docs/connectors
//
// const pg = connector.Postgres('pg', { url: g.env('DATABASE_URL') })
// g.datasource(pg)

// Resolvers - https://grafbase.com/docs/resolvers
//
// g.query('helloWorld', {
//   returns: g.string(),
//   resolver: 'hello-world',
// })

export default config({
  graph: g,
  // Authentication - https://grafbase.com/docs/auth
  auth: {
    // OpenID Connect
    // const oidc = auth.OpenIDConnect({ issuer: g.env('OIDC_ISSUER_URL') })
    // providers: [oidc],
    rules: (rules) => {
      rules.public();
    },
  },
  // Caching - https://grafbase.com/docs/graphql-edge-caching
  // cache: {
  //   rules: [
  //     {
  //       types: ['Query'], // Cache everything for 60 seconds
  //       maxAge: 60,
  //       staleWhileRevalidate: 60
  //     }
  //   ]
  // }
});
