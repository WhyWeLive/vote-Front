import { useState } from "react";
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

export const Slide = () => {
  const slide = [
    {
      url: "https://sun4-20.userapi.com/impg/B1lF415-B46Kimr2uYCH427m1_Zvb5BKa-SoWA/Gsb-Mh5E-nA.jpg?size=571x807&quality=95&sign=49c4b5d4c5acaf454af2ad9a8a412089&c_uniq_tag=U4mnafAjqt4I3EUkUSCzPLLqHauMa8jazUlX5OE7QUA&type=album",
    },
    {
      url: "https://sun9-77.userapi.com/impg/vPll9rl6UOjvgSUM0UonrYNI4Y2iFSlROunD2w/glAVEi5AJZ4.jpg?size=571x807&quality=95&sign=1a5ee85289b60427df71e69e14dc33d4&c_uniq_tag=JR7Gn_G_AirJR_L9c4CDHib7rHaOS2ONu9vcRwVHgzo&type=album",
    },
    {
      url: "https://sun9-70.userapi.com/impg/pR2or9mPtQXFfyDfu5zQmEW_DdP5CDyXm2tyHw/-pPHulydm6s.jpg?size=571x807&quality=95&sign=91fdcb7ba8eae2910458824228c97f94&c_uniq_tag=AD-FxXkNZfT0UmySB61TZKJVOWedd255FJvlvCYfh6I&type=album",
    },
    {
      url: "https://sun9-65.userapi.com/impg/l5y3LylIYBu9X-5G3Gt_77JJ3ndVQp_sNODzbQ/G72qbOxpZjg.jpg?size=571x807&quality=95&sign=de26c77bf301f547cb9cc57c195fb8aa&c_uniq_tag=1Mgx0JsEK_2gBsA6bg3uV_dcssAi3CFodR2sXIHMecw&type=album",
    },
    {
      url: "https://sun9-69.userapi.com/impg/DI5QeccGnOEI9UMrBL9zFEEVOuPlutOd9zmdvA/Yov6xsbPojs.jpg?size=571x807&quality=95&sign=2353ab637c4943cc2b7a8c0dfb580f5b&c_uniq_tag=wTio0FZGd7jGhSBJAQMD8c2CeJ8SuHprhdWc58eVxZw&type=album",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slide.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slide.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className={"relative w-full h-[900px] max-w-[1400px] group"}>
      <img
        src={slide[currentIndex].url}
        className={
          "rounded-2xl duration-500 bg-center bg-100 w-full h-full pointer-events-none select-none"
        }
      />
      <div
        className={
          "hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        }
      >
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>

      <div
        className={
          "hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        }
      >
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className={"flex top-4 justify-center"}>
        {slide.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={"text-2xl cursor-pointer"}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};
