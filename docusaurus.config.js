const math = require("remark-math");
const katex = require("rehype-katex");
const adsense = require("./src/plugin/remark-adsense");

module.exports = {
  title: "codertao",
  titleDelimiter: "-",
  url: "https://docusaurus-blog-likesandy.vercel.app/",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "likesandy", // Usually your GitHub org/user name.
  projectName: "docusaurus-blog", // Usually your repo name.
  themeConfig: {
    image: "img/favicon.ico",
    hideableSidebar: true,
    navbar: {
      title: "codertao",
      logo: {
        alt: "codertao",
        src: "img/favicon.ico",
        srcDark: "img/favicon.ico",
      },
      items: [
        {
          to: "/",
          label: "首页",
          position: "right",
        },
        {
          to: "docs/collect/intro",
          label: "优文转载",
          position: "right",
        },
        {
          href: "https://github.com/likesandy/docusaurus-blog",
          label: "本站源码",
          position: "right",
        },
      ],
    },

    footer: {
      style: "dark",
      links: [
        {
          title: "社交媒体",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/zxuqian/zxuqian.cn",
            },
            {
              label: "Bilibili 哔哩哔哩",
              href: "https://space.bilibili.com/302954484",
            },
            {
              label: "网易云课堂",
              href: "https://study.163.com/course/courseMain.htm?courseId=1210022809&share=2&shareId=480000002172128",
            },
            {
              label: "腾讯课堂",
              href: "https://ke.qq.com/course/2839093?tuin=3850fdc6",
            },
          ],
        },
        {
          title: "社交媒体",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/zxuqian/zxuqian.cn",
            },
            {
              label: "Bilibili 哔哩哔哩",
              href: "https://space.bilibili.com/302954484",
            },
            {
              label: "网易云课堂",
              href: "https://study.163.com/course/courseMain.htm?courseId=1210022809&share=2&shareId=480000002172128",
            },
            {
              label: "腾讯课堂",
              href: "https://ke.qq.com/course/2839093?tuin=3850fdc6",
            },
          ],
        },
        {
          title: "友情链接",
          items: [
            {
              label: "DingShiYi",
              to: "https://dingshiyi.top/home",
            },
            {
              label: "霜序廿的个人网站",
              to: "https://shuangxunian.github.io/",
            },
            {
              label: "羽翼丶年华",
              to: "https://eve-wings.github.io/Eve-Wings/",
            },
            {
              label: "旧版博客",
              to: "https://itsandy.gitee.io/sandy.gitee.io/#/",
            },
          ],
        },
        {
          title: "友情链接",
          items: [
            {
              label: "DingShiYi",
              to: "https://dingshiyi.top/home",
            },
            {
              label: "霜序廿的个人网站",
              to: "https://shuangxunian.github.io/",
            },
            {
              label: "羽翼丶年华",
              to: "https://eve-wings.github.io/Eve-Wings/",
            },
            {
              label: "旧版博客",
              to: "https://itsandy.gitee.io/sandy.gitee.io/#/",
            },
          ],
        },
      ],
      copyright: `<br><br>Copyright © ${new Date().getFullYear()} codertao Built with Docusaurus`,
    },
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/oceanicNext"),
      defaultLanguage: "javascript",
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/zxuqian/zxuqian.cn/tree/master",
          remarkPlugins: [math, adsense],
          rehypePlugins: [katex],
          showLastUpdateTime: true,
        },
        blog: {
          path: "./blog",
          routeBasePath: "/",
          blogSidebarTitle: "近期文章",
          remarkPlugins: [math],
          rehypePlugins: [katex],
          feedOptions: {
            type: "all",
            title: "codertao",
            copyright: `<br><br><br>Copyright © ${new Date().getFullYear()} codertao Built with Docusaurus`,
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: "daily",
          priority: 0.5,
        },
      },
    ],
  ],
  plugins: [
    // path.resolve(__dirname, "./src/plugin/plugin-baidu-analytics"),
    // path.resolve(__dirname, "./src/plugin/plugin-baidu-push"),
    // "@docusaurus/plugin-ideal-image",
    // path.resolve(__dirname, "./src/plugin/plugin-google-adsense"),
    // path.resolve(__dirname, "./src/plugin/plugin-onesignal-push"),
    // path.resolve(__dirname, "./src/plugin/plugin-latest-docs"),
    // "docusaurus2-dotenv",
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
      },
    ],
  ],
};
