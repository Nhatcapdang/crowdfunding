import dynamic from 'next/dynamic';
import Loading from './loading';

const SwitchDark = dynamic(() => import('./switch-dark'), {
  loading: () => <Loading />,
});

const Explore = dynamic(() => import('./explore'), {
  loading: () => <Loading />,
});

const Header = dynamic(() => import('./header'), {
  loading: () => <Loading />,
});

export { SwitchDark, Explore, Header };
