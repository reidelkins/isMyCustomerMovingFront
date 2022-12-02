import React from "react";

type Props = {
  plan: any;
};

const PriceCard = ({ plan }: Props) => {
  return (
    <div
      className={`flex-1 bg-background text-gray-600 rounded-t rounded-b-none overflow-hidden shadow`}
    >
      <div className={`p-8 text-3xl font-bold text-center border-b-4`}>
        {plan?.name}
      </div>
      <ul className={`w-full text-center text-sm`}>
        {plan?.features.map((feature: any) => (
          <li className={`border-b py-4`} key={`${plan.name}-${feature}`}>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceCard;
