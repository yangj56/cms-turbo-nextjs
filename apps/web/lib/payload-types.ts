/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    media: Media;
    'product-category': ProductCategory;
    product: Product;
    users: User;
    hero: Hero;
    social: Social;
    introduction: Introduction;
    feature: Feature;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    media: MediaSelect<false> | MediaSelect<true>;
    'product-category': ProductCategorySelect<false> | ProductCategorySelect<true>;
    product: ProductSelect<false> | ProductSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    hero: HeroSelect<false> | HeroSelect<true>;
    social: SocialSelect<false> | SocialSelect<true>;
    introduction: IntroductionSelect<false> | IntroductionSelect<true>;
    feature: FeatureSelect<false> | FeatureSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "product-category".
 */
export interface ProductCategory {
  id: string;
  title: string;
  sku: string;
  description: string;
  image: string | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "product".
 */
export interface Product {
  id: string;
  title: string;
  sku: string;
  description: string;
  category: string | ProductCategory;
  color?:
    | {
        colorName?: string | null;
        colorCode?: string | null;
        images?:
          | {
              image?: (string | null) | Media;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  datasheet?: (string | null) | Media;
  instruction?: (string | null) | Media;
  youtubeUrl: string;
  specificationOverviewInfo?:
    | {
        data?: string | null;
        id?: string | null;
      }[]
    | null;
  labelValuePairs?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  compatibleProducts?:
    | {
        product?: (string | null) | Product;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hero".
 */
export interface Hero {
  id: string;
  title: string;
  image: string | Media;
  buttonLabel: string;
  url: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "social".
 */
export interface Social {
  id: string;
  title: string;
  image: string | Media;
  url: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "introduction".
 */
export interface Introduction {
  id: string;
  title: string;
  description: string;
  buttonLabel: string;
  url: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "feature".
 */
export interface Feature {
  id: string;
  title: string;
  image: string | Media;
  url: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'product-category';
        value: string | ProductCategory;
      } | null)
    | ({
        relationTo: 'product';
        value: string | Product;
      } | null)
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'hero';
        value: string | Hero;
      } | null)
    | ({
        relationTo: 'social';
        value: string | Social;
      } | null)
    | ({
        relationTo: 'introduction';
        value: string | Introduction;
      } | null)
    | ({
        relationTo: 'feature';
        value: string | Feature;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "product-category_select".
 */
export interface ProductCategorySelect<T extends boolean = true> {
  title?: T;
  sku?: T;
  description?: T;
  image?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "product_select".
 */
export interface ProductSelect<T extends boolean = true> {
  title?: T;
  sku?: T;
  description?: T;
  category?: T;
  color?:
    | T
    | {
        colorName?: T;
        colorCode?: T;
        images?:
          | T
          | {
              image?: T;
              id?: T;
            };
        id?: T;
      };
  datasheet?: T;
  instruction?: T;
  youtubeUrl?: T;
  specificationOverviewInfo?:
    | T
    | {
        data?: T;
        id?: T;
      };
  labelValuePairs?: T;
  compatibleProducts?:
    | T
    | {
        product?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hero_select".
 */
export interface HeroSelect<T extends boolean = true> {
  title?: T;
  image?: T;
  buttonLabel?: T;
  url?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "social_select".
 */
export interface SocialSelect<T extends boolean = true> {
  title?: T;
  image?: T;
  url?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "introduction_select".
 */
export interface IntroductionSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  buttonLabel?: T;
  url?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "feature_select".
 */
export interface FeatureSelect<T extends boolean = true> {
  title?: T;
  image?: T;
  url?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}