import * as gtag from "../../lib/gtag";

type Tribute = {
  imageSrc: string;
  imageAltText: string;
  twitterHandle: string;
  action: () => void;
};

const observer = () => {
  gtag.event({
    action: "Observer",
  });
  window.open(
    "https://twitter.com/intent/tweet?url=https%3A%2F%2Ftributes.particlesnft.io%20&text=Hey%20@TheObserverNft.%20Thank%20you%20for%20your%20contribution%20to%20the%201%2F1%20Space.%20The%20%40Particlesnft%20community%20appreciates%20you!%20%23ParticlesTributes%0A"
  );
};

const john = () => {
  gtag.event({
    action: "john",
  });
  window.open(
    "https://twitter.com/intent/tweet?url=https%3A%2F%2Ftributes.particlesnft.io%20&text=Hey%20@notjohnlestudio.%20Thank%20you%20for%20your%20contribution%20to%20the%201%2F1%20Space.%20The%20%40Particlesnft%20community%20appreciates%20you!%20%23ParticlesTributes%0A"
  );
};

const jamie = () => {
  gtag.event({
    action: "jamie",
  });
  window.open(
    "https://twitter.com/intent/tweet?url=https%3A%2F%2Ftributes.particlesnft.io%20&text=Hey%20@visiblejamie.%20Thank%20you%20for%20your%20contribution%20to%20the%201%2F1%20Space.%20The%20%40Particlesnft%20community%20appreciates%20you!%20%23ParticlesTributes%0A"
  );
};

export const tributesData: Tribute[] = [
  {
    imageSrc: "theobserver.png",
    imageAltText: "The Observer",
    twitterHandle: "@TheObserverNft",
    action: observer,
  },
  {
    imageSrc: "John_Le.png",
    imageAltText: "John Le",
    twitterHandle: "@notjohnlestudio",
    action: john,
  },
  {
    imageSrc: "Jamie.png",
    imageAltText: "Jamie",
    twitterHandle: "@visiblejamie",
    action: jamie,
  },
];
