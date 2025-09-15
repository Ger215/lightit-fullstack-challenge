# FullStack Challenge - Patient Registration

Your goal is to create a patient registration application using **Laravel & React**, as the recommended techs for this challenge, _but you can use other techs such as Go, Node, or Python_.

---

## Functionalities to Implement

### Backend

1. **API for patient registration** that requests the following information:

   - Full name
   - Email address
   - Phone number
   - Photo of the document

2. **Validation of user-entered data**, ensuring all required fields are provided and valid as appropriate.

   - Email addresses should be unique.

3. Once the patient's data has been validated, it should be **stored in a PostgreSQL database**.

4. After a patient has been successfully registered, a **confirmation email** should be sent asynchronously to avoid blocking the application.

   - It is unnecessary to design the email; you can use the framework's default template or a simple one.

5. **Use Docker** to set up the development environment for the application.

### Frontend

1. **Layout a screen** where patients' cards can be displayed (in any way you want).

   - A patient card must be expandable: initially show the name and document photo, but when expanded display the rest.
   - Somewhere in the screen should be an **Add Patient** button.
   - Handle empty & loading states.

2. **Layout a form** that accepts the following: full name, email, phone number, and document photo.

   - The phone number should be composed of two fields:
     - One for the country code (ex: +598).
     - Another one for the actual number.

3. **Form validation** rules:

   - Full name should only accept letters.
   - Email address should only accept `@gmail.com` addresses.
   - The document photo field should support drag & drop, and only accept `.jpg` images.
   - On validation error:
     - Show a message below the input field.
     - Ideally display errors with an animation.
     - Errors should only appear once the user tries to submit the form.

4. **Submission states**:

   - When data is submitted, different states must be handled and shown in a modal with an animation:
     - Error state
     - Success state

5. **Refresh list**:
   - Every time a patient is added successfully, the patients list should refresh automatically.

## Additional Points

- You can use **Laravel's** structure, conventions, and best practices that you consider best for organizing your code.
- Frontwise: showcase your organization skills, your own styling methods, domain of the selected tech, domain at making reusable components, usage of standard industry-accepted tooling (TypeScript, linting, formatters), etc.
- You must ensure that your application runs correctly in some way.
- Avoid using UI libraries such as **shadCN** or **MaterialUI**. We want to know how good you are at making components from the ground up, so primitive libraries are acceptable.
- (Laravel) Make sure to use **Laravel's validation** to verify the user-entered data.
- Use a **PostgreSQL** database to store the patient data.
- Develop the product with the understanding that the client will want **SMS notifications within two months**.
- It is not necessary to configure a real email server. You can use a library like **Mailtrap** to test email sending in a development environment.
- Use **Docker** to create a consistent and reproducible development environment.
- **You need to upload into Github repository and share with the People team.**

---

### Disclaimer ⚠️

Remember **not to use your name in the source code** to keep the process & reviewing as anonymous as possible.

---

## FAQ

**1. Can I use another tech that's not Laravel / React?**  
Yes! Of course, just let us know and we'll take it into account. Laravel and React are our preferred technologies but they are not exclusive.
