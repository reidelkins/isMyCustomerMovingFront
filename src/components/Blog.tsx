import React, { useState } from "react";

const Blog = ({ blogs }: any) => {
  const [shownBlogs, setShownBlogs] = useState(3);
  const increaseShownBlogs = () => {
    setShownBlogs(shownBlogs + 3);
  };

  return (
    <section className={`bg-background py-8`} id="blog">
      {blogs.length !== 0 ? (
        <>
          <div className={`container mx-auto px-2 pt-4 pb-12 text-primary `}>
            <h1
              className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
            >
              Recent Blogs
            </h1>
            <p className="mt-4 max-w-2xl text-2xl text-gray-900 lg:mx-auto text-center">
              Read Our Latest Blogs
            </p>
          </div>
          <div className=" w-auto flex flex-row flex-wrap">
            {blogs.slice(0, shownBlogs).map((blog: any, index: number) => (
              <>
                <div
                  key={index}
                  className={`w-full sm:w-11/12 md:w-1/3 p-6 flex flex-col`}
                >
                  <a
                    href={`blogs/${blog.node.slug}`}
                    className={`flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow`}
                  >
                    <img
                      src={blog.node.featuredImage.url}
                      className={`w-full h-64 object-cover`}
                    />
                    <p
                      className={`w-full text-gray-600 text-xs md:text-sm px-6`}
                    >
                      {blog.node.createdAt.slice(0, 10)}
                    </p>
                    <div
                      className={`w-full font-bold text-xl text-gray-900 px-6`}
                    >
                      {blog.node.title}
                    </div>
                    <p
                      className={`text-gray-800 font-serif text-base px-6 mb-5`}
                    >
                      {blog.node.excerpt}
                    </p>
                  </a>
                  <div
                    className={`flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6`}
                  >
                    <div className={`flex items-center justify-between`}>
                      <img
                        className={`w-8 h-8 rounded-full mr-4 avatar`}
                        data-tippy-content="Author Name"
                        src={blog.node.author.photo.url}
                        alt="Avatar of Author"
                      />

                      <p className={`text-gray-600 text-xs md:text-sm`}>
                        {blog.node.author.name}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          {shownBlogs < blogs.length && (
            <div className={`flex justify-center`}>
              <button
                onClick={increaseShownBlogs}
                className={`bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded`}
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : null}
    </section>
  );
};

export default Blog;

// const blogCard = (blog: any) => {
//   <>
//     <a
//       href={blog.href}
//       className={`flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow`}
//     >
//       <img src={blog.img} className={`w-full h-64 object-cover`} />
//       <p className={`w-full text-gray-600 text-xs md:text-sm px-6`}>
//         {blog.date}
//       </p>
//       <div className={`w-full font-bold text-xl text-gray-900 px-6`}>
//         {blog.title}
//       </div>
//       <p className={`text-gray-800 font-serif text-base px-6 mb-5`}>
//         {blog.description}
//       </p>
//     </a>
//     <div
//       className={`flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6`}
//     >
//       <div className={`flex items-center justify-between`}>
//         <img
//           className={`w-8 h-8 rounded-full mr-4 avatar`}
//           data-tippy-content="Author Name"
//           src={blog.img}
//           alt="Avatar of Author"
//         />
//         <p className={`text-gray-600 text-xs md:text-sm`}>{blog.author}</p>
//       </div>
//     </div>
//   </>;
// };
