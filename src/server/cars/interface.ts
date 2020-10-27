export interface carPromiseType {
  count: number;
  data: {
    categoryId: {
      name: string;
      description: string;
      id: string;
    };
    colors: string[];
    createdAt: number;
    description: string;
    id: string;
    name: string;
    number: string;
    priceMax: number;
    priceMin: number;
    thumbnail: {
      size: number;
      originalname: string;
      mimetype: string;
      path: string;
    };
    updatedAt: number;
  }[];
  field: {
    categoryId: {
      required: boolean;
      ref: string;
      populate: { filter: string; select: string[] };
      type: string;
      name: string;
    };
    colors: { required: boolean; array: boolean; type: string; name: string };
    description: { type: string; name: string };
    name: { required: boolean; type: string; name: string };
    number: { type: string; name: string };
    priceMax: { name: string; type: string; required: boolean };
    priceMin: { name: string; type: string; required: boolean };
    tank: { type: string; name: string };
    thumbnail: { required: boolean; type: string; name: string };
  };
}
