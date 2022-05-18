import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardLayer = styled.ul`
  text-align: center;
`

const CardContent = styled.li`
  list-style-type: none;
  margin-top: 10px;
  text-align: center;
  padding: 20px 0;  
  background: darkgreen;
  border-radius: 10px;
`

const Home = () => {
  const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(
          (data) => {
            setIsLoaded(true);
            setPosts(data);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])  

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading ...</div>;
    } else {
      return (
        <CardLayer>
          {posts.map(post => (
          <CardContent key={post.id}>
            <Link style={{color: '#ffffff'}}to={`post/${post.id}`}>{post.title}</Link>
          </CardContent>
          ))}
        </CardLayer>
      );
    }
}

export default Home;
