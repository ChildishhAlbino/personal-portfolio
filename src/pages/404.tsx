import PageLayout from "@/components/layouts/page-layout";

function NotFoundPage() {
  return (
    <>
      <PageLayout>
                <span className={"prose prose-xl p-4"}>
                    <h1>404</h1>
                    <p>This is not the page you&apos;re looking for! 👋</p>
                    <p>
                        But it&apos;s the only one you&apos;ll get cos this path
                        404&apos;d
                    </p>
                </span>
      </PageLayout>
    </>
  );
}

export default NotFoundPage;
