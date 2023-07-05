import { useQuery } from "@tanstack/react-query";

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

  const postQuery = useQuery({
    queryKey: ["POST"],
    queryFn: () => wait(1000).then((POST) => POST),
  });

  if (postQuery.isError) {
    return <h2>Error in post query</h2>;
  }

  if (postQuery.isLoading) {
    return <h2>Loading....</h2>;
  }

  return (
    <>
      {postQuery.data.map((post) => (
        <div>
          <h4>Title: {post.title}</h4>
          <h4>Location: {post.location}</h4>
        </div>
      ))}
    </>
  );
};

export default App;
