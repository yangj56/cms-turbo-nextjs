import type { DocumentDefinition } from '@sanity/types';

export type CategoryDocumentDefinition = {
  id: string;
  name: string;
  description: string;
  image: string;
} & DocumentDefinition;

export type ProductDocumentDefinition = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: CategoryDocumentDefinition;
  price: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  material: string;
  color: string;
  power: {
    voltage: number;
    wattage: number;
  };
  lumens: number;
  beamAngle: number;
  ipRating: string;
  warranty: number;
} & DocumentDefinition;

export type PopularDocumentDefinition = {
  productIds: string[];
} & DocumentDefinition;
