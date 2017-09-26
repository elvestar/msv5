import React from 'react'
import Link from 'gatsby-link'
import { Container } from 'react-responsive-grid'

import { rhythm, scale } from '../utils/typography'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/scss/styles.scss'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    if (location.pathname === rootPath) {
      header = (
        <nav className="navbar" id="header">
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand" to={"/"}>仲之地</Link>
            </div>
            <div className="navbar-collapse collapse bs-navbar-collapse">
              <ul className="nav navbar-nav">
                <li> <Link className="navbar-item" to={"/blog/"}>Blog</Link> </li>
                <li> <Link className="navbar-item" to={"/notes/"}>笔记</Link> </li>
                {/* <li><a className="navbar-item" href="/photos/">摄影</a></li> */}
                <li> <Link className="navbar-item" to={"/archives/"}>归档</Link> </li>
                <li> <Link className="navbar-item" to={"/timeline/"}>时间线</Link> </li>
                <li> <Link className="navbar-item" to={"/reading/notes/"}>读书笔记</Link> </li>
                <li> <Link className="navbar-item" to={"/about/"}>关于</Link> </li>
              </ul>
            </div>
          </div>
        </nav>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            Gatsby Starter Blog
          </Link>
        </h3>
      )
    }
    return (
      <div>
        {header}
        <div className="container m-t">
          {children()}
        </div>
      </div>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template
