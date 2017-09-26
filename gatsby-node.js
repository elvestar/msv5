const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const select = require(`unist-util-select`)
const fs = require(`fs-extra`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pages = []
    const orgPost = path.resolve("./src/templates/org-post.js")
    resolve(
      graphql(
        `
      {
        allOrg(limit: 1000) {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
      }
    `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        _.each(result.data.allOrg.edges, edge => {
          createPage({
            path: edge.node.frontmatter.path,
            component: orgPost,
            context: {
              path: edge.node.frontmatter.path,
            },
          })
        })
      })
    )

  })
}

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {

  const { createNode, updateNode } = boundActionCreators
  // console.log(node.internal.type, node.internal.mediaType)
}