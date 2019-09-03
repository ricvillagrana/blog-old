import axios from 'axios'
import posts from '../content/'

class PostService {
  constructor() {
    this.posts = []
  }

  async process() {
    await this.processPosts()

    return this.posts.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  async processPosts() {
    await Promise.all(Object.keys(posts).map(async (key) => {
      const { data } = await axios.get(posts[key])
      const { metadata, body } = this.getDataFromPost(data)

      this.posts.push({ ...metadata, ...body })
    }))
  }

  getDataFromPost(content) {
    const metadata = this.getMetadata(content)
    const body = this.getBody(metadata, content)

    return { metadata, body }
  }

  getMetadata(content) {
    const lines = content.split('\n')
    const vars = {}

    const starts = lines.indexOf('---', 0)
    const ends   = lines.indexOf('---', 1)

    for(let i = starts + 1; i < ends; i++) {
      const [key, value] = lines[i].split(': ')
      vars[key] = value
    }

    vars.bodyStarts = ends + 1

    return vars
  }

  getBody(metadata, content) {
    const lines = content.split('\n')
    return { body: lines.slice(metadata.bodyStarts, lines.length).join('\n') }
  }
}

export default PostService
