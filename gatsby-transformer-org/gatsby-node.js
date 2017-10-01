const _ = require(`lodash`)
const org = require("./org/lib/org")
const crypto = require(`crypto`)
const extractMetaData = require('./metadata')



async function onCreateNode({ node, boundActionCreators, loadNodeContent }) {
    const { createNode, createParentChildLink } = boundActionCreators

    if (![`text/x-org`].includes(node.internal.mediaType)) {
        return
    }
    if (_.startsWith(node.relativePath, 'time/')) {
        return
    }

    const content = await loadNodeContent(node)
    console.log(node.relativePath)
    
    var orgParser = new org.Parser();
    var orgDocument = orgParser.parse(content);
    var orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {
        headerOffset: 1,
        exportFromLineNumber: false,
        suppressSubScriptHandling: false,
        suppressAutoLink: false,
        documentOptions: {
            toc: 2,
        }
    });
    const body = orgHTMLDocument.contentHTML
    const toc = orgHTMLDocument.tocHTML
    const events = orgHTMLDocument.events
    const metaData = extractMetaData(content)

    node_path = _.replace(node.relativePath, '.org', '/'),
    node.internal.type = 'org'
    node.excerpt = metaData.summary
    node.events = events
    node.path = node_path
    node.frontmatter = {
        path: node_path,
        date: metaData.date,
        title: metaData.title,
        tags: metaData.tags,
    }
    node.internal.content = content
    node.html = body

    // _.each(events, event => {
    //     const contentDigest = crypto
    //         .createHash(`md5`)
    //         .update(event.summary)
    //         .digest(`hex`)
    //     createNode({
    //         id: `${node.id} event ${event.anchor}`,
    //         parent: node.id,
    //         excerpt: event.summary,
    //         children: [],
    //         frontmatter: {
    //             path: `${node.path}#${event.anchor}`,
    //             date: event.date,
    //             title: event.title,
    //             cover: event.cover
    //         },
    //         internal: {
    //             contentDigest,
    //             type: 'event',
    //         }
    //     })
    // })
    
    // var contentDigest = crypto
    //     .createHash(`md5`)
    //     .update('nil')
    //     .digest(`hex`)
    // if (metaData.summary !== undefined) {
    //     contentDigest = crypto
    //         .createHash(`md5`)
    //         .update(metaData.summary)
    //         .digest(`hex`)
    // }
    // createNode({
    //     id: `${node.id} event root`,
    //     parent: node.id,
    //     excerpt: metaData.summary,
    //     children: [],
    //     frontmatter: {
    //         path: node.path,
    //         date: metaData.date,
    //         title: metaData.title,
    //         cover: '#'
    //     },
    //     internal: {
    //         contentDigest,
    //         type: 'event',
    //     }
    // })
}

exports.onCreateNode = onCreateNode