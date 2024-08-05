# Expense Tracker
### Link: https://expense-tracker-nfjy6fjyf-nayans-projects-ca58165e.vercel.app/
A responsive web application for tracking expenses, allowing users to add, edit, and delete expenses based on category and date, as well as view a summary of their expenses.

## Features
- Add to wallet
- Add new expense transaction
- Update an expense transaction
- Delete an expense transaction
- View a summary of total expenses via:
  - Pie Chart: Category-wise information along with percentage of expense
  - Bar Chart: Category-wise information along with the total amount spent for each category
- Live Chart updates based on transactions (Add, Update, or Delete)
- Sorting and Filtering
- Responsive design, intuitive interaction on all device types (Mobile, Tablet, Laptop)

## Landing Page
### First-time users will be greeted with a ₹5000 wallet balance.
![image](https://github.com/user-attachments/assets/d8cba14b-6a17-4f8b-8abb-ae281d2a6fb4)


## Adding Expense
### Users can add expenses by clicking the "+ Add Expense" button. On clicking, they will be greeted with a modal to add expense details. The users may add the title, cost, category, and date of the expense.
![image](https://github.com/user-attachments/assets/887d881a-e8e7-4fc9-88a9-828cec82157f)
![image](https://github.com/user-attachments/assets/b6bbda99-c0d4-4a6c-a098-c731ba27bb93)

## Recent Transactions & Summary
### On adding a new expense, it gets displayed in the Recent Transactions section with transaction details and the relevant action (update, delete) along with charts being rendered immediately with the aggregated data.
![image](https://github.com/user-attachments/assets/02f335af-742d-4fe7-8f7e-83347673a13f)
### On adding a few more expenses with different categories, the dashboard looks something as shown below. The Pie Chart represents category-wise percentages while the Bar Graph represents category-wise total spent via a tooltip that is shown on hover on any of the bars.
Also, notice how the chart color changes each time. At each render, random RGB-based colors are calculated separately for the pie and the bar based on the number of categories present.
![image](https://github.com/user-attachments/assets/d55f1b06-acea-4c76-b085-459c4da217a1)

## Updating Expense
### Users can update any existing expense from the Recent Transactions section. On clicking the yellow update icon, a modal similar to that when adding an expense is displayed with pre-populated expense data. On price change or category change, the charts as well as the balance are recalculated and rerendered. 
For example, here changing the price of "Flip Flops" from ₹1200 to ₹1000 will leave us with a balance of ₹1160 and expenses of ₹3840 with a total spent on apparel category as ₹1000 as well.
![image](https://github.com/user-attachments/assets/7df4124d-5066-45c7-9803-2c441f9202f1)

## Deleting Expense
### Users can delete any existing expense from the Recent Transactions section. On Clicking the red delete icon, a modal is displayed that asks for confirmation to proceed with the delete operation. The charts as well as the balance are recalculated and rerendered.
For example, here deleting "Flip Flops" will leave us with a balance of ₹2160 and expenses of ₹2840 with a total spent on the apparel category as ₹0 as well.
![image](https://github.com/user-attachments/assets/e8ee2708-2278-4a82-b9f1-9469ec52bdb7)
![image](https://github.com/user-attachments/assets/e98195c3-ab83-4aa2-a3b5-9fc0f5e871a0)

## Filtering & Sorting
### Users can filter and sort through the items in the Recent Transactions section On click of the Filter/Sort button, the users are greeted with a modal with all options available. 
 - The items can be sorted by date and price, both from low to high and vice-versa.
 - The items can be filtered based on a category or multiple categories
![image](https://github.com/user-attachments/assets/b33b184b-8be8-40f9-b0f5-9d1c4eeec161)

 - ### Example 1: Sorting by Price High to Low
   <video width="630" height="300" src="https://github.com/user-attachments/assets/c1416376-432a-4577-9021-e49d21407475"></video>

 - ### Example 2: Sort by Date Low to High
   <video width="630" height="300" src="https://github.com/user-attachments/assets/525e1383-96e8-4459-81c9-28051577c434"></video>

 - ### Example 3: Filter by food (single)category and Sort by Price Low to High
   <video width="630" height="300" src="https://github.com/user-attachments/assets/5ef389b1-b245-498d-9845-009735e54bba"></video>

 - ### Example 4: Filter by multiple categories and Sort by Date High to Low
   <video width="630" height="300" src="https://github.com/user-attachments/assets/e53d9665-7597-4225-8739-7009237ea85d"></video>

## Responsive Design
<video width="630" height="300" src="https://github.com/user-attachments/assets/835a45d5-d6e5-4c71-a36b-ef27ca79c6c1"></video>












