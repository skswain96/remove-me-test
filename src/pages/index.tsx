import type { NextPage } from "next";
import Image from "next/image";
import MainLayout from "../layouts/MainLayout";
import Footer from "../components/Footer/Footer";
import { motion } from "framer-motion";
import particlesLogo from "../../public/images/plogo.svg";
import bounceCube from "../../public/images/bouncecube.svg";
import bounceGrid from "../../public/images/bouncegrid.svg";
import meMagicCandy from "../../public/images/magicCandy.svg";
import discordCandy from "../../public/images/discordCandy.svg";
import voxel from "../../public/images/voxel.gif";
import labImage from "../../public/images/lab.svg";
import twitter from "../../public/images/twitter.svg";
import Link from "next/link";
import { Button } from "@chakra-ui/react";

const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Home: NextPage = () => {
  return (
    <MainLayout>
      <div className="w-full px-2 flex justify-between items-center">
        <div className="w-10">
          <Image src={particlesLogo} alt="logo" />
        </div>
        <Link href="/staking">
          <a className="text-white font-sans font-medium text-lg px-12 hover:text-primary">
            Staking
          </a>
        </Link>
      </div>
      <div className="w-full md:w-3/4 md:m-auto flex flex-col justify-start items-center">
        <div className="max-w-[1200px] relative">
          <div>
            <motion.div
              initial={{ top: -100, opacity: 0 }}
              animate={{ top: "100px", opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute w-32 md:w-36 md:top-[100px] left-6 md:left-[30px] z-10 animate-bounce"
            >
              {" "}
              <Image src={bounceCube} alt="banner" />
            </motion.div>
            <div className="m-8 mb-0">
              <Image src={bounceGrid} alt="banner" />
            </div>
          </div>

          <h1 className="whitespace-pre-line font-sans text-main text-4xl font-bold text-left absolute bottom-12 left-12">
            <motion.span
              initial="hidden"
              animate="visible"
              variants={textVariants}
              transition={{ duration: 1 }}
            >
              Own
            </motion.span>{" "}
            <span className="font-light">
              <motion.span
                initial="hidden"
                animate="visible"
                variants={textVariants}
                transition={{ duration: 1, delay: 0.3 }}
              >
                a
              </motion.span>{" "}
              <motion.span
                initial="hidden"
                animate="visible"
                variants={textVariants}
                transition={{ duration: 1, delay: 0.6 }}
              >
                piece
              </motion.span>
            </span>
            ,<br></br>
            <span className="font-light">
              <motion.span
                initial="hidden"
                animate="visible"
                variants={textVariants}
                transition={{ duration: 1, delay: 0.9 }}
              >
                of
              </motion.span>{" "}
              <motion.span
                initial="hidden"
                animate="visible"
                variants={textVariants}
                transition={{ duration: 1, delay: 1.2 }}
              >
                a
              </motion.span>
            </span>{" "}
            <motion.span
              initial="hidden"
              animate="visible"
              variants={textVariants}
              transition={{ duration: 2, delay: 1.5 }}
            >
              masterpiece.
            </motion.span>{" "}
          </h1>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ duration: 1, delay: 2.5 }}
          className="max-w-[1200px] mt-5 flex flex-col items-center gap-1"
        >
          <h1 className="text-sub font-sans font-medium leading-6 text-lg top-6">
            Buy Particles on
          </h1>
          <div
            onClick={() =>
              window?.open(
                "https://www.magiceden.io/marketplace/particles_nft",
                "_blank"
              )
            }
          >
            <Image
              className="hover:brightness-110 hover:drop-shadow-xl cursor-pointer"
              src={meMagicCandy}
              alt="ME Candy"
            />
          </div>
        </motion.div>

        <div className="md:w-3/4 flex flex-col p-10 justify-left items-left gap-10 mb-20">
          <div>
            <h1 className="text-accent font-sans text-7xl font-bold text-left">
              vault
            </h1>
            <p className="text-sub font-sans font-medium leading-6 text-left text-l">
              Powered by Bridgesplit
            </p>
          </div>

          <h1 className="text-main font-mono text-2xl md:text-3xl font-bold text-left">
            Trending artwork, <br></br> curated & owned <br></br>by the
            community.
          </h1>

          <div className="text-main flex justify-between md:justify-start items-center md:items-start gap-4">
            <div className="pr-14">
              <h1 className="text-3xl font-bold text-left">35 +</h1>
              <p className="text-sub font-sans font-bold leading-tight text-left text-l">
                On-chain <br></br> masterpieces <br></br> collected.
              </p>
            </div>
            <div className="relative">
              <p className="text-sub font-bold leading-6 text-left text-2xl absolute -left-7 top-2">
                ◎
              </p>
              <h1 className="text-3xl font-bold text-left">500 +</h1>
              <p className="text-sub font-sans font-bold leading-tight text-left text-l">
                Invested in <br></br> independent <br></br> creators.
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col md:flex-row justify-start md:items-center gap-4 md:gap-10 self-start">
              <Image
                className="rounded-2xl overflow-auto"
                src={voxel}
                alt="banner"
              />
              <h1 className="text-main font-mono text-3xl font-bold text-left">
                Re-shaping <br></br> the art industry, <br></br> piece by piece.
              </h1>
            </div>
            <p
              onClick={() =>
                window?.open(
                  "https://docs.bridgesplit.com/main/curated/background",
                  "_blank"
                )
              }
              className="text-sub font-sans font-bold leading-tight text-left text-sm md:cursor-pointer self-start"
            >
              <span className="text-link">Learn more</span> about Curated
              Indexesᵀᴹ
            </p>
          </div>
        </div>

        <div className="w-full md:w-3/4 flex flex-col p-10 gap-4 md:gap-10 mb-20">
          <div>
            <h1 className="text-accent font-sans text-7xl font-bold text-left">
              lab
            </h1>
            <p className="text-sub font-sans font-medium leading-6 text-left text-l">
              Powered by Particles
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-start items-center gap-4 md:gap-10">
            <div className="w-full">
              <Image
                className="rounded-2xl object-fit"
                src={labImage}
                alt="1 of 1 leaderboard"
              />
            </div>

            <div className="w-full md:w-1/2">
              <h1 className="w-full text-main font-mono text-2xl md:text-2xl font-bold text-left self-start md:self-center">
                Open-source <br></br> analytics tools for <br></br>the
                community.
              </h1>
              <p
                onClick={() =>
                  window?.open("https://tools.particlesnft.io/", "_blank")
                }
                className="mt-4 text-sub font-sans font-bold leading-tight text-left text-sm md:cursor-pointer self-start"
              >
                <span className="text-link">View</span> top Creators on Solana
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/4 flex flex-col p-10 gap-6 md:gap-10">
          <div>
            <h1 className="text-accent font-sans text-5xl font-bold text-left">
              accelerator
            </h1>
            <p className="text-sub font-sans font-medium leading-6 text-left text-l">
              coming soon...
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between gap-5">
            <h1 className="text-main font-mono text-xl md:text-3xl font-bold text-left">
              Artists nominated<br></br>by the Particles DAO <br></br>receive
              expert advising.
            </h1>

            <div className="text-mainText flex flex-col justify-between md:justify-start items-start md:gap-4">
              <div>
                <p className="text-main font-mono text-xl md:text-3xl font-bold text-left">
                  Collectors gain access <br></br>to their debut auctions,{" "}
                  <br></br> held in <span className="text-accent">$OOO</span>.
                </p>
              </div>
              <p
                onClick={() => window?.open("/images/Litepaper.pdf", "_blank")}
                className="text-sub font-sans font-bold leading-tight text-left text-sm md:cursor-pointer"
              >
                <span className="text-link">Learn more</span> about our Token,
                $OOO.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mt-12 flex flex-col items-center gap-1">
          <h1 className="text-sub font-sans font-medium leading-6 text-left text-lg">
            Join us on
          </h1>
          <div
            onClick={() => window?.open("http://dsc.gg/particles", "_blank")}
            className="m-8 mt-0 mb-0"
          >
            <Image
              className="hover:brightness-110 hover:drop-shadow-xl cursor-pointer click:brightness-75"
              src={discordCandy}
              alt="Discord Candy"
            />
          </div>
          <div className="border-b border-mainText w-full"></div>
        </div>
      </div>
      <Footer />
    </MainLayout>
  );
};

export default Home;
