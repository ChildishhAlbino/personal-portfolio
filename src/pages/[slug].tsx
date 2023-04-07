import { api } from "@/utils/api";
import { GetStaticPathsResult, GetStaticPropsContext } from "next";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { appRouter } from "@/server/api/root";
import { MDXRemote } from "next-mdx-remote";
import { FC } from "react";
import { Loader } from "@/components/loader/loader";
import { getPages } from "@/server/service/contentful/getPages";
import AllComponents from "@/components";
import { MarkdownImage } from "@/components/markdown-image";
import Head from "next/head";

export default function MdxPage({ slug }: MdxPageProps) {
  const { data, isLoading } = api.contentful.getPageBySlug.useQuery({
    slug
  });

  if (isLoading || !data) {
    return (
      <>
        <Loader size={150} />
      </>
    );
  }

  const {
    page: { serializedMdx, title, css }
  } = data;
  return (
    <>
      <Head>
        <title>{`${title} | Childishh Albino`}</title>
        <style>{css}</style>
      </Head>
      <PageBody
        serializedMdx={serializedMdx}
        imageDetails={data.imageDetails}
      />
    </>
  );
}

const PageBody: FC<{ serializedMdx: any; imageDetails: object }> = ({
                                                                      serializedMdx,
                                                                      imageDetails
                                                                    }: any) => {
  const components = {
    img: (props: { src: string; alt: string }) => {
      const specificDetails = imageDetails[props.src];
      return (
        <MarkdownImage
          imageDetails={specificDetails}
          {...props}
          fixedMaxHeight={400}
          className="mx-auto"
        />
      );
    },
    ...AllComponents
  };
  const mdx = serializedMdx ? (
    <span>
            <MDXRemote {...serializedMdx} components={components} />
        </span>
  ) : (
    <>
      <Loader size={150} />
    </>
  );
  return <>{mdx}</>;
};

export async function getStaticProps({
                                       params
                                     }: GetStaticPropsContext<MdxPageProps>) {
  const ssg = await createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson // optional - adds superjson serialization
  });

  const slug = params?.slug as string;
  try {
    await ssg.contentful.getPageBySlug.fetch({ slug });
  } catch (e: any) {
    const cause = e.cause;
    if (cause.message.includes("No page for slug")) {
      return {
        notFound: true
      };
    }

    throw e;
  }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug
    },
    revalidate: 30
  };
}

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<MdxPageProps>
> {
  const data = await getPages({ input: {} });
  const paths = data.pages.map((page) => {
    return { params: { slug: page.slug } };
  });

  return {
    paths,
    fallback: "blocking"
  };
}

type MdxPageProps = {
  slug: string
}
