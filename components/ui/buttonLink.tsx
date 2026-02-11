import Link from 'next/link'
import React from 'react'

interface MMLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string
    children?: React.ReactNode
}

const MMLink = React.forwardRef<HTMLAnchorElement, MMLinkProps>(
  ({ className = '', href, ...props }, ref) => {
    const defaultStyles = 'cursor-pointer duration-300 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
    
    return (
      <Link
        href={href}
        ref={ref}
        className={`${defaultStyles} ${className}`}
        {...props}
      />
    )
  }
)

MMLink.displayName = 'MMLink'

export default MMLink
