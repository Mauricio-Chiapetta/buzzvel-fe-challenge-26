export type ImageAsset = {
  src: string;
  /** Empty string for purely decorative images. */
  alt: string;
  width: number;
  height: number;
};

export type LinkItem = {
  label: string;
  href: string;
};
