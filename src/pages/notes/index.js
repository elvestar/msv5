import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'

import access from 'safe-access'
import moment from 'moment'
import sortBy from 'lodash/sortBy'
import _ from 'lodash'

import Utils from '../../utils/utils'

export default class BlogArchives extends React.Component {
    render() {
        const sortedPages = sortBy(this.props.route.pages, (page) =>
            access(page, 'data.date')
        ).reverse()
        const blogPages = _.filter(sortedPages, (page) => {
            return (_.startsWith(page.path, '/notes/'))
        })
        return (
            <div className="archives">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                <div className="page-header">
                    <h1><small>共 {blogPages.length} 篇笔记</small></h1>
                </div>
                <ArchivesList pages={blogPages} />
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        )
    }
}

class ArchivesList extends React.Component {
    render() {
        const pagesGroupByYear = _.groupBy(this.props.pages, (page) => {
            return (new Date(access(page, 'data.date'))).getFullYear()
        })
        return (
            <div>
                {
                    Object.keys(pagesGroupByYear).reverse().map(year => {
                        if (isNaN(year)) {
                            return
                        }
                        const pagesOfYear = pagesGroupByYear[year]
                        return (
                            <div key={year}>
                                <h3>{year}</h3>
                                <ul className="archives-item-list">
                                    {
                                        pagesOfYear.map((page, index) => {
                                            return (
                                                <li key={page.path}>
                                                    <span className="archives-date">{Utils.pageDate(page)}</span>
                                                    <span className="archives-divider"> » </span>
                                                    <Link className="archives-title" to={Utils.pageUrl(page)}>{page.data.title}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
