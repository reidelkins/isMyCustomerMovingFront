import glob from "glob";

import { getPosts } from "./api/posts";

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }: any) => {
  const BASE_URL = "https://www.ismycustomermoving.com";

  const pagesDir = "./src/pages/**/*.tsx";
  let pagesPaths = await glob.sync(pagesDir);

  pagesPaths = pagesPaths
    .filter((path: string | string[]) => !path.includes("["))
    .filter((path: string | string[]) => !path.includes("/_"))
    .filter((path: string | string[]) => !path.includes("404"));
  const staticPaths = pagesPaths.map((path: string) => {
    return `${BASE_URL}${path.replace("./src/pages", "")}`;
  });

  const components = [
    "#contact",
    "#blog",
    "#features",
    "#pricing",
    "#team",
    "#about",
    "#faq",
  ];
  const componentPaths = components.map((component) => {
    return `${BASE_URL}${component}`;
  });

  const blogs = await getPosts();
  const blogPaths = blogs.map((blog: { node: { slug: any } }) => {
    return `${BASE_URL}/blogs/${blog.node.slug}`;
  });
  //   const timeFrames = ["Month", "Annual"];
  //   const tiers = ["SB", "FR", "LB"];
  //   const checkoutPaths = timeFrames
  //     .map((timeFrame) => {
  //       return tiers.map((tier) => {
  //         return `${BASE_URL}/checkout/${timeFrame}/${tier}`;
  //       });
  //     })
  //     .flat();
  const dynamicPaths = [...blogPaths];

  const allPaths = [...staticPaths, ...dynamicPaths, ...componentPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
