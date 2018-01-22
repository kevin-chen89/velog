import React from 'react';
import BackIcon from 'react-icons/lib/md/arrow-back';
import './WriteHeader.scss';

const WriteHeader = () => {
  return (
    <div className="WriteHeader">
      <BackIcon className="back-icon" />
      <div className="title-area">
        <input
          placeholder="제목을 입력해주세요"
          autoFocus
        />
      </div>
      <div className="submit-button">
        작성하기
      </div>
    </div>
  );
};

export default WriteHeader;