from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Log in as admin
        print("Logging in as admin...")
        page.goto("http://localhost:3000/auth")
        expect(page.get_by_role("button", name="Sign In")).to_be_visible(timeout=20000)
        page.get_by_placeholder("you@example.com").fill("admin@fabriiq.com")
        page.get_by_label("Password").fill("FabriiQ2024!")
        page.get_by_role("button", name="Sign In").click()
        expect(page).to_have_url("http://localhost:3000/admin", timeout=15000)
        print("Login successful.")

        # 2. Verify Content link in sidebar and navigate to calendar
        print("Verifying Content section...")
        content_link = page.get_by_role("link", name="Content")
        expect(content_link).to_be_visible()
        content_link.click()
        expect(page).to_have_url("http://localhost:3000/admin/content/calendar", timeout=15000)
        page.screenshot(path="jules-scratch/verification/01_content_calendar_page.png")
        print("Captured 01_content_calendar_page.png")

        # 3. Navigate to Posts list
        page.goto("http://localhost:3000/admin/content/posts")
        expect(page.get_by_role("heading", name="Blog Posts")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/02_content_posts_page.png")
        print("Captured 02_content_posts_page.png")

        # 4. Navigate to New Post page
        page.goto("http://localhost:3000/admin/content/posts/new")
        expect(page.get_by_role("heading", name="Create New Post")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/03_new_post_page.png")
        print("Captured 03_new_post_page.png")

        # 5. Navigate to AI Generator and test modes
        print("Verifying AI Generator...")
        page.goto("http://localhost:3000/admin/content/ai-generator")
        expect(page.get_by_role("heading", name="AI Content Generator")).to_be_visible()
        # Blog mode screenshot
        expect(page.get_by_label("Topic")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/04_ai_generator_blog_mode.png")
        print("Captured 04_ai_generator_blog_mode.png")
        # Switch to social media mode and take screenshot
        page.get_by_role("radio", name="Social Media").click()
        expect(page.get_by_label("Platform")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/05_ai_generator_social_mode.png")
        print("Captured 05_ai_generator_social_mode.png")

        # 6. Verify CRM Contacts page
        print("Verifying CRM Contacts page...")
        page.goto("http://localhost:3000/admin/crm/contacts")
        expect(page.get_by_role("heading", name="Contacts")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/06_crm_contacts_page.png")
        print("Captured 06_crm_contacts_page.png")

        # 7. Verify Public Blog page
        print("Verifying public blog page...")
        page.goto("http://localhost:3000/blog")
        expect(page.get_by_role("heading", name="Our Blog")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/07_public_blog_page.png")
        print("Captured 07_public_blog_page.png")

        print("All screenshots taken successfully.")

    finally:
        context.close()
        browser.close()

with sync_playwright() as playwright:
    run(playwright)