import { ReactNode } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function PageLayout({ children, header }: ContentLayoutProps) {
  return (
    <>
      <main
        id="page-container"
        className={`mx-auto flex max-w-[clamp(600px,_60vw,_1200px)] grid-rows-1 flex-col`}
      >
        {header && (
          <div
            className="mb-4 flex h-fit w-full justify-between items-center bg-gradient-to-r from-light to-indigo-600 rounded-b-md px-4 text-[clamp(2rem,_2vw,_4rem)] font-bold uppercase underline">
            <h1>{header}</h1>

            <div className="flex gap-4">
              <a href={"https://twitter.com/ChildishhAlbino"} target="_blank" rel="noreferrer">
                <FaTwitter className="text-text hover:text-darker" />
              </a>
              <a href={"https://github.com/ChildishhAlbino"} target="_blank" rel="noreferrer">
                <FaGithub className="text-text hover:text-darker" />
              </a>
              <a href={"https://www.linkedin.com/in/childishhalbino/"} target="_blank" rel="noreferrer">
                <FaLinkedin className="text-text hover:text-darker" />
              </a>
            </div>
          </div>
        )}
        <section
          id="page-content"
          className="flex min-h-[80vh] flex-col gap-4 px-4"
        >
          {children}
        </section>
        <footer
          id="pseudo-footer"
          className="mt-12 w-full max-w-[clamp(600px,_60vw,_1200px)] mobile:h-[50px]"
        />
      </main>
    </>
  );
}

PageLayout.defaultProps = {
  header: null
};

export interface ContentLayoutProps {
  children: ReactNode;
  header?: string;
}
