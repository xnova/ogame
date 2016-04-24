import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SpaceButton.scss';

function SpaceButton({ children, className }) {
  return (
    <div className={cx(s.root, className)}>
      <span className={s.bgNormal}></span>
      <span className={s.bgHover}></span>
      <span className={s.content}>{ children }</span>
    </div>
  );
}

export default withStyles(s)(SpaceButton);
