'use client'

import { useState } from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'

interface IProductImages {
  image_urls: string[]
  product_name: string
}

const ProductImages = ({ image_urls, product_name }: IProductImages) => {
  const [currentImage, setCurrentImage] = useState(image_urls[0])

  const handleImageSelected = (image_url: string) => {
    setCurrentImage(image_url)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-center bg-accent">
        <Image
          src={currentImage}
          alt={product_name}
          height={0}
          width={0}
          sizes="vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain p-5"
        />
      </div>
      <div className="grid grid-cols-4 gap-2 px-8">
        {image_urls.map((image) => {
          return (
            <button
              key={image}
              className={clsx(
                'flex h-[50px] items-center justify-center rounded-lg bg-accent hover:bg-accent/95',
                {
                  'border-2 border-solid border-primary':
                    image === currentImage,
                },
              )}
              onClick={() => handleImageSelected(image)}
            >
              <Image
                src={image}
                alt={product_name}
                height={0}
                width={0}
                sizes="vw"
                className="h-auto max-h-[70%] w-auto max-w-[90%] object-contain"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ProductImages
