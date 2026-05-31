
export const images = import.meta.glob(
  "../assets/images/*.png",
  {
    eager: true,
    import: "default",
  }
);

export const getImage = (name: string) => {
  return images[`../assets/images/${name}.png`] as string;
};