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
          title: "学习路线",
          items: [
            {
              label: "objtube推荐学习路线",
              href: "https://objtube.gitee.io/front-end-roadmap/#/",
            },
            {
              label: "鱼皮推荐学习路线",
              href: "https://code-learning-gamma.vercel.app/#/./%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF/%E9%B1%BC%E7%9A%AE%E5%87%BA%E5%93%81-%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF",
            },
            {
              label: "阿里前端学习路线",
              href: "https://f2e.tech/home",
            },
            {
              label: "roadmap推荐学习路线",
              href: "https://roadmap.sh/frontend",
            },
          ],
        },
        {
          title: "学习平台",
          items: [
            {
              label: "腾讯课堂",
              href: "https://ke.qq.com/",
            },
            {
              label: "慕课网",
              href: "https://www.imooc.com/",
            },
            {
              label: "掘金",
              to: "https://juejin.cn/",
            },
            {
              label: "GitHub",
              href: "https://github.com/",
            },
          ],
        },
        {
          title: "学习资源",
          items: [
            {
              label: "王红元",
              to: "https://ke.qq.com/teacher/372623326",
            },
            {
              label: "Bilibili 哔哩哔哩",
              href: "https://www.bilibili.com/",
            },
            {
              label: "MDN",
              to: "https://developer.mozilla.org/zh-CN/",
            },
            {
              label: "奇舞周刊",
              to: "https://weekly.75.team/",
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
