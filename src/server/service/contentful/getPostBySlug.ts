import { contentQuery } from "./contentQuery";
import { serialize } from "next-mdx-remote/serialize";
import remarkUnwrapImages from "remark-unwrap-images";
import { inputWrapper } from "../../api/inputWrapper";
import { getPlaiceholder } from "plaiceholder";
import { TRPCError } from "@trpc/server";
import { getImageDetails } from "@/server/utils/plaiceholder";
import AllComponents from "@/components";

export async function getPostBySlug({
                                      input: { slug }
                                    }: inputWrapper<getPostBySlugInput>) {
  const query = `query GetPosts($preview: Boolean, $slug: String!) {
    postCollection(where: { slug: $slug }, preview: $preview, limit: 1) {
      items {
        title
        description
        publicationDate
        latestEdit
        thumbnail {
          url
          width
          height
        }
        body
        keywords
        slug
      }
    }
  }`;

  const variables: getPostBySlugInput = { slug };

  try {
    const queryRes = await contentQuery<
      getPostBySlugQueryResponse,
      getPostBySlugInput
    >({
      query,
      variables
    });
    const [post] = queryRes.postCollection.items;
    if (!post) {
      throw Error(`No post for slug '${slug} was found...`);
    }
    const remarkPlugins = [remarkUnwrapImages];

    const timeKey = `${new Date().getTime()}: Serializing "${slug}" took`;
    console.time(timeKey);

    const promises = [
      findEmbeddedImages(post.body),
      serialize(post.body, {
        mdxOptions: {
          remarkPlugins,
          format: "mdx"
        }
      })
    ];

    const [imageDetails, serializedMdx] = await Promise.all(promises);
    console.timeEnd(timeKey);
    const thumbnailWithDetails = {
      ...post.thumbnail,
      details: await getImageDetails(post.thumbnail.url)
    };
    return {
      post: {
        ...post,
        serializedMdx,
        thumbnail: thumbnailWithDetails
      },
      imageDetails
    };
  } catch (e: any) {
    console.error(e);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
      // optional: pass the original error to retain stack trace
      cause: e
    });
  }
}

async function findEmbeddedImages(rawMdx: string) {
  const regex = /!\[.*\]\((.*?)\)/g;
  const urls: string[] = [];
  let match;

  while ((match = regex.exec(rawMdx)) !== null) {
    urls.push(match[1] as string);
  }

  const imageDetails = await Promise.all(
    urls.map(async (url) => {
      const details = await getImageDetails(url);
      return [url, details];
    })
  );
  return Object.fromEntries(imageDetails);
}

interface getPostBySlugInput {
  slug: String;
}

type getPostBySlugQueryResponse = {
  postCollection: {
    items: Array<any>
  }
}
