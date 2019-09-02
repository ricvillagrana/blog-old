const context = require.context('.', true, /\.md$/)
const posts = {}

context.keys().forEach(key => {
  posts[key.replace(/(\.\/|\.md)|\/index/g, '')] = context(key)
})

export default posts
