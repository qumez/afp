interface IRawParams {
  [key: string]: any;
}

export interface Item {
  id: number;
  name: string;
  description: string;
  gold: Gold;
  image: Image;
  maps: Map;
  plaintext: string;
  stats: Stat;
  tags: string[];
  into: string[];
}

export interface Gold {
  base: number;
  purchasable: boolean;
  total: number;
  sell: number;
}

export interface Image {
  full: string;
  group: string;
  h: number;
  sprite: string;
  w: number;
  x: number;
  y: number;
}

export interface Map {
  11: boolean;
  12: boolean;
  21: boolean;
  22: boolean;
}

export interface Stat {
  FlatHPPoolMod?: number;
  FlatMagicDamageMod?: number;
  FlatSpellBlockMod?: number;
  FlatPhysicalDamageMod?: number;
  PercentAttackSpeedMod?: number;
}
export interface ItemResponse {
  basic: Item;
  data: ItemResponseItem;
  groups: ItemGroup[];
  tree: ItemTree;
}

export class ItemResponseItem implements IRawParams {
  [k: string]: Item;
}

export interface ItemGroup {
  [key: string]: ItemGroupItem;
}

export interface ItemGroupItem {
  id: string;
  MaxGroupOwnable: number;
}

export interface ItemTree {
  [key: string]: ItemTreeItem;
}

export interface ItemTreeItem {
  header: string;
  tags: string[];
}

export interface AppUser {
  uid: string;
  email: string;
  displayName?: string;
  emailVerified: boolean;
}
