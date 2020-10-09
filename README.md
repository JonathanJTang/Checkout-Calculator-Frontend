# assignment-1-6-jonathanjtang-kralgeliy1-web

[![CircleCI](https://circleci.com/gh/csc301-fall-2020/assignment-1-6-jonathanjtang-kralgeliy1-web.svg?style=shield&circle-token=ee27cbce38ad4ad51daf54c12993ce4cb3a7d082)](https://app.circleci.com/pipelines/github/csc301-fall-2020/assignment-1-6-jonathanjtang-kralgeliy1-web)

Repository for the web frontend for CSC301 A1.

Our assignment report is in the root directory of this repository, the file named `CSC301 A1 Report.pdf`

Note on CircleCI sticker: the state is not accurate, since CircleCI tasks refused to run (and give a fail status) after the class organization account ran out of credits.

## Testing Instructions

### Running the production app
Go to [https://checkoutcalculator301.herokuapp.com/](https://checkoutcalculator301.herokuapp.com/) to check out our (deployed) web app!

### Steps for Testing
- On the right hand side you'll see a panel with a list of cyan "order buttons" populated from the central product database, which you can click to add items to your cart.
- Clicking an "order button" adds one of that item to the cart; you can click the button multiple times to add one more item with each click
  - **Test action** : Click the "Water" button once, and then again
- The cart list is shown on the left hand side of the app, and updates itself as you click the "order buttons."
- Each cart item can be removed by clicking the red "x" button on the item (You can see this by clicking )
  - **Test action** : Click the the red "x" button on the previously added "Water" cart item
- The purple bar at the bottom shows the current subtotal price of the items in the cart, with tax applied (behind the scenes) on products that are taxed. For example, "Water" is not taxed while "Burger" is, following the GST system in Ontario.
- Taxed items have a 13% GST applied to them (You can see this by removing all items in the cart, and adding one "Burger" item)
  - **Test action** : Remove all items in the cart by clicking the the red "x" buttons, then add one "Burger" item and look at the subtotal bar at the bottom of the screen
- After adding all desired items, you can press the blue "Checkout" button on the right hand side panel to checkout. This will have a browser alert window pop up indicating successful checkout.
  - **Test action** Click the "Checkout" button, and see the alert that pops up
- When you press "OK" on the alert window, the cart is cleared and things are reset to checkout the next customer.
  - **Test action** Click the "OK" button on the alert that popped up in the last step, and see things are ready for the next customer; for example a new empty cart.

&nbsp;

&nbsp;

&nbsp;

## Reference: steps for development environment setup (not needed to test our app)
(Note: we used the Long Term Support (lts) version of node/npm)
1. Open a terminal shell and navigate to the `frontend` subdirectory in this repo
2. Run `npm install` to install all dependencies
3. Run `npm run start` to start the development server
4. The app should open in your browser! If not, copy the link from the command line :)
