// @flow
import React from 'react';
import Responsive from 'components/common/Responsive';
import MarkdownRender from 'components/common/MarkdownRender';
import './PostContent.scss';

type Props = {
  body: string,
};

const PostContent = ({ body }: Props) => (
  <div className="PostContent">
    <div className="post-thumbnail">
      <img src="https://velopert.com/wp-content/uploads/2018/02/blog-images.003.png" alt="" />
    </div>
    <div className="contents">
      <MarkdownRender body={body} />
    </div>
  </div>
);

export default PostContent;
