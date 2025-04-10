const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        const user = {
            username: "Tester",
            name: "test",
            password: "333"
        }
        const user2 = {
            username: "Paul",
            name: "NKP",
            password: "333",
        }
        await request.post('/api/testing/reset')
        await request.post('/api/users', { data: user })
        await request.post('/api/users', { data: user2 })
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        console.log(await page.content())
        await expect(page.getByText('Login to the application')).toBeVisible()
        await expect(page.getByText('username')).toBeVisible()
        await expect(page.getByText('password')).toBeVisible()
        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, "Tester", "333")
            console.log(await page.content())
            await expect(page.getByText('test logged in')).toBeVisible()
        })
        test('Login fail with incorrect credentials', async ({ page }) => {
            await page.getByTestId('username').fill('Tester')
            await page.getByTestId('password').fill('Wrong')
            await page.getByRole('button', { name: 'Login' }).click()
            console.log(await page.content())
            await expect(page.getByText('Wrong credential')).toBeVisible()
        })
    })
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, "Tester", "333")
        })
        test('A new blog can be created', async ({ page }) => {
            await createBlog(page, 'New Blog created', 'No name', 'Fake url')
            await expect(page.getByText('New Blog created', { exact: true })).toBeVisible()
            await expect(page.getByText('No name', { exact: true })).toBeVisible()

        })
        describe('When new blog added', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, 'New Blog created', 'No name', 'Fake url')
            })
            test('A blog can be liked', async ({ page }) => {
                const locator = await page.getByText('New Blog created', { exact: true })
                const locatorElement = await locator.locator('..')

                await locatorElement.getByRole('button', { name: 'view' }).click()
                await locatorElement.getByRole('button', { name: 'like' }).click()
                const likeLocator = locatorElement.getByText('likes')
                const likeElement = likeLocator.locator('..')
                await expect(likeElement.getByText('1')).toBeVisible()
            })
            test('A new blog can be deleted by who add it', async ({ page }) => {
                page.on('dialog', async (dialog) => {
                    expect(dialog.message()).toEqual('Delete the blog?')
                    await dialog.accept()
                })
                const locator = await page.getByText('New Blog created', { exact: true })
                const locatorElement = await locator.locator('..')
                await locatorElement.getByRole('button', { name: 'Delete' }).click()

                await expect(locator).not.toBeVisible()
            })
            test('Logout,then login with another account will not see the delete button in the created blog', async ({ page }) => {
                await page.getByRole('button', { name: "Logout" }).click()
                await loginWith(page, "Paul", "333")
                const locator = await page.getByText('New Blog created', { exact: true })
                const locatorElement = locator.locator("..")
                await expect(locatorElement.getByRole('button', { name: "Delete" })).not.toBeVisible();
            })
        })
        describe('when there are many blogs added', async () => {
            test('Ensure blogs are arranged in order according to the likes', async ({ page }) => {

                await createBlog(page, 'New Blog created', 'No name', 'Fake url')
                await page.getByRole('button', { name: 'Cancle' }).click()
                await expect(page.getByText('New Blog created', { exact: true })).toBeVisible()
                await createBlog(page, 'New Blog created 2', 'No name', 'Fake url')
                await page.getByRole('button', { name: 'Cancle' }).click()
                await expect(page.getByText('New Blog created 2', { exact: true })).toBeVisible()
                await createBlog(page, 'New Blog created 3', 'No name', 'Fake url')
                await page.getByRole('button', { name: 'Cancle' }).click()
                await expect(page.getByText('New Blog created 3', { exact: true })).toBeVisible()

                const locator = await page.getByText('New Blog created', { exact: true })
                const locatorElement = await locator.locator('..')
                await locatorElement.getByRole('button', { name: 'view' }).click()
                await locatorElement.getByRole('button', { name: 'like' }).click()

                const locator2 = await page.getByText('New Blog created 2', { exact: true })
                const locatorElement2 = await locator2.locator('..')
                await locatorElement2.getByRole('button', { name: 'view' }).click()
                await locatorElement2.getByRole('button', { name: 'like' }).click()
                await locatorElement2.getByRole('button', { name: 'like' }).click()
                await locatorElement2.getByRole('button', { name: 'like' }).click()

                const locator3 = await page.getByText('New Blog created 3', { exact: true })
                const locatorElement3 = await locator3.locator('..')
                await locatorElement3.getByRole('button', { name: 'view' }).click()
                await locatorElement3.getByRole('button', { name: 'like' }).click()
                await locatorElement3.getByRole('button', { name: 'like' }).click()
                console.log(await page.content(), "checkkkkkkkk")

                await page.reload();
                const locatorArray = await page.getByText("user's name: test").all()
                let checkSort = true;
                for (let i = 0; i < locatorArray.length - 1; i++) {
                    const a_likes = parseInt(locatorArray[i].getByTestId('likes').innerText())
                    const b_likes = parseInt(locatorArray[i + 1].getByTestId('likes').innerText())
                    if (a_likes < b_likes) {
                        checkSort = false;
                        break;
                    }
                }
                await expect(checkSort).toBe(true)
            })
        })
    })
})
