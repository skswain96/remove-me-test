import React from "react";
import Image from "next/image";
import { tributesData } from "../../components/TributesGrid/tributes";

const TributesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-center justify-items-center">
      {tributesData.map((tribute, index) => (
        <div
          className="text-center mx-auto mt-auto mb-16"
          key={`${tribute.twitterHandle}-${index}`}
        >
          <div className="m-8">
            <Image
              src={`/images/${tribute.imageSrc}`}
              alt={tribute.imageAltText}
              width={500}
              height={500}
              className="rounded-2xl object-cover"
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl">{tribute.twitterHandle}</h2>
            <button onClick={tribute.action}>Show some love! &rarr;</button>
          </div>
        </div>
      ))}
      {Array(9)
        .fill({})
        .map((_, index) => (
          <div className="text-center mx-auto mt-auto mb-16" key={index}>
            <div className="m-8">
              <Image
                src="/images/greyparticle.png"
                alt="Grey Particle"
                width={500}
                height={500}
                className="rounded-2xl object-cover"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl">@???</h2>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TributesGrid;
