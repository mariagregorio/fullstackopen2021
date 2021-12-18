const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

/*const mostBlogs = (blogs) => {
  const authors = blogs.reduce((prev, current) => {
    if (Object.keys(prev).find((key) => key === current.author)) {
      prev[current.author] = prev[current.author] + 1 
      return prev
    } else {
      return {...prev, [current.author]: 1}
    }
  }, {})

  const result = Object.keys(authors).reduce((prev, current) => {
    return authors[current] > prev.blogs ? {author: current, blogs: authors[current]} : prev
  }, {blogs: 0})

  return result
}*/

const mostBlogs = (blogs) => {
  const list = blogs.reduce((previous, current) => {
    const position = previous.findIndex(item => item.author === current.author)
    if (position !== -1) {
      previous[position].blogs++
      return previous
    } else {
      return [...previous, { author: current.author, blogs: 1}]
    }
  }, [])
  const result = list.reduce((previous, current) => {
    return current.blogs > previous.blogs ? current : previous
  }, { author: undefined, blogs: 0 })
  return result.author === undefined ? null : result
}

const mostLikes = (blogs) => {
  const list = blogs.reduce((previous, current) => {
    const position = previous.findIndex(item => item.author === current.author)
    if (position !== -1) {
      previous[position].likes += current.likes
      return previous
    } else {
      return [...previous, { author: current.author, likes: current.likes}]
    }
  }, [])
  const result = list.reduce((previous, current) => {
    return current.likes > previous.likes ? current : previous
  }, { author: undefined, likes: 0 })
  return result.author === undefined ? null : result
}

module.exports = { dummy, totalLikes, mostBlogs, mostLikes }