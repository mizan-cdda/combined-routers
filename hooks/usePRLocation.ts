import { useRouter } from "next/router";

const usePRLocation = () => {
  const { asPath, query } = useRouter();
  const isQueryEmpty = Object.keys(query).length === 0;
  return { asPath, query, isQueryEmpty };
};

export default usePRLocation;
