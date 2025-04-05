import React from "react";

type Props = {
  text: string;
};

const GibberishCard = ({ text }: Props) => {
  return (
    <div className="bg-yellow-300 text-black py-6 px-4 rounded-lg text-2xl font-bold shadow mb-4">
      {text}
    </div>
  );
};

export default GibberishCard;
