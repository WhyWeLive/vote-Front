import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

export const Likes = ({ likes }) => {
  return (
    <div className="flex flex-row w-full px-4 bg-gray gap-2 items-center mb-4">
      <AiOutlineLike
        size={30}
        className="text-green-500 border rounded-lg p-1 hover:bg-gray-200 duration-500"
        title="Поставить лайк"
      />
      <h1 className="font-semibold text-lg border rounded-lg w-[30px] text-center">
        {likes}
      </h1>
      <AiOutlineDislike
        size={30}
        className="text-red-500 border rounded-lg p-1 hover:bg-gray-200 duration-500"
        title="Поставить дизлайк"
      />
    </div>
  );
};
