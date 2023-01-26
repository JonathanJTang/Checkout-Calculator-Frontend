# Checkout Calculator Frontend (React)

A simple web frontend built using React with the help of Material UI elements, for a checkout calculator designed for stores in Ontario, Canada.

This was a 2-week course project done together with İsmail Atadinç (kralgeliy1).

## Testing Instructions

### Running the production app
Go to [https://checkoutcalculator.fly.dev](https://checkoutcalculator.fly.dev) to check out our deployed web app! Here is a video on how to setup, view, and test our app :) [https://youtu.be/GLihyny2xRk](https://youtu.be/GLihyny2xRk).


### Steps for Testing (mentioned in the video)
- On the right hand side you'll see a panel with a list of cyan "order buttons" populated from the central product database, which you can click to add items to your cart.
- Clicking an "order button" adds one of that item to the cart; you can click the button multiple times to add one more item with each click
  - **Test action**: Click the "Water" button once, and then again
- The cart list is shown on the left hand side of the app, and updates itself as you click the "order buttons."
- Each cart item can be removed by clicking the red "x" button on the item (You can see this by clicking )
  - **Test action**: Click the the red "x" button on the previously added "Water" cart item
- The purple bar at the bottom shows the current subtotal price of the items in the cart, with tax applied (behind the scenes) on products that are taxed. For example, "Water" is not taxed while "Burger" is, following the GST system in Ontario.
- Taxed items have a 13% GST applied to them (You can see this by removing all items in the cart, and adding one "Burger" item)
  - **Test action**: Remove all items in the cart by clicking the the red "x" buttons, then add one "Burger" item and look at the subtotal bar at the bottom of the screen
- Items can have discounts, specified in the product database. Products with discounts have their prices in green.
  - **Test action**: Click the "Tomato" button once, to see an discounted item being added to the cart.
- After adding all desired items, you can press the blue "Checkout" button on the right hand side panel to checkout. This will have a browser alert window pop up indicating successful checkout.
  - **Test action**: Click the "Checkout" button, and see the alert that pops up
- When you press "OK" on the alert window, the cart is cleared and things are reset to checkout the next customer.
  - **Test action**: Click the "OK" button on the alert that popped up in the last step, and see things are ready for the next customer; for example a new empty cart.

&nbsp;

&nbsp;

&nbsp;

## Reference: steps for development environment setup (not needed to test our app)
(Note: we used the Long Term Support (lts) version of node/npm)
1. Open a terminal shell and navigate to the `frontend` subdirectory in this repo
2. Run `npm install` to install all dependencies
3. Run `npm run start` to start the development server
4. The app should open in your browser! If not, copy the link from the command line :)
