import Image, { ImageProps } from 'next/image'

// eslint-disable-next-line prettier/prettier
interface IPromoBanner extends ImageProps { }

export const PromoBanner = ({ src, alt, ...rest }: IPromoBanner) => {
  return (
    <Image
      src={src}
      alt={alt}
      height={0}
      width={0}
      className="mt-5 h-auto w-full px-5"
      sizes="100vw"
      {...rest}
    />
  )
}
