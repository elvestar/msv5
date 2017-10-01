module.exports = {
  siteMetadata: {
    title: "msv5",
    author: "zy",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    `gatsby-transformer-org`,
    `gatsby-plugin-sass`,
  ],
}
