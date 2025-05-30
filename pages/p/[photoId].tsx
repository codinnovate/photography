import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Carousel from "../../components/Carousel";
import getResults from "../../utils/cachedImages";
import cloudinary from "../../utils/cloudinary";
import getBase64ImageUrl from "../../utils/generateBlurPlaceholder";
import type { ImageProps } from "../../utils/types";

const Home: NextPage = ({ currentPhoto }: { currentPhoto: ImageProps }) => {
  const router = useRouter();
  const { photoId, data } = router.query;
  console.log(data, photoId, 'sds');
  let index = Number(photoId);

  
  const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto?.public_id}.${currentPhoto?.format}`;

  return (
    <>
      <Head>
        <title>Olalifestyle | Photography</title>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const results = await getResults();
  if (!results) {
    return {
      notFound: true,
    };
  }

  let reducedResults: ImageProps[] = results.resources.map((result, i) => ({
    id: i,
    height: result?.height,
    width: result?.width,
    public_id: result.public_id,
    format: result.format,
  }));

  const photoId = Number(context.params?.photoId);
  if (isNaN(photoId)) {
    return {
      notFound: true,
    };
  }

  const currentPhoto = reducedResults.find((img) => img.id === photoId);
  if (!currentPhoto) {
    return {
      notFound: true,
    };
  }

  currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto);

  return {
    props: {
      currentPhoto,
    },
  };
};


export async function getStaticPaths() {
  // console.log(data, 'data')

  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}/*`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();

  let fullPaths = [];
  for (let i = 0; i < results.resources.length; i++) {
    fullPaths.push({ params: { photoId: i.toString() } });
  }

  return {
    paths: fullPaths,
    fallback: false,
  };
}
