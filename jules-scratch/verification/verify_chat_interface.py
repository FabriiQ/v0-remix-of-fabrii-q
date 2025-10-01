from playwright.sync_api import sync_playwright, Page, expect

def verify_chat_interface(page: Page):
    """
    This test verifies that the AivyChat component on the AI demo page
    is functional by waiting for the page to load, sending a message,
    and capturing a screenshot of the response.
    """
    # 1. Arrange: Go to the AI demo page.
    page.goto("http://localhost:3000/ai-demo")

    # 2. Wait for the page to fully load by waiting for a stable element.
    #    The "Alpha Version Notice" is a good indicator that the page is ready.
    expect(page.get_by_text("Alpha Version Notice:")).to_be_visible(timeout=30000)

    # 3. Act: Find the chat input, type a message, and send it.
    chat_input = page.get_by_placeholder("Ask AIVY anything...")
    expect(chat_input).to_be_visible()
    chat_input.fill("Hello, AIVY! Tell me about FabriiQ.")

    send_button = page.get_by_role("button", name="Send")
    expect(send_button).to_be_enabled()
    send_button.click()

    # 4. Assert: Wait for the assistant's response to appear in the chat.
    assistant_response = page.locator('.my-2.p-2.rounded-lg.bg-gray-100').last
    expect(assistant_response).to_be_visible(timeout=30000)

    # 5. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/chat-interface.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_chat_interface(page)
        browser.close()

if __name__ == "__main__":
    main()