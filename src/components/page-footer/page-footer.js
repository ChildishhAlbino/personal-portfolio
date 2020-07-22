import React from 'react'
import { StaticQuery, graphql } from "gatsby"

import './page-footer.scss'

const PageFooter = () => {
    return (
        <StaticQuery
            query={graphql`
                query {
                  site {
                    buildTimeZone
                  }
                }
              `}
            render={data => (
                <footer className="page-footer">
                    <small>
                        Last built: <i>{data.site.buildTimeZone}</i> with <b><a href="https://www.gatsbyjs.org">Gatsby</a></b>
                    </small>
                    <div className="link-wrapper">
                        <a href="https://github.com/ChildishhAlbino">Github</a>
                        <p>•</p>
                        <a href="https://github.com/ChildishhAlbino/childishhalbino.com">Source</a>
                        <p>•</p>
                        <a href="https://twitter.com/ChildishhAlbino">Twitter</a>
                    </div>
                </footer>
            )}
        />
    )
}

export default PageFooter