# Modal Window Demo Website

This project is a responsive test website created to demonstrate the implementation and functionality of reusable modal windows. It is designed to showcase front-end development skills and is intended for inclusion in a personal portfolio.

## 🔍 Project Overview

The purpose of this project is to create a user-friendly web interface featuring multiple modal windows, each with different positioning and interactive behavior. These modals can be reused across different pages and customized depending on the context.

Key features include:

- Reusable modal structure
- Responsive design for desktop and mobile devices
- Click-to-open and click-outside-to-close functionality
- Ability to drag and reposition modals on screen
- Customizable modal positions per window

## 🧱 Technologies Used

- **HTML5** – Markup structure
- **CSS3** – Styling and responsive layout
- **JavaScript (Vanilla)** – Modal behavior and drag functionality

## 🪟 Modal Functionality

Each modal window consists of two main elements:
- `.modal`: The full-screen overlay container
- `.modal-content`: The visible window content, centered by default

### Opening and Closing
- Modals are opened using a `data-modal-target` attribute on clickable elements.
- They can be closed by clicking the close button (`.close-modal`) or by clicking outside the modal content.

### Drag and Drop
- Modals can be dragged by clicking and holding the `.modal-header` area.
- The dragging logic is handled with JavaScript and applies to all modals dynamically.
- Initial centering uses `transform: translate(-50%, -50%)`, and dragging adjusts the position accordingly to preserve expected behavior.

### Custom Positioning
Some modals open at specific screen locations:
- `#fenetre-about` opens on the **left center** of the screen.
- `#fenetre-contact` opens on the **right center**.

This is handled in JavaScript by checking the modal ID and adjusting the initial `top` and `left` styles accordingly.

## 📁 File Structure

---

## 🚀 How to Use

1. Clone or download the repository.
2. Open any of the HTML files in a web browser.
3. Click the buttons to open the modals.
4. Drag modals around or close them with the X icon or by clicking outside.

## 📌 Future Improvements

- Add keyboard navigation (e.g., ESC to close).
- Enhance accessibility (ARIA attributes).
- Add animations or transitions for modal appearance.

## 🧑‍💻 Author

This project was developed as part of a web development portfolio to demonstrate DOM manipulation, responsive design, and user interaction with JavaScript.

