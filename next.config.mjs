import withMDX from "@next/mdx";
import rehypeSlug from "rehype-slug";
var r = withMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeSlug],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["geist"],
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

export default r(nextConfig);
