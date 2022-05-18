import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  padding: 20px;
  background: #000000;
  color: #ffffff;
  border-radius: 10px 0 10px 0;
`

const Post = () => {

  const { id } = useParams();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/" + id)
      .then(res => res.json())
      .then(
        (data) => {
          console.log(data);
          setPost(data);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [id])

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  if (post) {
    return (
      <Card>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </Card>
    );
  }
}

export default Post;
