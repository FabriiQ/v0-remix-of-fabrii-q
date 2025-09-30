from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Capture and print console messages from the browser
    page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))

    try:
        # 1. Log in as admin
        print("Navigating to login page...")
        page.goto("http://localhost:3000/auth", timeout=60000)

        # Wait for the login form to be ready by waiting for the Sign In button
        print("Waiting for login form to become visible...")
        sign_in_button = page.get_by_role("button", name="Sign In")
        expect(sign_in_button).to_be_visible(timeout=30000)
        print("Login form is visible.")

        print("Logging in as admin...")
        page.get_by_placeholder("you@example.com").fill("admin@fabriiq.com")
        page.get_by_label("Password").fill("FabriiQ2024!")
        sign_in_button.click()

        # Wait for navigation to the admin dashboard
        expect(page).to_have_url("http://localhost:3000/admin", timeout=15000)
        print("Login successful.")

        # 2. Navigate to the admin content management page
        page.goto("http://localhost:3000/admin/content", wait_until="networkidle")
        print("Navigated to content management page.")

        # 3. Verify and screenshot the content calendar tab (default)
        expect(page.locator("h1")).to_contain_text("Content Management")
        expect(page.get_by_text("October 2025")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/01_content_calendar.png")
        print("Captured 01_content_calendar.png")

        # 4. Click on the "Blog Posts" tab and take a screenshot
        page.get_by_role("tab", name="Blog Posts").click()
        expect(page.get_by_text("Recent Blog Posts")).to_be_visible()
        expect(page.get_by_text("The Future of AI")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/02_blog_posts.png")
        print("Captured 02_blog_posts.png")

        # 5. Click on the "Editor" tab and take a screenshot
        page.get_by_role("tab", name="Editor").click()
        expect(page.get_by_text("Create New Post")).to_be_visible()
        expect(page.get_by_label("Title")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/03_editor.png")
        print("Captured 03_editor.png")

        # 6. Click on the "AI Content Generator" tab and take a screenshot
        page.get_by_role("tab", name="AI Content Generator").click()
        expect(page.get_by_text("AI Content Generator").first).to_be_visible()
        expect(page.get_by_label("Prompt")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/04_ai_generator.png")
        print("Captured 04_ai_generator.png")

        # 7. Navigate to the public blog page
        page.goto("http://localhost:3000/blog", wait_until="networkidle")
        print("Navigated to public blog page.")

        # 8. Verify and screenshot the blog list
        expect(page.locator("h1")).to_contain_text("Our Blog")
        page.screenshot(path="jules-scratch/verification/05_blog_list.png")
        print("Captured 05_blog_list.png")

        print("All screenshots taken successfully.")

    finally:
        context.close()
        browser.close()

with sync_playwright() as playwright:
    run(playwright)