# User Story Template

**Title:** [Short summary of the feature]

**As a** [type of user],
**I want** [an action or feature],
**so that** [a benefit/value I get].

**Acceptance Criteria:**
1. [Criterion 1]
2. [Criterion 2]
3. [Criterion 3]

**Priority:** [High/Medium/Low]
**BV (Business Value):** [1-10]
**Story Points:** [1, 2, 3, 5, 8, 13]

---

## Example User Stories — GiftLink

### 1. User Registration
**As a** new visitor,
**I want** to create an account with my name, email, and password,
**so that** I can list and claim items on GiftLink.

**Acceptance Criteria:**
1. Registration form validates required fields.
2. Password is securely hashed before storage.
3. A JWT is returned on successful registration.

**Priority:** High
**BV:** 8
**Story Points:** 5

---

### 2. User Login
**As a** registered user,
**I want** to log in with my email and password,
**so that** I can access my profile and post items.

**Acceptance Criteria:**
1. Invalid credentials return an error message.
2. Successful login returns a JWT.
3. JWT is stored client-side for authenticated requests.

**Priority:** High
**BV:** 8
**Story Points:** 3

---

### 3. Browse Item Listings
**As a** site visitor,
**I want** to view all available gift items,
**so that** I can find something I need without purchasing new.

**Acceptance Criteria:**
1. Items are displayed with image, name, and category.
2. List loads from the `/api/gifts` endpoint.
3. Page handles empty results gracefully.

**Priority:** High
**BV:** 9
**Story Points:** 3

---

### 4. Search Items by Category
**As a** logged-in user,
**I want** to search for items by category,
**so that** I can quickly find relevant items.

**Acceptance Criteria:**
1. Search bar filters results by category name.
2. Results update without a full page reload.
3. No results shows a friendly empty state.

**Priority:** Medium
**BV:** 7
**Story Points:** 5

---

### 5. View Item Detail
**As a** logged-in user,
**I want** to view full details of a specific item,
**so that** I can decide if I want to claim it.

**Acceptance Criteria:**
1. Detail page shows description, condition, and owner.
2. Route uses `/api/gifts/:id`.
3. Invalid item ID returns a 404 message.

**Priority:** High
**BV:** 8
**Story Points:** 3

---

### 6. Comment on an Item
**As a** logged-in user,
**I want** to leave a comment on an item listing,
**so that** I can ask the owner questions before claiming it.

**Acceptance Criteria:**
1. Comment form is only visible to authenticated users.
2. Comments persist and display in chronological order.
3. Empty comments are rejected client-side.

**Priority:** Medium
**BV:** 6
**Story Points:** 3

---

### 7. Edit User Profile
**As a** registered user,
**I want** to update my profile information,
**so that** my contact details stay current.

**Acceptance Criteria:**
1. Profile form is pre-filled with existing data.
2. Updates are saved via a PUT request to the backend.
3. Success/failure feedback is shown to the user.

**Priority:** Medium
**BV:** 6
**Story Points:** 3

---

### 8. Secure API Access
**As a** system administrator,
**I want** all protected routes to require a valid JWT,
**so that** only authenticated users can modify data.

**Acceptance Criteria:**
1. Requests without a valid token return 401 Unauthorized.
2. Token expiration is enforced.
3. Middleware validates token on every protected route.

**Priority:** High
**BV:** 9
**Story Points:** 5