# Frontend Mentor - Audiophile e-commerce website solution

This is a solution to the [Audiophile e-commerce website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/audiophile-ecommerce-website-C8cuSd_wx). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add/Remove products from the cart
- Edit product quantities in the cart
- Fill in all fields in the checkout
- Receive form validations if fields are missed or incorrect during checkout
- See correct checkout totals depending on the products in the cart
  - Shipping always adds $50 to the order
  - VAT is calculated as 20% of the product total, excluding shipping
- See an order confirmation modal after checking out with an order summary
- **Bonus**: Keep track of what's in the cart, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)

### Screenshot

![](./solution.png)

### Links

- Solution URL: [Add solution URL here](https://github.com/elhuzain/audiophile)
- Live Site URL: [Add live site URL here](https://audiophile.elhuzain.com)

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework

### What I learned

This project improved both how I structure components and how I approach the less visible parts of an e-commerce flow. I explored using `AGENTS.md` and skills to guide AI assistance, and organized the UI in layers: `section` components assemble page regions, `reusable` components are shared pieces of UI, and `primitive` components are the smallest building blocks.

The cart was a useful lesson in keeping state consistent across separate parts of an app. The header, cart dialog, and checkout need to reflect the same changes, so I put cart reads and writes behind a small shared store and notify subscribers after updates. I also learned that browser storage needs defensive handling: persisted JSON can be malformed, and `localStorage` can be unavailable, so stored entries are checked and the cart falls back to in-memory state when needed. Supporting both same-tab updates and browser storage events also makes changes visible across tabs.

Checkout validation took more care than simply marking fields as required. I used native form constraints for required values, email types, lengths, and formats, then connected field-specific error messages to inputs with `aria-invalid` and `aria-describedby`. Payment choice adds another state-dependent case: e-Money details should only be required when that payment method is selected. This made the browser's validation behavior and the visible, accessible feedback part of the same workflow.

I learned to treat totals as a rule, not just a display. The product subtotal is based on each price and quantity; shipping is $50 for a non-empty cart; and the displayed VAT is 20% of the product subtotal, excluding shipping. Keeping these rules clear matters because the checkout summary and confirmation both show totals. One challenge is that some of this calculation is currently repeated, which makes future pricing changes easier to get out of sync.

Responsive layout work was mostly about changing the relationship between content, not just shrinking it. Checkout moves from a single-column flow to a form-and-summary grid at larger sizes, where the summary can stay visible, while product rows and dialogs need to remain usable on narrow screens. The main challenge was preserving a clear reading order and keeping controls and long product names from crowding one another.

Next, I would move subtotal, VAT, shipping, and grand-total calculations into one shared helper used by the summary and confirmation. I would also add a few end-to-end checks at mobile and desktop widths, especially for checkout validation and the order confirmation, so layout and behavior are verified together as the project grows.

### AI Collaboration

Describe how you used AI tools (if any) during this project. This helps demonstrate your ability to work effectively with AI assistants.

- What tools did you use (e.g., ChatGPT, Claude, GitHub Copilot)?
- How did you use them (e.g., debugging, generating boilerplate, brainstorming solutions)?
- What worked well? What didn't?

Codex Sol 5.6 was used to assist with the project structure and overall refactoring of the project when needed. Ocassionally, I notice I place my components in the wrong hierarichy. I use AI to quickly move them back where they should be. I also used AI to write commit messages.

## Author

- Website - [elhuzain](https://elhuzain.com)
- Frontend Mentor - [@elhuzain](https://www.frontendmentor.io/profile/elhuzain)
