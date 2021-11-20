const path = require("path");
const math = require("remark-math");
const katex = require("rehype-katex");
const adsense = require("./src/plugin/remark-adsense");

module.exports = {
  title: "codertao",
  titleDelimiter: "-",
  url: "https://zxuqian.cn",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "likesandy", // Usually your GitHub org/user name.
  projectName: "docusaurus-blog", // Usually your repo name.
  themeConfig: {
    image: "img/favicon.ico",
    announcementBar: {
      id: "feature_release", // Any value that will identify this message.
      content: `近期更新：<a>博客迁移</a>🎉🎉`,
      backgroundColor: "#fafbfc", // Defaults to `#fff`.
      textColor: "#238E23   ", // Defaults to `#000`.
    },
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
          label: "学习",
          position: "right",
          items: [
            {
              label: "技术视频",
              to: "docs/videos/",
            },
            {
              label: "CSS 完全指南",
              to: "docs/css/css-tutorial-intro",
            },
            {
              label: "资源导航",
              to: "docs/resources/",
            },
          ],
        },
        {
          label: "小工具",
          position: "right",
          to: "docs/tools/",
        },
        {
          href: "https://github.com/zxuqian/zxuqian.cn",
          label: "本站源码",
          position: "right",
        },
      ],
    },
    algolia: {
      apiKey: "fabfb0e9997e101154ed85d64b7b6a3c",
      indexName: "ZXUQIANCN",
      appId: "LIJMO3C9C4",
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "学习",
          items: [
            {
              label: "React 即时通信 UI 开发实战",
              to: "docs/course/react-chat-ui",
            },
            {
              label: "技术视频",
              to: "docs/videos",
            },
            {
              label: "CSS 完全指南",
              to: "docs/css/css-tutorial-intro",
            },
            {
              label: "资源导航",
              to: "docs/resources",
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
      copyright: `<br><br><br><br><p>Copyright © ${new Date().getFullYear()} codertao Built with Docusaurus`,
    },
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/oceanicNext"),
      defaultLanguage: "javascript",
    },
    gtag: {
      trackingID: "G-6PSESJX0BM",
      anonymizeIP: true, // Should IPs be anonymized?
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
  // themes: ["@docusaurus/theme-live-codeblock"],
  plugins: [
    path.resolve(__dirname, "./src/plugin/plugin-baidu-analytics"),
    path.resolve(__dirname, "./src/plugin/plugin-baidu-push"),
    // "@docusaurus/plugin-ideal-image",
    path.resolve(__dirname, "./src/plugin/plugin-google-adsense"),
    path.resolve(__dirname, "./src/plugin/plugin-onesignal-push"),
    path.resolve(__dirname, "./src/plugin/plugin-latest-docs"),
    "docusaurus2-dotenv",
  ],
  stylesheets: [
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      type: "text/css",
    },
    {
      href: "/katex/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X",
      crossorigin: "anonymous",
    },
    {
      href: "https://fonts.font.im/css?family=Raleway:500,700&display=swap",
      type: "text/css",
      rel: "stylesheet",
    },
  ],
};
