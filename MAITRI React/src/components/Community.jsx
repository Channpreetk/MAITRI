import { useState, useEffect } from 'react'

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Meera S.',
      avatar: 'MS',
      time: '2 hours ago',
      category: 'Home Remedies',
      title: 'Natural remedy for period cramps that actually works!',
      content: 'I\'ve been using this ginger and turmeric tea recipe for months and it really helps with period pain. Boil water with fresh ginger slices, add turmeric powder and honey. Drink it twice a day during your period.',
      likes: 24,
      comments: 8,
      tags: ['period-pain', 'natural-remedies', 'ginger']
    },
    {
      id: 2,
      author: 'Anonymous',
      avatar: 'A',
      time: '5 hours ago',
      category: 'Support',
      title: 'Dealing with PCOS - feeling overwhelmed',
      content: 'Just got diagnosed with PCOS and I\'m feeling scared and confused. Has anyone here dealt with this? What lifestyle changes helped you the most?',
      likes: 18,
      comments: 15,
      tags: ['pcos', 'support', 'lifestyle']
    },
    {
      id: 3,
      author: 'Meera K.',
      avatar: 'MK',
      time: '1 day ago',
      category: 'Wellness Tips',
      title: 'My morning routine for better energy',
      content: 'After struggling with fatigue for months, I found this routine really helps: 1) Drink warm lemon water 2) 10 minutes of yoga 3) Protein-rich breakfast 4) 5 minutes of meditation. Game changer!',
      likes: 32,
      comments: 12,
      tags: ['energy', 'morning-routine', 'wellness']
    },
    {
      id: 4,
      author: 'Kavya R.',
      avatar: 'KR',
      time: '2 days ago',
      category: 'Nutrition',
      title: 'Iron-rich recipes that are actually tasty',
      content: 'Struggling with low iron levels? Try these recipes: spinach and chickpea curry, beetroot and pomegranate salad, and my grandmother\'s ragi porridge recipe. All delicious and iron-packed!',
      likes: 27,
      comments: 9,
      tags: ['iron-deficiency', 'recipes', 'nutrition']
    }
  ])

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    isAnonymous: false
  })

  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [openDropdown, setOpenDropdown] = useState(null)
  const [showComments, setShowComments] = useState({})
  const [commentText, setCommentText] = useState({})
  const [postComments, setPostComments] = useState({})
  const [likedPosts, setLikedPosts] = useState(new Set())

  const categories = ['All', 'Home Remedies', 'Support', 'Wellness Tips', 'Nutrition', 'Mental Health', 'Exercise']

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown !== null && !event.target.closest('.position-relative')) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [openDropdown])

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  const handleNewPost = (e) => {
    e.preventDefault()
    if (newPost.title.trim() && newPost.content.trim() && newPost.category) {
      const post = {
        id: posts.length + 1,
        author: newPost.isAnonymous ? 'Anonymous' : 'You',
        avatar: newPost.isAnonymous ? 'A' : 'Y',
        time: 'Just now',
        category: newPost.category,
        title: newPost.title,
        content: newPost.content,
        likes: 0,
        comments: 0,
        tags: []
      }
      setPosts([post, ...posts])
      setNewPost({ title: '', content: '', category: '', isAnonymous: false })
      setShowNewPostForm(false)
    }
  }

  const handleLike = (postId) => {
    if (likedPosts.has(postId)) {
      // User already liked this post, so unlike it
      setLikedPosts(prev => {
        const newSet = new Set(prev)
        newSet.delete(postId)
        return newSet
      })
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes - 1 }
          : post
      ))
    } else {
      // User hasn't liked this post yet, so like it
      setLikedPosts(prev => new Set([...prev, postId]))
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      ))
    }
  }

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId))
    }
  }

  const toggleDropdown = (postId) => {
    setOpenDropdown(openDropdown === postId ? null : postId)
  }

  const handleReport = (postId) => {
    alert(`Post reported. Thank you for helping keep our community safe!`)
    setOpenDropdown(null)
  }

  const handleSave = (postId) => {
    alert(`Post saved to your bookmarks!`)
    setOpenDropdown(null)
  }

  const handleComment = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
  }

  const handleShare = (postId) => {
    const post = posts.find(p => p.id === postId)
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content,
        url: window.location.href
      }).catch(console.error)
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${post.title}\n\n${post.content}\n\nShared from Maitri Community: ${window.location.href}`)
        .then(() => alert('Post copied to clipboard!'))
        .catch(() => alert('Unable to share. Please copy the URL manually.'))
    }
  }

  const handlePostComment = (postId) => {
    const comment = commentText[postId]?.trim()
    if (comment) {
      // Add the new comment to the post's comment list
      const newComment = {
        id: Date.now(), // Simple ID generation
        author: 'You',
        avatar: 'Y',
        content: comment,
        time: 'Just now'
      }
      
      setPostComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newComment]
      }))
      
      // Update the comments count for the post
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, comments: post.comments + 1 }
          : post
      ))
      
      // Clear the comment text
      setCommentText(prev => ({
        ...prev,
        [postId]: ''
      }))
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Home Remedies': 'success',
      'Support': 'primary',
      'Wellness Tips': 'info',
      'Nutrition': 'warning',
      'Mental Health': 'secondary',
      'Exercise': 'danger'
    }
    return colors[category] || 'primary'
  }

  return (
    <>
      {/* Header Section */}
      <section className="hero-section community-hero">
        <div className="container-fluid">
          <div className="text-center" style={{paddingTop: '40px'}}>
            <h1 className="display-4 fw-bold mb-4">Women's <span className="text-pink">Community</span></h1>
            <p className="lead">Share experiences and home remedies with other women</p>
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-3 bg-light">
        <div className="container-fluid">
          <div className="row g-3">
            <div className="col-md-3 text-center">
              <i className="fas fa-users text-pink"></i>
              <small className="ms-2">Safe Community</small>
            </div>
            <div className="col-md-3 text-center">
              <i className="fas fa-user-secret text-pink"></i>
              <small className="ms-2">Anonymous Posting</small>
            </div>
            <div className="col-md-3 text-center">
              <i className="fas fa-heart text-pink"></i>
              <small className="ms-2">Peer Support</small>
            </div>
            <div className="col-md-3 text-center">
              <i className="fas fa-leaf text-pink"></i>
              <small className="ms-2">Natural Remedies</small>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-5">
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3 mb-4">
              <div className="community-sidebar">
                {/* New Post Button */}
                <button 
                  className="btn btn-primary w-100 mb-4"
                  onClick={() => setShowNewPostForm(true)}
                >
                  <i className="fas fa-plus me-2"></i>
                  Share Your Story
                </button>

                {/* Categories */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h6 className="mb-0">Categories</h6>
                  </div>
                  <div className="card-body p-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        className={`btn btn-sm w-100 mb-2 ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Community Guidelines */}
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Community Guidelines</h6>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled small">
                      <li className="mb-2">
                        <i className="fas fa-check text-success me-2"></i>
                        Be respectful and supportive
                      </li>
                      <li className="mb-2">
                        <i className="fas fa-check text-success me-2"></i>
                        Share evidence-based information
                      </li>
                      <li className="mb-2">
                        <i className="fas fa-check text-success me-2"></i>
                        Respect privacy and anonymity
                      </li>
                      <li className="mb-0">
                        <i className="fas fa-check text-success me-2"></i>
                        Consult professionals for medical advice
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="col-lg-9">
              {/* New Post Form Modal */}
              {showNewPostForm && (
                <div className="card mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">Share Your Story</h6>
                    <button 
                      className="btn-close"
                      onClick={() => setShowNewPostForm(false)}
                    ></button>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleNewPost}>
                      <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select 
                          className="form-select"
                          value={newPost.category}
                          onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                          required
                        >
                          <option value="">Select category</option>
                          {categories.slice(1).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input 
                          type="text"
                          className="form-control"
                          value={newPost.title}
                          onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                          placeholder="Give your post a descriptive title"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Content</label>
                        <textarea 
                          className="form-control"
                          rows="4"
                          value={newPost.content}
                          onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                          placeholder="Share your experience, tips, or questions..."
                          required
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <div className="form-check">
                          <input 
                            className="form-check-input"
                            type="checkbox"
                            checked={newPost.isAnonymous}
                            onChange={(e) => setNewPost({...newPost, isAnonymous: e.target.checked})}
                          />
                          <label className="form-check-label">
                            Post anonymously
                          </label>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-primary">
                          <i className="fas fa-paper-plane me-2"></i>
                          Share Post
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-outline-secondary"
                          onClick={() => setShowNewPostForm(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Posts */}
              <div className="posts-container">
                {filteredPosts.map(post => (
                  <div key={post.id} className="card mb-4 post-card">
                    <div className="card-body">
                      {/* Post Header */}
                      <div className="d-flex align-items-center mb-3">
                        <div className="avatar-circle me-3">
                          {post.avatar}
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center">
                            <h6 className="mb-0 me-2">{post.author}</h6>
                            <span className={`badge bg-${getCategoryColor(post.category)}`}>
                              {post.category}
                            </span>
                          </div>
                          <small className="text-muted">{post.time}</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          {post.author === 'You' && (
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(post.id)}
                              title="Delete post"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          )}
                          <div className="position-relative">
                            <button 
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => toggleDropdown(post.id)}
                            >
                              <i className="fas fa-ellipsis-h"></i>
                            </button>
                            {openDropdown === post.id && (
                              <div className="dropdown-menu show position-absolute" style={{right: 0, top: '100%', zIndex: 1000}}>
                                <button 
                                  className="dropdown-item" 
                                  onClick={() => handleReport(post.id)}
                                >
                                  <i className="fas fa-flag me-2"></i>Report
                                </button>
                                <button 
                                  className="dropdown-item" 
                                  onClick={() => handleSave(post.id)}
                                >
                                  <i className="fas fa-bookmark me-2"></i>Save
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Post Content */}
                      <h5 className="post-title">{post.title}</h5>
                      <p className="post-content">{post.content}</p>

                      {/* Post Tags */}
                      {post.tags.length > 0 && (
                        <div className="mb-3">
                          {post.tags.map(tag => (
                            <span key={tag} className="badge bg-light text-dark me-2">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Post Actions */}
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex gap-3">
                          <button 
                            className={`btn btn-sm ${likedPosts.has(post.id) ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => handleLike(post.id)}
                          >
                            <i className={`fas fa-heart me-1 ${likedPosts.has(post.id) ? 'text-white' : ''}`}></i>
                            {post.likes}
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleComment(post.id)}
                          >
                            <i className="fas fa-comment me-1"></i>
                            {post.comments}
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleShare(post.id)}
                          >
                            <i className="fas fa-share me-1"></i>
                            Share
                          </button>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary">
                          <i className="fas fa-bookmark"></i>
                        </button>
                      </div>

                      {/* Comments Section */}
                      {showComments[post.id] && (
                        <div className="mt-3 pt-3 border-top">
                          <h6 className="mb-3">Comments</h6>
                          <div className="mb-3">
                            <div className="d-flex mb-2">
                              <div className="avatar-circle me-2" style={{width: '32px', height: '32px', fontSize: '0.8rem'}}>
                                U
                              </div>
                              <div className="flex-grow-1">
                                <textarea 
                                  className="form-control form-control-sm" 
                                  rows="2" 
                                  placeholder="Write a comment..."
                                  value={commentText[post.id] || ''}
                                  onChange={(e) => setCommentText(prev => ({
                                    ...prev,
                                    [post.id]: e.target.value
                                  }))}
                                ></textarea>
                              </div>
                            </div>
                            <div className="text-end">
                              <button 
                                className="btn btn-sm btn-primary"
                                onClick={() => handlePostComment(post.id)}
                                disabled={!commentText[post.id]?.trim()}
                              >
                                <i className="fas fa-paper-plane me-1"></i>
                                Comment
                              </button>
                            </div>
                          </div>
                          <div className="comments-list">
                            {/* User's new comments */}
                            {postComments[post.id]?.map(comment => (
                              <div key={comment.id} className="d-flex mb-2">
                                <div className="avatar-circle me-2" style={{width: '32px', height: '32px', fontSize: '0.8rem'}}>
                                  {comment.avatar}
                                </div>
                                <div className="flex-grow-1">
                                  <div className="bg-light p-2 rounded">
                                    <small className="fw-bold">{comment.author}</small>
                                    <p className="mb-0 small">{comment.content}</p>
                                  </div>
                                  <small className="text-muted">{comment.time}</small>
                                </div>
                              </div>
                            ))}
                            
                            {/* Existing sample comments */}
                            <div className="d-flex mb-2">
                              <div className="avatar-circle me-2" style={{width: '32px', height: '32px', fontSize: '0.8rem'}}>
                                JS
                              </div>
                              <div className="flex-grow-1">
                                <div className="bg-light p-2 rounded">
                                  <small className="fw-bold">Jane S.</small>
                                  <p className="mb-0 small">Thank you for sharing this! I'll definitely try it.</p>
                                </div>
                                <small className="text-muted">2 minutes ago</small>
                              </div>
                            </div>
                            <div className="d-flex mb-2">
                              <div className="avatar-circle me-2" style={{width: '32px', height: '32px', fontSize: '0.8rem'}}>
                                A
                              </div>
                              <div className="flex-grow-1">
                                <div className="bg-light p-2 rounded">
                                  <small className="fw-bold">Anonymous</small>
                                  <p className="mb-0 small">This really helped me too. Natural remedies are the best!</p>
                                </div>
                                <small className="text-muted">5 minutes ago</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-5">
                  <i className="fas fa-comments fa-3x text-muted mb-3"></i>
                  <h4>No posts in this category yet</h4>
                  <p className="text-muted">Be the first to share something!</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowNewPostForm(true)}
                  >
                    Create First Post
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Community
