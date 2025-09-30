from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the CRM Dashboard
        print("Navigating to CRM Dashboard...")
        page.goto("http://localhost:3000/admin/crm", wait_until="networkidle")
        # Wait for a specific element that indicates the page has loaded
        expect(page.get_by_text("CRM Dashboard")).to_be_visible(timeout=15000)
        page.screenshot(path="jules-scratch/verification/01-crm-dashboard.png")
        print("Screenshot of CRM Dashboard taken.")

        # Navigate to the Conversations Page
        print("Navigating to Conversations page...")
        page.goto("http://localhost:3000/admin/crm/conversations", wait_until="networkidle")
        expect(page.get_by_text("Conversation Analytics")).to_be_visible(timeout=15000)
        page.screenshot(path="jules-scratch/verification/02-crm-conversations.png")
        print("Screenshot of Conversations page taken.")

        # Navigate to the Tasks Page
        print("Navigating to Tasks page...")
        page.goto("http://localhost:3000/admin/crm/tasks", wait_until="networkidle")
        expect(page.get_by_text("Task Management")).to_be_visible(timeout=15000)
        page.screenshot(path="jules-scratch/verification/03-crm-tasks.png")
        print("Screenshot of Tasks page taken.")

        # Navigate to the Contacts Page
        print("Navigating to Contacts page...")
        page.goto("http://localhost:3000/admin/crm/contacts", wait_until="networkidle")
        expect(page.get_by_text("Contacts")).to_be_visible(timeout=15000)
        page.screenshot(path="jules-scratch/verification/04-crm-contacts.png")
        print("Screenshot of Contacts page taken.")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        context.close()
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)