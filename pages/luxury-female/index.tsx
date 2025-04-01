import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useLastViewedPhoto } from "../../utils/useLastViewedPhoto";
import Modal from "../../components/Modal";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";
import cloudinary from "../../utils/cloudinary";
import getBase64ImageUrl from "../../utils/generateBlurPlaceholder";
import { ImageProps } from "../../utils/types";
import HeroComp from "../../components/HeroComp";
import { ArrowDownTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import downloadPhoto from "../../utils/downloadPhoto";

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <>
      <Head>
        <title>Olalifestyle</title>
        <meta
          property="og:image"
        />
        <meta
          name="twitter:image"
        />
      </Head>
      <main className="mx-auto max-w-[1960px]">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )}
        <HeroComp
         text='Luxury Female Photography'
        />
          <div className="columns-1 p-4 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
    {images.map(({ id, public_id, format, blurDataUrl }) => (
      <div
        onClick={() => setSelectedImage({ id, public_id, format, blurDataUrl })}
        key={id}
        ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
        className="group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
      >
        <Image
          alt="olalifestyle photography"
          className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
          placeholder="blur"
          blurDataURL={blurDataUrl}
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
          width={720}
          height={480}
          sizes="(max-width: 640px) 100vw,
                (max-width: 1280px) 50vw,
                (max-width: 1536px) 33vw,
                25vw"
        />
      </div>
    ))}
  </div>

  {/* MODAL OUTSIDE THE MAP */}
  {selectedImage && (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50">
        
        <div className="relative">
         <div 
          className="absolute top-0 p-5 w-full flex items-center justify-between  rounded-full">
        <button
        onClick={() => setSelectedImage(null)}
        className="rounded-full  bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        
         <button
          onClick={() =>
            downloadPhoto(
              `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${selectedImage.public_id}.${selectedImage.format}`,
              `${selectedImage.id}.jpg`
            )
          }
          className="rounded-full  bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
          title="Download fullsize version"
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
        </button>

          </div>

        <Image
          alt="olalifestyle photography"
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_1080/${selectedImage.public_id}.${selectedImage.format}`}
          width={1000}
          height={600}
          className='h-screen object-cover'
          loading="lazy"
          blurDataURL={selectedImage.blurDataUrl}
        />
       
      </div>
    </div>
  )}
</main>
      <Footer />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_FEMALE}/*`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();

  let reducedResults: ImageProps[] = [];

  results.resources.forEach((result, index) => {
    reducedResults.push({
      id: index,
      height: result.height ?? null, // Use null if undefined
      width: result.width ?? null,   // Use null if undefined
      public_id: result.public_id,
      format: result.format,
    });
  });

  const blurImagePromises = reducedResults.map((image) =>
    getBase64ImageUrl(image)
  );
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  reducedResults = reducedResults.map((image, index) => ({
    ...image,
    blurDataUrl: imagesWithBlurDataUrls[index],
  }));

  return {
    props: {
      images: reducedResults,
    },
  };
}
