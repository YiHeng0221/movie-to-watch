"use client";

import { getMovieComments } from "@/api/movies";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import { Comment as CommentType } from "@/type/types";

const CommentsWrapper = ({ movie_id }: { movie_id: string }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  useEffect(() => {
    const getComments = async () => {
      const resp = await getMovieComments(movie_id);
      setComments(resp.results);
    };
    getComments();
  }, [movie_id]);
  return (
    <>
      <h2 className="text-3xl font-extrabold px-4">
        Comments ({comments.length})
      </h2>
      <div className="flex flex-col w-full items-center gap-8">
        {comments.map((comment) => (
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
