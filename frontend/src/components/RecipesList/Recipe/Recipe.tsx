import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import Styles from './Recipe.module.scss';

import loadingImgSvg from '../../../assets/img/loadingImg.svg';
import noPictureSvg from '../../../assets/img/noPicture.svg';

interface Props {
  name: string;
  id: string | undefined;
  imgSrc?: string;
  time?: string;
}
export default function Recipe({
  name,
  time,
  imgSrc,
  id
}: Props): ReactElement {
  const [imgStatus, setImgStatus] = useState('loading');

  const handleOnLoad = () => {
    setImgStatus('loaded');
  };

  const handleOnError = () => {
    setImgStatus('failed loading');
  };

  return (
    <Link to={`/recipe/${id}`} className={Styles.Recipe} data-cy="open-recipe">
      <img
        src={
          imgSrc && imgStatus === 'loading'
            ? loadingImgSvg
            : imgSrc && imgStatus === 'loaded'
            ? imgSrc
            : noPictureSvg
        }
        alt={name}
        onLoad={handleOnLoad}
        onError={handleOnError}
      />

      <h2>{name}</h2>
      <p>{time}</p>
    </Link>
  );
}
