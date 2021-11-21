import React from "react";

import { useTrail, animated } from "react-spring";
import Translate, { translate } from "@docusaurus/Translate";

import Button from "../Button";

import HeroMain from "./img/hero_main.svg";

import styles from "./styles.module.css";

function Hero() {
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
          <Translate>
            {`本仓库建立的初衷是为了记录一路走来学习的计算机专业知识，方便之后复习与查看。起于此，但不止于此，在不断的摸索和完善，勤能补拙，相信一点点的积累最后汇聚成海！希望我的这个小小的计划，可以帮助到实力强大的你！止于至善`}
          </Translate>
        </animated.p>
        <animated.div style={animatedTexts[2]}>
          <Button
            isLink
            href={translate({
              id: "homepage.follow.link.href",
              message:
                "#",
              description: "social link bilibili or twitter",
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


function HeroMainImage() {
  return (
    <div className={styles.bloghome__image}>
      <HeroMain />
    </div>
  );
}

export default Hero;