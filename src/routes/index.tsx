import ColorModeSwitcher from '~/components/ColorModeSwitcher';
import { Hello, links as helloLinks } from '~/components/Hello';
import type { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => ([
  ...helloLinks()
]);

export default () => {
  return (<div>
    <Hello/>
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0
      }}>
      <ColorModeSwitcher/>
    </div>
  </div>);

};
