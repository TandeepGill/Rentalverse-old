import React from 'react';
import { connect } from 'react-redux';

import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from '@heroicons/react/outline';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '#', current: true },
  { name: 'Team', icon: UsersIcon, href: '#', current: false },
  { name: 'Projects', icon: FolderIcon, href: '#', current: false },
  { name: 'Calendar', icon: CalendarIcon, href: '#', current: false },
  { name: 'Documents', icon: InboxIcon, href: '#', current: false },
  { name: 'Reports', icon: ChartBarIcon, href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { name } = props;

  return (
    <div className='flex items-center px-4 space-y-5'>
      <h3 className='font-semibold'>Welcome, {name}!</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    name: state.auth.firstName,
  };
};

export default connect(mapState)(Home);
