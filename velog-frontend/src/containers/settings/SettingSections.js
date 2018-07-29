// @flow
import React, { Component, Fragment } from 'react';
import * as actions from 'store/actionCreators';
import type { State } from 'store';
import { connect } from 'react-redux';
import SettingSection from 'components/settings/SettingSection/SettingSection';
import SettingProfileContainer from './SettingProfileContainer';
import SettingsEtcContainer from './SettingsEtcContainer';

type Props = {};

class SettingSections extends Component<Props> {
  render() {
    return (
      <Fragment>
        <SettingSection name="프로필">
          <SettingProfileContainer />
        </SettingSection>
        <SettingSection name="기타">
          <SettingsEtcContainer />
        </SettingSection>
      </Fragment>
    );
  }
}

export default connect((state: State) => ({}), () => ({}))(SettingSections);
