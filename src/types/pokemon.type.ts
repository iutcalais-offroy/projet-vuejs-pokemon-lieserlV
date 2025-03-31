export interface Type {
  id: number;
  name: string;
}

export interface Attack {
  id: number;
  name: string;
  damages: number;
  typeId: number;
  type: Type[];
}

export interface Weakness {
  id: number;
  name: string;
}

export interface Pokemon {
  id: number;
  name: string;
  pokedexId: number;
  typeIds: Type;
  lifePoints: number;
  imageUrl: string;
  height: number;
  weight: number;
  attackId: number;
  weaknessId: number;
  attack: Attack;
  weakness: Weakness;
}
