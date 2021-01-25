import React from 'react';
import { Input, Image } from 'antd';

import { showSrc } from '../../../../../../helper';
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

  const showImage = () => {
    if (thumbnail.path) {
      return (
        <Image
          src={showSrc(thumbnail)}
          alt={page}
          referrerPolicy="origin"
          crossOrigin="anonymous"
        />
      );
    }
  };

  return (
    <>
      {showImage()}
      <Input type="file" onChange={onInput} />
    </>
  );
};
