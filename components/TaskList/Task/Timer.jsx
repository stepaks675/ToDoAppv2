import { useTimer } from "../../../service/hooks";
export const Timer = ({ keyTime, isCompleted, id, isExpired }) => {
  const { className, formatted } = useTimer(
    keyTime,
    isCompleted,
    isExpired,
    id
  );
  return <span className={className}>{formatted}</span>;
};
