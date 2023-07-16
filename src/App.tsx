import { useQuery } from "@tanstack/react-query";

// type postType = {
//   title: string;
//   location: string;
// };

/** Sample data */
const POST = [
  { title: "Post 1", location: "New Dehli" },
  { title: "Post 2", location: "New banglore" },
];

const App = () => {
  /** Delayed API call to simulate async fetch */
  const wait = (
    duration: number
  ): Promise<Array<{ title: string; location: string }>> =>
    new Promise((resolve) =>
      setTimeout(() => {
        resolve(POST);
      }, duration)
    );

  const getQuery = useQuery({
    queryKey: ["POST"],
    queryFn: () => wait(1000).then((POST) => POST),
    staleTime: 1000,
    refetchInterval: 1000,
  });

  if (getQuery.isError) {
    return <h2>Error in post query</h2>;
  }

  if (getQuery.isLoading) {
    return <h2>Loading....</h2>;
  }

  return (
    <>
      {getQuery.data.map((post) => (
        <div key={Math.random()}>
          <h4>Title: {post.title}</h4>
          <h4>Location: {post.location}</h4>
        </div>
      ))}
      <div></div>
    </>
  );
};

export default App;
