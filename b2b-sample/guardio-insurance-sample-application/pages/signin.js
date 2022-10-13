/*
 * Copyright (c) 2022 WSO2 LLC. (http://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *http://www.apache.org/licenses/LICENSE-2.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Animation, Button, Dropdown, Loader } from 'rsuite';
import config from '../config.json';
import styles from '../styles/Signin.module.css';

import "rsuite/dist/rsuite.min.css";
import LogoComponent from '../components/settingsComponents/logoComponent';
import { stringIsEmpty } from '../util/util/common/common';
import { LOADING_DISPLAY_BLOCK, LOADING_DISPLAY_NONE } from '../util/util/frontendUtil/frontendUtil';
import { orgSignin, redirect } from '../util/util/routerUtil/routerUtil';

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (session) {

    return redirect('/o/moveOrg');
  }

  return {
    props: {}
  }
}

export default function Signin(props) {

  const moveTime = 40;
  const [redirectSeconds, setRedirectSeconds] = useState(moveTime);

  useEffect(() => {
    if (redirectSeconds <= 1) {
      orgSignin();

      return;
    }

    setTimeout(() => {
      setRedirectSeconds((redirectSeconds) => redirectSeconds - 1);
    }, moveTime)
  }, [redirectSeconds, orgSignin]);

  return (
    <div className={styles.signinOuter}>
      <div className={styles.signinInner}>
        <LogoComponent imageSize='medium' />
        <Loader size='lg' content='Redirecting to the organization login. ' vertical/>
      </div>
    </div>
  )
}
