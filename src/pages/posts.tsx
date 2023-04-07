import type { NextPage } from "next";
import { api } from "@/utils/api";
import Link from "next/link";
import { Loader } from "@/components/loader/loader";
import { PostAggregation } from "@/types/post";
import PageLayout from "@/components/layouts/page-layout";
import { DateTime } from "luxon";
import PostThumbnail from "@/components/post-thumbnail";

const PostsAggregationPage: NextPage = () => {
  const { data, isLoading, error, isStale } =
    api.contentful.getPosts.useQuery({});
  const { posts: rawPosts } = data || { posts: [] };

  const posts = rawPosts.map((post) => {
    const { publicationDate } = post;
    const newPublicationDate = DateTime.fromISO(publicationDate)
      .setLocale("au")
      .toLocaleString(DateTime.DATE_FULL);

    return {
      ...post,
      publicationDate: newPublicationDate
    };
  });
  return (
    <PageLayout header="Posts:">
            <span className="flex h-full flex-col gap-y-4">
                <span>
                    {isLoading && <Loader size={150} />}
                  {!isLoading && <ListOfPosts posts={posts} />}
                </span>
            </span>
    </PageLayout>
  );
};

export default PostsAggregationPage;

function ListOfPosts({ posts }: { posts: PostAggregation[] }) {
  return (
    <div className="flex flex-col gap-y-8">
      {posts &&
        posts.map((item) => {
          return <Card item={item} key={item.slug} />;
        })}
    </div>
  );
}

function Card({ item }: { item: PostAggregation }) {
  const topKeywords = item.keywords.slice(0, 5);
  const totalKeywords = topKeywords.length;
  const thumbnailProps = {
    ...item.thumbnail,
    fixedMaxHeight: 400,
    className: "mobile:justify-self-center desktop:justify-self-start px-2"
  };
  return (
    <>
      <div
        className="grid w-full border-b-2 border-light border-opacity-30 pb-4 mobile:grid-cols-1 mobile:gap-y-8 mobile:text-center desktop:grid-cols-[2fr,_5fr] desktop:gap-x-4 desktop:text-left">
        <PostThumbnail {...thumbnailProps} />

        <span className="border-l-text pl-4 desktop:border-l-2">
                    <Link
                      href={`/posts/${item?.slug}`}
                      className="text-[clamp(1rem,_6vw,_2rem)] text-text underline"
                    >
                        <h1>{item?.title}</h1>
                    </Link>
                    <div className="flex flex-col gap-1">
                        <i className="break-words text-[clamp(12px,_1vw,_1rem)]">
                            {item?.description}
                        </i>
                        <br />
                        <pre className="text-sm">
                            {item?.publicationDate} <small>UTC+11</small>
                        </pre>
                        <span
                          className="flex flex-wrap gap-4 text-sm mobile:justify-center mobile:self-center desktop:self-start">
                            {topKeywords.map((keyword, index) => {
                              const suffix =
                                index < totalKeywords - 1 ? "," : "";
                              return (
                                <i
                                  className="cursor-pointer text-text-darker underline"
                                  key={`${keyword}_${index}`}
                                >
                                  #{keyword}
                                  {suffix}
                                </i>
                              );
                            })}
                        </span>
                    </div>
                </span>
      </div>
    </>
  );
}
