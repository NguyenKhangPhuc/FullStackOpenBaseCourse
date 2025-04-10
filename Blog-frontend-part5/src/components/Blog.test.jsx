import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import BlogForm from "./BlogForm";

test('renders Blog by default having only author and title', () => {
    const blog = {
        title: "Testing title",
        author: "Testing author",
        url: "https://localhost",
        likes: 0,
    }

    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Testing title')
    expect(div).toHaveTextContent('Testing author')
    expect(div).not.toHaveTextContent('https://localhost')
    expect(div).not.toHaveTextContent('0')
})

test('URL and number of likes are rendered when the button controlling the shown details has been clicked', async () => {
    const blog = {
        title: "Testing title",
        author: "Testing author",
        url: "https://localhost",
        likes: 0,
    }
    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText("https://localhost", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("0", { exact: false })).toBeInTheDocument();
})

test('If button like is clicked twice, then the event handler will be called twice', async () => {
    const blog = {
        title: "Testing title",
        author: "Testing author",
        url: "https://localhost",
        likes: 0,
    }

    const mockHandler = vi.fn()
    render(<Blog blog={blog} handleUpdateLike={mockHandler} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    expect(screen.getByText('https://localhost', { exact: false })).toBeDefined()
    expect(screen.getByText('0', { exact: false })).toBeDefined()

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

test('The Form call the event handler with right details when new blog add', async () => {
    const createBlog = vi.fn()

    render(<BlogForm handleCreateBlog={createBlog} />)
    const user = userEvent.setup()
    const toggleButton = screen.getByText('Create note')
    await user.click(toggleButton)

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const createButton = screen.getByText('Create')

    await userEvent.type(titleInput, "Testing title")
    await userEvent.type(authorInput, "Testing author")
    await userEvent.type(urlInput, "Testing url")

    screen.debug()

    await userEvent.click(createButton)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Testing title')
    expect(createBlog.mock.calls[0][0].author).toBe('Testing author')
    expect(createBlog.mock.calls[0][0].url).toBe('Testing url')
})

