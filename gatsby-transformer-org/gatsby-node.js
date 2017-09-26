const _ = require(`lodash`)
const org = require("./org/lib/org")
const crypto = require(`crypto`)
const extractMetaData = require('./metadata')



async function onCreateNode({ node, boundActionCreators, loadNodeContent }) {
    const { createNode, createParentChildLink } = boundActionCreators

    if (![`text/x-org`].includes(node.internal.mediaType)) {
        return
    }
    const content = await loadNodeContent(node)
    
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
    console.log(events)
    const metaData = extractMetaData(content)

    node.internal.type = 'org'
    node.excerpt = metaData.summary
    node.events = events
    node.frontmatter = {
        path: node.name,
        date: metaData.date,
        title: metaData.title,
        tags: metaData.tags,
    }
    node.internal.content = content
    node.html = body

    _.each(events, event => {
        const contentDigest = crypto
            .createHash(`md5`)
            .update(event.summary)
            .digest(`hex`)
        createNode({
            id: `${node.id} event ${event.anchor}`,
            parent: node.id,
            excerpt: event.summary,
            children: [],
            frontmatter: {
                path: `${node.name}/#${event.anchor}`,
                date: event.date,
                title: event.title,
                cover: event.cover
            },
            internal: {
                contentDigest,
                type: 'event',
            }
        })
    })
    const contentDigest = crypto
        .createHash(`md5`)
        .update(metaData.summary)
        .digest(`hex`)
    createNode({
        id: `${node.id} event root`,
        parent: node.id,
        excerpt: metaData.summary,
        children: [],
        frontmatter: {
            path: node.name,
            date: metaData.date,
            title: metaData.title,
            cover: '#'
        },
        internal: {
            contentDigest,
            type: 'event',
        }
    })
}

exports.onCreateNode = onCreateNode