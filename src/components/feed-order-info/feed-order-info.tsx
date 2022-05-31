import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetOrdersAllQuery } from "../../services/reducers/socket";

const FeedOrderInfo: FC = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};
export default FeedOrderInfo;
