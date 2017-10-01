import React from 'react'
import Link from 'gatsby-link'
import _ from 'lodash'
import concat from 'lodash/concat'
import Helmet from 'react-helmet'
import moment from 'moment'

class Timeline extends React.Component {
  render() {

    return (
      <div>
        <Helmet title={_.get(this, 'props.data.site.siteMetadata.title')} />

        <div className="timeline">
          <div className="row">
            <div className="col-md-9 timeline-content">
              <ul>
                {
                  this.props.data.allEvent.edges.map((edge) => {
                    const node = edge.node
                    console.log(node)
                    var divStyle = null;
                    if (node.excerpt === 'nil') {
                      divStyle = {
                        backgroundImage: 'url(' + node.frontmatter.cover + ')',
                        overflow: 'hidden',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }
                    } else {
                      divStyle = {}
                    };
                    return (
                      <li key={node.frontmatter.path} style={divStyle} className="text">
                        <Link to={node.frontmatter.path}>
                          {node.excerpt === 'nil' ? (
                            <div>
                            </div>
                          ) : (
                              <div>
                                <h3>{node.frontmatter.title}</h3>
                                <p>{node.excerpt}</p>
                              </div>
                            )}
                          <div className="info">
                            <em>{moment(node.frontmatter.date).format('l')}</em>
                            <small>
                            </small>
                          </div>
                        </Link>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Timeline

export const pageQuery = graphql`
  query TimelineQuery {
    site {
      siteMetadata {
        title
      }
    }
    allEvent {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date
            title
          }
        }
      }
    }
  }
`
