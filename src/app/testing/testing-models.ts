import { Item } from '../data/models';

export const mockItem: Item = {
  id: 1,
  description: 'I am a mock item',
  gold: {
    base: 200,
    purchasable: true,
    total: 300,
    sell: 150,
  },
  image: {
    full: '1.png',
    group: 'item',
    sprite: 'item1.png',
    w: 48,
    h: 0,
    x: 0,
    y: 0,
  },
  into: [''],
  maps: {
    11: true,
    12: true,
    21: true,
    22: false,
  },
  name: "Qumez's item",
  stats: {},
  tags: [],
  plaintext: '',
};
