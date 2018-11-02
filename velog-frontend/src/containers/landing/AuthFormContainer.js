// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, type RouterHistory } from 'react-router-dom';
import { AuthActions, UserActions, BaseActions } from 'store/actionCreators';
import type { State } from 'store';
import AuthForm from 'components/landing/AuthForm';
import { pressedEnter } from 'lib/common';
import type { SocialAuthResult, VerifySocialResult, AuthResult } from 'store/modules/auth';
import storage, { keys } from 'lib/storage';

type Props = {
  email: string,
  sentEmail: boolean,
  sending: boolean,
  isUser: boolean,
  socialAuthResult: SocialAuthResult,
  verifySocialResult: VerifySocialResult,
  authResult: AuthResult,
  history: RouterHistory,
  nextUrl: ?string,
};

class AuthFormContainer extends Component<Props> {
  githubLogin: any = null;

  onEnterKeyPress = pressedEnter(() => {
    this.onSendVerification();
  });

  onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = e.target;
    AuthActions.setEmailInput(value);
  };

  onSendVerification = async (): Promise<*> => {
    const { email } = this.props;
    try {
      await AuthActions.sendAuthEmail(email);
    } catch (e) {
      console.log(e);
    }
  };

  onSocialLogin = async (provider: string) => {
    if (provider === 'github') {
      window.location.replace(
        'https://github.com/login/oauth/authorize?scope=user:email&client_id=f51c5f7d1098d4a1cbdf',
      );
      return;
    }
    BaseActions.setFullscreenLoader(true);
    try {
      await AuthActions.socialLogin(provider);
    } catch (e) {
      BaseActions.setFullscreenLoader(false);
      return;
      // TODO: handle social login error
    }

    try {
      // CHECK ACCOUNT EXISTANCY
      const { socialAuthResult } = this.props;
      if (!socialAuthResult) return;
      const { accessToken } = socialAuthResult;
      await AuthActions.verifySocial({ accessToken, provider });

      const { verifySocialResult } = this.props;
      if (!verifySocialResult) return;
      const { exists } = verifySocialResult;

      if (exists) {
        // exists -> login
        await AuthActions.socialVelogLogin({ accessToken, provider });
        const { authResult } = this.props;
        if (!authResult) return;
        const { user } = authResult;
        UserActions.setUser(user);
        storage.set(keys.user, user);
        BaseActions.exitLanding();
        if (this.props.nextUrl) {
          this.props.history.push(this.props.nextUrl);
        }
      } else {
        // does not exist -> enroute to register, auto complete
        const { email, name } = verifySocialResult;
        if (!email || !name) {
          // TODO
        }
        AuthActions.autoCompleteRegisterForm({ email: email || '', name: name || '' });
        this.props.history.push('/register');
      }
    } catch (e) {
      // TODO: verify error
    }
    BaseActions.setFullscreenLoader(false);
  };

  onExitLanding = () => {
    BaseActions.exitLanding();
  };

  render() {
    const { onChange, onSendVerification, onEnterKeyPress, onSocialLogin, onExitLanding } = this;
    const { email, sentEmail, sending, isUser } = this.props;

    return (
      <AuthForm
        isUser={isUser}
        email={email}
        sending={sending}
        sentEmail={sentEmail}
        onChange={onChange}
        onSendVerification={onSendVerification}
        onEnterKeyPress={onEnterKeyPress}
        onSocialLogin={onSocialLogin}
        onExitLanding={onExitLanding}
      />
    );
  }
}

export default connect(
  ({ auth, pender }: State) => ({
    email: auth.email,
    sentEmail: auth.sentEmail,
    isUser: auth.isUser,
    sending: pender.pending['auth/SEND_AUTH_EMAIL'],
    socialAuthResult: auth.socialAuthResult,
    verifySocialResult: auth.verifySocialResult,
    authResult: auth.authResult,
    nextUrl: auth.nextUrl,
  }),
  () => ({}),
)(withRouter(AuthFormContainer));
