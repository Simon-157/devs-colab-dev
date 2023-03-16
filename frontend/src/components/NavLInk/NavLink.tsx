import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const { pathname } = useRouter();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <a className={`nav-link ${isActive ? 'active' : ''}`}>{children}</a>
    </Link>
  );
};

export default NavLink;
