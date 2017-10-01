import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import concat from 'lodash/concat'
import Helmet from 'react-helmet'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    var posts = get(this, 'props.data.allOrg.edges')
    // posts = concat(posts, get(this, 'props.data.allOrg.edges'))

    return (
      <div>
        <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />
        <h3>共 {posts.length} 篇文章</h3>
        {posts.map(post => {
          if (post.node.path !== '/404/') {
            const title = get(post, 'node.frontmatter.title') || post.node.path
            return (
              <div key={post.node.frontmatter.path}>
                <h3 className="m-b-xs">
                  <Link
                    style={{ boxShadow: 'none' }}
                    to={post.node.frontmatter.path}
                  >
                    {post.node.frontmatter.title}
                  </Link>
                </h3>
                <small>{post.node.frontmatter.date}</small>
                <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
              </div>
            )
          }
        })}
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allOrg(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`
