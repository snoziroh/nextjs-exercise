'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const links = [
  { name: 'Home', href: '/', icon: HomeIcon  },
  {
    name: 'Posts',
    href: '/blog/posts',
    icon: DocumentDuplicateIcon,
  },
  { name: 'About', href: '/blog/about', icon: UserGroupIcon},
  { name: 'Contact', href: '/blog/contact', icon: EnvelopeIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md ${pathname !== link.href ? 'bg-gray-100' : 'bg-purple-200'} p-3 text-sm font-medium hover:bg-purple-100 md:flex-none md:justify-start md:p-2 md:px-3`}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}

    </>
  );
}