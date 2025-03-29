import { PrizeProps } from '../../types/prizeProps';

function Prize({ prize }: PrizeProps) {
  return (
    <>
      <div>{prize.title}</div>
      <div>{prize.price}</div>
    </>
  );
}

export default Prize;
