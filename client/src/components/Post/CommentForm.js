import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post'


const CommentForm = ({addComment, postId}) => {

    const [text, setText] = useState('')
  return (
    <div>
<div className="post-form">
  <div className="bg-primary p">
    <h3>Leave a comment.</h3>
  </div>
  <form className="form my-1" onSubmit={e=>{
    e.preventDefault()
    addComment(postId,{text})
    setText('')
  }}>
    <textarea name="text" cols={30} rows={5} placeholder="Add Comment" 
    value={text}
    onChange={e => setText(e.target.value)}
    required  />
    <input type="submit" className="btn btn-dark my-1" defaultValue="Submit" />
  </form>
</div>

    </div>
  )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
}

export default connect (null,{addComment}) (CommentForm)