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
                <footer>
                    <small>
                        Last built: <i>{data.site.buildTimeZone}</i> with <b><a href="https://www.gatsbyjs.org">Gatsby</a></b>
                    </small>
                </footer>
            )}
        />
    )
}

export default PageFooter