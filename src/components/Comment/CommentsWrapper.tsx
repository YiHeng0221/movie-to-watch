
import { getMovieComments } from "@/api/movies";
import Comment from "./Comment";
import { Comment as CommentType } from "@/type/types";
import { use } from "react";

const getComments = async (movie_id: string) => {
  const resp = await getMovieComments(movie_id);
  return resp.results;
};

const CommentsWrapper = ({ movie_id }: { movie_id: string }) => {
  const commentsPromise = getComments(movie_id);
  const comments = use(commentsPromise);
  return (
    <>
      <h2 className="text-3xl font-extrabold px-4">
        Comments ({comments.length})
      </h2>
      <div className="flex flex-col w-full items-center gap-8">
        {comments.map((comment: CommentType) => (
          <Comment
            key={comment.id}
            author_details={comment.author_details}
            content={comment.content}
            created_at={comment.created_at}
          />
        ))}
      </div>
    </>
  );
};

export default CommentsWrapper;
