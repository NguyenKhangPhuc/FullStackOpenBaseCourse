const lodash = require('lodash')
const Blog = require('../models/blog');
const User = require('../models/user');
const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]


const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (acc, curr) => {
        return acc + curr.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (acc, curr) => {
        if (acc?.likes < curr.likes) {
            acc = curr
        }
        return acc
    }
    return blogs.reduce(reducer, { likes: 0 })
}

const mostBlogs = (blogs) => {
    const groupedBlogs = lodash.groupBy(blogs, 'author')
    const largestGroup = lodash.maxBy(Object.values(groupedBlogs), group => group.length)
    return { author: largestGroup[0].author, blogs: largestGroup.length }
}

const mostLikes = (blogs) => {
    const groupedBlogs = lodash.groupBy(blogs, 'author')
    const mostLikeAuthorBlogs = lodash.maxBy(Object.values(groupedBlogs), group => lodash.sumBy(group, 'likes'))
    const totalLikeBlogs = totalLikes(mostLikeAuthorBlogs)
    const authorName = mostLikeAuthorBlogs[0].author
    return { author: authorName, likes: totalLikeBlogs }
}

const blogsInDb = async () => {
    const response = await Blog.find({})
    return response.map(response => response.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    dummy,
    totalLikes,
    blogs,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    blogsInDb,
    usersInDb,
}