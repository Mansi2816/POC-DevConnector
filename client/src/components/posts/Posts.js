import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { getPosts } from '../../actions/post'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'
const Posts = ({getPosts, addPost, post:{posts,loading}}) => {

    useEffect (() => {
 getPosts()
 
    }, [getPosts])

  return loading ? <Spinner/> : (
    <>
    <h1 className='large-text-primary'> Posts</h1>
    <p className='Lead'>
      <i className='fas fa-user'></i>Welcome to the community
    </p>
    {/*Postform*/}
    <PostForm/>

    {posts.map(post => (
      <PostItem key={post._id}post={post}/>
    ))}
    </>
  )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPosts}) (Posts)