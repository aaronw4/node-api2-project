import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        function fetchData() {
            axios
                .get('https://arw-node-api-project2.herokuapp.com/api/posts')
                .then(info => setPosts(info.data))
                .catch(err => console.log(err));
        }
        fetchData()
    },[]);

    return(
        <div>
            {console.log(posts)}
            <div className='pageTitle'>
                <h1>Lord of the Rings Posts</h1>
            </div>
            <div className='posts'>
                {posts.map(post => (
                    <div key={post.id} className='post'>
                        <h3 className='postTitle'>{post.id}) {post.title}</h3>
                        <p className='postContents'>{post.contents}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Posts