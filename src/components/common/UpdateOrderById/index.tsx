import { getData } from '../../../server/data';
import { updateById } from '../../../server/updateById';

import { DataItem } from '../../../interfaces';

export const updateStatusOrderById = (
  action: string,
  id: string,
  obj: DataItem
) => {
  getData('orderStatus')
    .then((items) => {
      return items.data.filter((item) => item.name === action);
    })
    .then((statusId) =>
      updateById(id, { ...obj, orderStatusId: { id: statusId[0].id } }, 'order')
    );
};
