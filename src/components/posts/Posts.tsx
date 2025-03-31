import styles from "./Posts.module.scss";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsDown } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa6";

export default function Posts() {
  const posts = [
    {
      id: 1,
      name: "post1",
      url: "https://i.redd.it/i2ogpfpvqmre1.jpeg",
      description: "A captivating image of a sunset over a mountain range.",
      score: 1232,
      comments: 1232,
      author: "author1",
    },
    {
      id: 2,
      name: "post2",
      url: "https://i.imgur.com/example2.png",
      description: "A funny meme about cats and their peculiar behavior.",
      score: 876,
      comments: 122,
      author: "author2",
    },
    {
      id: 3,
      name: "post3",
      url: "https://www.example.com/image3.jpg",
      description: "An informative article about the benefits of exercise.",
      score: 2543,
      comments: 23,
      author: "author3",
    },
    {
      id: 4,
      name: "post4",
      url: "https://i.redd.it/randomimage4.gif",
      description: "A short animated gif of a dog playing fetch.",
      score: 567,
      comments: 235,
      author: "author4",
    },
    {
      id: 5,
      name: "post5",
      url: "https://www.anotherwebsite.com/photo5.jpeg",
      description: "A beautiful photograph of a field of wildflowers.",
      score: 1987,
      comments: 3557,
      author: "author5",
    },
    {
      id: 6,
      name: "post6",
      url: "https://imgur.com/random6.png",
      description: "A diagram explaining the water cycle.",
      score: 345,
      comments: 9879,
      author: "author6",
    },
    {
      id: 7,
      name: "post7",
      url: "https://i.redd.it/anotherrandom7.jpeg",
      description: "A picture of a delicious looking pizza.",
      score: 2100,
      comments: 787,
      author: "author7",
    },
    {
      id: 8,
      name: "post8",
      url: "https://www.example.org/image8.jpg",
      description: "A historical photograph of a famous landmark.",
      score: 900,
      comments: 787,
      author: "author8",
    },
    {
      id: 9,
      name: "post9",
      url: "https://i.redd.it/random9.gif",
      description: "A short clip of a funny fail.",
      score: 1400,
      comments: 845,
      author: "author9",
    },
    {
      id: 10,
      name: "post10",
      url: "https://www.someotherdomain.com/photo10.jpeg",
      description: "A macro photograph of a butterfly wing.",
      score: 678,
      comments: 235,
      author: "author10",
    },
  ];
  return (
    <section id="posts" className={styles.posts}>
      {posts.map((post, index) => (
        <div key={index} className={styles.post}>
          <div>
            <h2>{post.name}</h2>
            <p>{post.description}</p>
            <img src={post.url} alt="" />
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
                {post.comments}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
