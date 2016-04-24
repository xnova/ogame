/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.scss';
import SpaceButton from '../../components/SpaceButton';
import Link from '../../components/Link';

const title = 'Log In';

function Login(props, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>

      <div className={s.center}>
        <div className={s.inner}>
          <div className={s.brand}>
            <div className={s.brandCenter}>
              <div className={s.logo} style={{ backgroundImage: 'url(' + require('./logo.svg') + ')' }}></div>
              <div className={s.name} style={{ backgroundImage: 'url(' + require('./name.svg') + ')' }}></div>
            </div>
          </div>
          <form className={s.form}>
            <h1>One account. All universes. <p>Sign in with your <strong>Xnova</strong> Account</p></h1>
            <div className={s.controlGroup}>
              <label htmlFor="email">email</label>
              <input id="email" autoComplete="off" spellCheck="false" type="email" />
            </div>
            <div className={s.controlGroup}>
              <label htmlFor="password">Password</label>
              <input id="password" autoComplete="off" spellCheck="false" type="password" />
              <button className={s.forgotPassword}>Forgot password?</button>
            </div>
            <SpaceButton className={s.submit}>Sign In</SpaceButton>
            <footer>Need an account? <Link to="/register">Sign Up</Link></footer>
          </form>

        </div>
      </div>

    </div>
  );
}

Login.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Login);
