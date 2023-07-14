import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type postType = {
  title: string;
  location: string;
};

/** Sample data */
const POST = [
  { title: "Post 1", location: "New Dehli" },
  { title: "Post 2", location: "New banglore" },
];

const App = () => {
  const queryClient = useQueryClient();

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
  });

  const postMutation = useMutation({
    mutationFn: async (newPost: postType) => {
      await wait(1000);
      POST.push(newPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["POST"]);
    },
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
      <div>
        <button
          onClick={() => {
            postMutation.mutate({
              title: "New Post",
              location: "South",
            });
          }}
        >
          Add Post
        </button>
      </div>
    </>
  );
};

export default App;
