const loginWith = async (page, username, password) => {
    await page.getByTestId('username').fill('Tester')
    await page.getByTestId('password').fill('333')
    await page.getByRole('button', { name: 'Login' }).click()
}

const createBlog = async (page, title, author, password) => {
    await page.getByRole('button', { name: 'Create blog' }).click()
    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(password)
    await page.getByRole('button', { name: 'Create' }).click()
}

export {
    loginWith,
    createBlog,
}