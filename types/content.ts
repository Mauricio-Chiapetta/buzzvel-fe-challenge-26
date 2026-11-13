export type ImageAsset = {
  src: string;
  /** Empty string for purely decorative images. */
  alt: string;
  width: number;
  height: number;
};

export type Person = {
  name: string;
  role: string;
  image: ImageAsset;
};

export type LinkItem = {
  label: string;
  href: string;
};
