import React from 'react'
import { Link as RouterLink, useLocation } from '@reach/router'
import styled from 'styled-components'
import * as theme from '../theme/colors'


interface LinkProps {
  to: string
  className?: string 
  disabled?: boolean
}
export const Link: React.FC<LinkProps> =
function ({ to, className, disabled, children }) {
  const loc = useLocation().pathname

  if (to?.startsWith('http') || disabled) {
    return <a className={className} href={disabled ? undefined : to}>{children}</a>;

  } else {
    return (
      <RouterLink
          className={className}
          to={`${loc.replace(/^\/|\/$/g, '')}/${to.replace(/^\/|\/$/g, '')}`}>
        {children}
      </RouterLink>
    );
  }
}


const buttonStyle = `
  padding: .5em .75em;
  color: white;
  text-decoration: none;

  & + & {
    margin-left: .5rem;
  }
`


export const Button = styled(Link)`
  ${buttonStyle}

  background: ${theme.link.css()};

  ${(props: LinkProps) => props.disabled && `
    cursor: not-allowed;
    background: silver;
  `}
`