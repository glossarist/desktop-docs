import React from 'react'
import { useRouteData } from 'react-static'
import { DocPage } from '../../types'
import { Link } from 'components/Links'
import { PageTitle } from 'components/typography'


export default () => {
  const { docPage }: { docPage: DocPage } = useRouteData()
  return (
    <div>
      <PageTitle>{docPage.data?.title}</PageTitle>
      <Link to="..">&larr; Back</Link>
      <br />

      <ul role="nav">
        {docPage.subpages?.map(p =>
          <li key={p.path}>
            <Link to={p.path}>{p?.title}</Link>
          </li>
        )}
      </ul>

      <p>{docPage.data?.excerpt}</p>
      <p>{docPage.data?.contents}</p>
    </div>
  )
}
