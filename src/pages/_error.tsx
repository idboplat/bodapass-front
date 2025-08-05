import { NextApiResponse } from "next";

// https://nextjs.org/docs/pages/building-your-application/routing/custom-error
function Error({ statusCode }: { statusCode: number }) {
  return (
    <p>
      {statusCode ? `An error ${statusCode} occurred on server` : "An error occurred on client"}
    </p>
  );
}

Error.getInitialProps = ({ res, err }: { res: NextApiResponse; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
