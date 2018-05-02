// @flow
import React, { Component } from 'react';
import CloseIcon from 'react-icons/lib/io/close';
import cx from 'classnames';
import './WriteExtra.scss';
import WriteSelectLayouts from '../WriteSelectLayouts';

type Props = {
  visible: boolean,
  onSelectLayoutMode(mode: string): void,
};
type State = {
  animating: boolean,
};

class WriteExtra extends Component<Props, State> {
  animateTimeout: any;
  state = {
    animating: false,
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props.visible !== prevProps.visible) {
      this.animate();
    }
  }

  animate = () => {
    clearTimeout(this.animateTimeout);
    this.setState({
      animating: true,
    });
    this.animateTimeout = setTimeout(() => {
      this.setState({
        animating: false,
      });
    }, 150);
  };

  onSelectLayoutMode = (mode: string) => {
    this.props.onSelectLayoutMode(mode);
  };

  render() {
    const { animating } = this.state;
    const { visible } = this.props;

    if (!visible && !animating) return null;

    return (
      <div className={cx('WriteExtra', visible ? 'appear' : 'disappear')}>
        <section>
          <h4>레이아웃 설정</h4>
          <WriteSelectLayouts onSelect={this.onSelectLayoutMode} />
        </section>
      </div>
    );
  }
}

export default WriteExtra;
