import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Home',
    url: '/home',
    icon: 'cil-star',
  },
  {
    name: 'Pools',
    url: '/pools',
    icon: 'cil-diamond',
  },
  {
    name: 'Governance',
    url: '/governance',
    icon: 'cil-library-building',
  },
  {
    name: 'About',
    url: '/about',
    icon: 'cil-magnifying-glass',
  },
  {
    divider: true,
  },
  {
    name: 'Community',
    url: 'https://community.digitalkaleido.com',
    icon: 'cil-home',
  },
  {
    name: 'DigitalKaleido',
    url: 'https://www.digitalkaleido.com',
    icon: 'cil-external-link',
    badge: {
      variant: 'danger',
      text: 'NEW',
    },
  },
  {
    name: 'Twitter',
    url: 'https://community.digitalkaleido.com',
    icon: 'cib-twitter',
  },
];
