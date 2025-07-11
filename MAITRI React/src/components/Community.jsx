import { useState } from 'react'

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Priya S.',
      avatar: 'PS',
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

  const categories = ['All', 'Home Remedies', 'Support', 'Wellness Tips', 'Nutrition', 'Mental Health', 'Exercise']

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
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ))
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
          <div className="text-center">
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
                        <div className="dropdown">
                          <button className="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                            <i className="fas fa-ellipsis-h"></i>
                          </button>
                          <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#"><i className="fas fa-flag me-2"></i>Report</a></li>
                            <li><a className="dropdown-item" href="#"><i className="fas fa-bookmark me-2"></i>Save</a></li>
                          </ul>
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
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleLike(post.id)}
                          >
                            <i className="fas fa-heart me-1"></i>
                            {post.likes}
                          </button>
                          <button className="btn btn-sm btn-outline-primary">
                            <i className="fas fa-comment me-1"></i>
                            {post.comments}
                          </button>
                          <button className="btn btn-sm btn-outline-primary">
                            <i className="fas fa-share me-1"></i>
                            Share
                          </button>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary">
                          <i className="fas fa-bookmark"></i>
                        </button>
                      </div>
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
