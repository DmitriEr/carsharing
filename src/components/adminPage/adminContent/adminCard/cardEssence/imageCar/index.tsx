import React from 'react';
import { Input, Image } from 'antd';

import { herokuapp } from '../../../../../../constants/server';
import { toBase64 } from '../../../../../../helper';
import { DataItem } from '../../../../../../interfaces';

type ImageType = {
  setEssence: (essence: DataItem) => void;
  essence: DataItem;
};

export const ImageCar: React.FunctionComponent<ImageType> = ({
  setEssence,
  essence,
}) => {
  const { thumbnail, page } = essence;

  const onInput = (e) => {
    const file = e.target.files[0];

    const { name, type, size } = file;
    const constants = { originalname: name, mimetype: type, size };

    toBase64(file).then((data) => {
      setEssence({
        ...essence,
        thumbnail: { ...constants, path: data },
      });
    });
  };

  return (
    <>
      {thumbnail.path ? (
        <Image
          src={
            thumbnail.path[0] === '/'
              ? `${herokuapp}${thumbnail.path}`
              : `${thumbnail.path}`
          }
          alt={page}
          referrerPolicy="origin"
          crossOrigin="anonymous"
        />
      ) : null}
      <Input type="file" onChange={onInput} />
    </>
  );
};
