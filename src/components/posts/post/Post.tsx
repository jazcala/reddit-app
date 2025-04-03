import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsDown } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa6";
import { postProps } from "../../../types/types";
import styles from "./Post.module.scss";
export default function Post({ post }: { post: postProps }) {
  return (
    <div className={styles.post}>
      <div>
        {(post.url.includes("jpg") ||
          post.url.includes("png") ||
          post.url.includes("jpeg")) && (
          <img src={post.url} alt={`Image of ${post.title}`} />
        )}
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <div className={styles.bottom}>
          <div className={styles.author}>
            By <a href="#">{post.author}</a>
          </div>
          <div className={styles.score}>
            <BsHandThumbsDown />
            {post.score}
            <BsHandThumbsUp />
          </div>
          <div className={styles.comments}>
            <FaRegComment />
            {post.num_comments}
          </div>
        </div>
      </div>
    </div>
  );
}
