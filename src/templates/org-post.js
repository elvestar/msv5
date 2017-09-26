import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

class OrgPostTemplate extends React.Component {
  render() {
    const post = this.props.data.org
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <h1>{post.frontmatter.title}</h1>
        <p>
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr/>
      </div>
    )
  }
}

export default OrgPostTemplate

export const pageQuery = graphql`
  query OrgPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    org(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
