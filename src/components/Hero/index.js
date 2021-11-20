import React from "react";

import { useTrail, animated } from "react-spring";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";

import Button from "../Button";

import HeroMain from "./img/hero_main.svg";
import BilibiliIcon from "@site/static/icons/bilibili.svg";
import CSDNIcon from "@site/static/icons/csdn.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faWeixin,
} from "@fortawesome/free-brands-svg-icons";
import useBaseUrl from "@docusaurus/useBaseUrl";

import useFollowers from "./useFollowers";

import styles from "./styles.module.css";

function Hero() {
  const {
    // 当前语言
    i18n: { currentLocale },
  } = useDocusaurusContext();

  // Get followers
  const followers = useFollowers();

  // animation
  const animatedTexts = useTrail(5, {
    from: { opacity: 0, transform: "translateY(3em)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: {
      mass: 3,
      friction: 45,
      tension: 460,
    },
  });

  return (
    <animated.div className={styles.hero}>
      <div className={styles.bloghome__intro}>
        <animated.div style={animatedTexts[0]} className={styles.hero_text}>
          <Translate description="hero greet">Hello! 我是</Translate>
          <span className={styles.intro__name}>
            <Translate description="my name">codertao</Translate>
          </span>
        </animated.div>
        <animated.p style={animatedTexts[1]}>
          <Translate
            id="homepage.hero.text"
            description="hero text"
            values={{
              bilibiliText: (
                <Link to="/docs/videos">
                  <Translate
                    id="hompage.hero.text.bilibili"
                    description="Bilibili docs link label"
                  >
                    技术视频教程、
                  </Translate>
                </Link>
              ),
              courses: (
                <Link to="/docs/course/react-chat-ui">
                  <Translate
                    id="hompage.hero.text.course"
                    description="Course link label"
                  >
                    实战课程、
                  </Translate>
                </Link>
              ),
              blogs: (
                <Link to="#homepage_blogs">
                  <Translate
                    id="hompage.hero.text.blog"
                    description="Blog link label"
                  >
                    技术博客、
                  </Translate>
                </Link>
              ),
              links: (
                <Link to="/docs/resources">
                  <Translate
                    id="hompage.hero.text.link"
                    description="Link link label"
                  >
                    前端资源导航、
                  </Translate>
                </Link>
              ),
              ideas: (
                <Link to="/lifestyle">
                  <Translate
                    id="hompage.hero.text.idea"
                    description="Idea link label"
                  >
                    想法和生活点滴
                  </Translate>
                </Link>
              ),
            }}
          >
            {`本仓库建立的初衷是为了记录一路走来学习的计算机专业知识，方便之后复习与查看。起于此，但不止于此，在不断的摸索和完善，勤能补拙，相信一点点的积累最后汇聚成海！希望我的这个小小的计划，可以帮助到实力强大的你！止于至善 `}
          </Translate>
        </animated.p>
        <animated.div style={animatedTexts[2]}>
          <Button
            isLink
            href={translate({
              id: "homepage.follow.link.href",
              message:
                "https://space.bilibili.com/302954484?from=search&seid=1788147379248960737",
            })}
          >
            <Translate description="follow me btn text">Hello World</Translate>
          </Button>
        </animated.div>
      </div>

      <HeroMainImage />
    </animated.div>
  );
}

function SocialLinks({ animatedProps, ...props }) {
  // const { isDarkTheme } = useThemeContext();
  return (
    <animated.div className={styles.social__links} style={animatedProps}>
      <a href="https://space.bilibili.com/302954484">
        <BilibiliIcon />
      </a>
      <a href="https://www.linkedin.com/in/zxuqian/">
        <FontAwesomeIcon icon={faLinkedin} size="lg" />
      </a>
      <a href="https://github.com/zxuqian">
        <FontAwesomeIcon icon={faGithub} size="lg" />
      </a>
      <a href="https://blog.csdn.net/fengqiuzhihua">
        <CSDNIcon />
      </a>
      <div className={`dropdown ${styles.dropdown} dropdown--hoverable`}>
        <FontAwesomeIcon icon={faWeixin} size="lg" />
        <img
          width="50%"
          className={`dropdown__menu ${styles.dropdown__menu}`}
          src={useBaseUrl("/img/publicQR.webp")}
        />
      </div>
    </animated.div>
  );
}

function HeroMainImage() {
  return (
    <div className={styles.bloghome__image}>
      <HeroMain />
    </div>
  );
}

export default Hero;
