## Link to [deployed app](https://contact-list-dusky-delta.vercel.app)

# Contact List Application

A responsive React-based contact management application with search, pagination, and CRUD operations.

## Features

### Core Functionality
- **Add Contacts**: Create new contacts with name (required), phone (required), and email (optional)
- **Edit Contacts**: Update existing contact information
- **Delete Contacts**: Remove contacts from the list
- **Search**: Filter contacts by name or phone number in real-time
- **Pagination**: Navigate through contacts with 4 contacts per page

### User Experience
- **Form Validation**: 
  - Name and phone are required fields
  - Phone number must be exactly 10 digits
  - Email validation for proper format
- **Smart Cancel Button**: Only shows when form has data or is in edit mode
- **Pagination Management**: Automatically adjusts current page when:
  - Contacts are deleted
  - Search filters reduce available pages
  - Current page becomes empty

### Technical Features
- **State Management**: Efficient React hooks (useState) for managing application state
- **Dynamic Filtering**: Real-time search that updates contact list and resets pagination
- **Form Auto-population**: Clicking edit fills the form with existing contact data
- **Unique IDs**: Uses timestamp-based IDs for new contacts

## Assumptions & Design Decisions

### 1. **Phone Number Format**
- Assumed 10-digit Indian phone numbers without country code
- Input restricted to numeric characters only
- No formatting (dashes, spaces, parentheses) applied

### 2. **Email Field**
- Made optional as not all contacts may have email addresses
- Standard HTML5 email validation applied

### 3. **Search Behavior**
- Search is case-insensitive
- Partial matches allowed for both name and phone
- Phone search ignores non-numeric characters for flexibility

### 4. **Pagination**
- Fixed at 4 contacts per page for optimal viewing
- Current page automatically adjusts when:
  - Last contact on a page is deleted
  - Search filter reduces total pages
- Prevents "empty page" scenarios

### 5. **Edit Mode**
- Single form handles both add and edit operations
- Cancel button clears form and exits edit mode
- Cancel button visible when form has any data

### 6. **UI/UX Decisions**
- Bootstrap Icons used for visual elements
- Contact cards show all information upfront (no expand/collapse)
- Edit/Delete buttons positioned top-right for easy access
- Form appears on right side
- Color scheme: Blue (#0DAAF0) for primary actions, Red (#ef5959ff) for delete/cancel

## Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm start

# Build for production
npm run build
```

## Technologies Used
- React 18
- CSS3 (responsive design)
- Bootstrap Icons
- HTML5 form validation

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge