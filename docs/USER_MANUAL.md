# 📖 EcoRide Platform - User Manual

**Version**: 1.0.0  
**Date**: February 2026  
**Platform**: Web Application (Desktop & Mobile)

---

## Table of Contents

1. [Welcome to EcoRide](#welcome-to-ecoride)
2. [Getting Started](#getting-started)
3. [For Passengers](#for-passengers)
4. [For Drivers](#for-drivers)
5. [For Employees](#for-employees)
6. [For Administrators](#for-administrators)
7. [Account Management](#account-management)
8. [Credits System](#credits-system)
9. [FAQ](#faq)
10. [Support](#support)

---

## Welcome to EcoRide

### What is EcoRide?

EcoRide is an ecological carpooling platform that connects drivers and passengers to share rides, reduce CO² emissions, and save money. Our platform uses a **credit-based system** instead of real money, making sharing rides simple and accessible.

### Key Features

✅ **Easy Trip Search**: Find carpools by departure, destination, and date  
✅ **Eco-Friendly Focus**: Filter for electric and hybrid vehicles  
✅ **Credit Economy**: Free initial credits, no payment gateway needed  
✅ **Review System**: Rate drivers and passengers for trust  
✅ **Quality Control**: Employees moderate reviews before publication  
✅ **Trip Management**: Drivers can create, start, and complete trips  
✅ **Email Notifications**: Stay informed about your bookings  

### Platform Requirements

- **Browser**: Chrome, Firefox, Safari, or Edge (latest version)
- **Internet**: Stable connection required
- **Device**: Desktop, tablet, or mobile phone
- **Email**: Valid email address for notifications

---

## Getting Started

### Creating Your Account

1. **Navigate to EcoRide**: Visit https://ecoride.vercel.app (or local: http://localhost:3000)

2. **Click "S'inscrire"** (Register) in the top navigation

3. **Fill in the registration form**:
   - **Email**: Your valid email address
   - **Pseudo**: Choose a unique username (3-20 characters)
   - **Password**: Must contain:
     - At least 8 characters
     - 1 uppercase letter
     - 1 number
     - 1 special character (!@#$%^&*)

4. **Submit the form**

5. **Welcome! You'll receive**:
   - 20 free credits to start
   - Automatic login
   - Redirect to carpool listing page

### Logging In

1. **Click "Connexion"** (Login) in the navigation

2. **Enter your credentials**:
   - Email address
   - Password

3. **Click "Se connecter"**

4. **You're in!** Your name will appear in the header with your credit balance

### Test Accounts

For testing purposes, you can use these pre-created accounts:

```
🔵 Passenger Account
Email: passenger@ecoride.com
Password: Password123!
Credits: 20
```

```
🟢 Driver Account
Email: driver@ecoride.com
Password: Password123!
Credits: 50
Vehicle: Tesla Model 3 (Electric)
```

```
🟡 Employee Account
Email: employee@ecoride.com
Password: Password123!
Role: Review Moderator
```

```
🔴 Admin Account
Email: admin@ecoride.com
Password: Password123!
Role: Platform Administrator
```

---

## For Passengers

### Searching for a Carpool

1. **On the homepage or /carpools page**, you'll see the search form

2. **Enter your trip details**:
   - **Départ** (Departure): Starting city (e.g., "Paris")
   - **Arrivée** (Destination): Arrival city (e.g., "Lyon")
   - **Date**: Select your travel date from the calendar

3. **Click "Rechercher"** (Search)

4. **Browse results**: Available carpools will display as cards showing:
   - Driver name and photo
   - Driver rating (⭐)
   - Vehicle information
   - Departure and arrival times
   - Available seats
   - Price per seat (in credits)
   - **⚡ Écologique** badge for electric/hybrid vehicles

### Using Filters

**After searching**, use the filter panel on the left to refine results:

🌱 **Véhicule écologique**
- Toggle ON to show only electric and hybrid vehicles

💰 **Prix maximum** (slider)
- Drag to set maximum price you're willing to pay
- Shows prices from 0 to 100 credits

⏱️ **Durée maximum** (slider)
- Set maximum trip duration in hours
- Range: 0 to 10 hours

⭐ **Note minimum** (slider)
- Filter by driver rating
- Range: 0 to 5 stars

**Filters update results instantly** - no need to click a button!

### Viewing Carpool Details

1. **Click on any carpool card**

2. **View detailed information**:
   - **Trip Information**:
     - Route (departure → destination)
     - Date and time
     - Duration
     - Available seats
     - Price (driver's price + 2 platform credits)
   
   - **Driver Information**:
     - Name (pseudo)
     - Average rating
     - Driver preferences:
       - 🚬 Fumeur autorisé (Smoking allowed)
       - 🐕 Animaux autorisés (Pets allowed)
       - 🎵 Musique (Music)
       - 💬 Discussion (Talking)
   
   - **Vehicle Information**:
     - Brand and model
     - Energy type (Electric, Hybrid, Gasoline, Diesel)
     - Total seats
   
   - **Reviews Section**:
     - Past reviews from passengers
     - Rating and comments

### Booking a Carpool

**Prerequisites**:
- Must be logged in
- Must have enough credits (price × number of seats)
- Carpool must have available seats

**Steps**:

1. **On the carpool detail page**, find the booking section (right sidebar or bottom on mobile)

2. **Verify your credit balance** is shown at the top

3. **Select number of seats** (if you need more than 1)

4. **Click "Réserver"** (Book)

5. **Confirmation modal appears**:
   - Review trip details
   - See total cost (price per seat × seats)
   - See your new balance after booking

6. **Click "Confirmer la réservation"** to proceed

7. **Success!** You'll receive:
   - Credits deducted from your account
   - Booking confirmation on screen
   - Email confirmation with trip details
   - Notification for the driver

### Managing Your Bookings

1. **Go to your profile** (click your name in header → "Mon profil")

2. **Navigate to "Mes réservations"** tab

3. **View your upcoming and past bookings**:
   - Trip details (route, date, time)
   - Driver information
   - Number of seats booked
   - Amount paid
   - Booking status

4. **Cancel a booking** (if trip hasn't started):
   - Click "Annuler" button
   - Confirm cancellation
   - **Full refund**: Credits returned to your account
   - **Email notification**: Driver is notified
   - Seat becomes available again

### Leaving a Review

**After a completed trip**:

1. **You'll receive an email** prompting you to leave a review

2. **Go to your profile → "Historique"**

3. **Find the completed trip**

4. **Click "Laisser un avis"** (Leave review)

5. **Fill in the review form**:
   - **Rating**: 1 to 5 stars
   - **Comment**: Your experience (required)

6. **Submit**

7. **Your review goes to moderation**:
   - Reviewed by an employee
   - Will be published if approved
   - You'll be notified of the decision

---

## For Drivers

### Becoming a Driver

**Requirements**:
- Must have a registered account
- Must add at least one vehicle
- Must set your preferences

### Adding a Vehicle

1. **Log in to your account**

2. **Go to "Mon profil"** (your profile)

3. **Navigate to "Mes véhicules"** tab

4. **Click "Ajouter un véhicule"**

5. **Fill in vehicle details**:
   - **Marque** (Brand): e.g., "Tesla", "Toyota", "Peugeot"
   - **Modèle** (Model): e.g., "Model 3", "Prius"
   - **Type d'énergie** (Energy type):
     - ⚡ Électrique (Electric)
     - 🔋 Hybride (Hybrid)
     - ⛽ Essence (Gasoline)
     - 🛢️ Diesel
   - **Nombre de places** (Seats): Total capacity (2-8)

6. **Submit**

7. **Your vehicle is saved** and you can now create carpools!

### Setting Your Preferences

1. **Go to "Mon profil" → "Mes préférences"**

2. **Configure your driving preferences**:
   - ☑️ **Fumeur autorisé**: Allow smoking in your vehicle
   - ☑️ **Animaux autorisés**: Allow pets
   - ☑️ **Musique**: Music during the trip
   - ☑️ **Discussion**: Open to conversation

3. **Save preferences**

4. **These will be displayed** to passengers viewing your carpools

### Creating a Carpool

1. **Click "Créer un covoiturage"** in the navigation (or go to /create-carpool)

2. **Fill in the trip form**:

   **📍 Itinéraire** (Route):
   - **Départ**: Starting city
   - **Arrivée**: Destination city

   **📅 Date et horaires**:
   - **Date de départ**: Travel date (must be in the future)
   - **Heure de départ**: Departure time (HH:MM)
   - **Heure d'arrivée estimée**: Estimated arrival time

   **🚗 Détails du trajet**:
   - **Véhicule**: Select from your vehicles
   - **Places disponibles**: Number of seats to offer (1 to vehicle capacity)
   - **Prix par place**: Your price in credits
     - **Platform fee**: +2 credits added automatically
     - **Total price for passengers**: Your price + 2

3. **Click "Publier le covoiturage"** (Publish)

4. **Your trip is created!**:
   - Status: PENDING (available for booking)
   - Visible in search results
   - You receive a confirmation notification

### Managing Your Carpools

1. **Go to "Mon profil" → "Mes covoiturages"**

2. **View all your trips**:
   - **À venir** (Upcoming): Not yet started
   - **En cours** (In progress): Currently happening
   - **Terminés** (Completed): Finished trips
   - **Annulés** (Cancelled): Cancelled trips

3. **For each carpool, you can see**:
   - Trip details
   - List of passengers who booked
   - Total seats booked / available
   - Status

### Starting a Trip

**Once it's time to depart**:

1. **Go to your upcoming trip**

2. **Click "Démarrer le trajet"** (Start trip)

3. **Confirm**

4. **Status changes to IN_PROGRESS**:
   - All passengers receive email notification
   - Trip can no longer be booked or cancelled
   - You can now complete the trip

### Completing a Trip

**After you've arrived**:

1. **Go to your in-progress trip**

2. **Click "Marquer comme terminé"** (Mark as completed)

3. **Confirm completion**

4. **Trip completed!**:
   - **You earn credits**: (your price per seat) × (total passengers)
   - Credits added to your account immediately
   - All passengers receive email with review request
   - Status changes to COMPLETED

**Example**:
```
Your price: 25 credits/seat
Passengers: 3
You earn: 25 × 3 = 75 credits 🎉
```

### Cancelling a Trip

**Only possible if status is PENDING** (not started):

1. **Go to your pending trip**

2. **Click "Annuler le covoiturage"** (Cancel carpool)

3. **Confirm cancellation**

4. **Automatic process**:
   - All passengers refunded in full
   - Passengers receive email with refund details
   - Trip marked as CANCELLED
   - Trip removed from search results

⚠️ **Use responsibly**: Frequent cancellations may affect your reputation

---

## For Employees

### Role Overview

As an **Employee**, your role is to **moderate reviews** before they're published. This ensures:
- Reviews are respectful and appropriate
- No spam or offensive content
- Quality standards are maintained

### Accessing Employee Panel

1. **Log in with employee account**

2. **Click "Espace Employé"** in navigation (or go to /employee)

3. **You'll see two tabs**:
   - **Avis en attente** (Pending reviews): Reviews awaiting validation
   - **Trajets signalés** (Reported trips): Problematic trips (future feature)

### Validating Reviews

#### Viewing Pending Reviews

**The list shows**:
- Author (who wrote the review)
- Recipient (who is being reviewed)
- Rating (1-5 stars)
- Comment text
- Submission date

#### Approving a Review

1. **Read the review carefully**

2. **If it's appropriate**, click **"Valider"** (Approve)

3. **Confirm approval**

4. **Review is published**:
   - Visible to all users
   - Appears on recipient's profile
   - Contributor to average rating

#### Rejecting a Review

1. **If review violates guidelines**, click **"Refuser"** (Reject)

2. **Confirm rejection**

3. **Review is hidden**:
   - Not visible publicly
   - Author can be notified (future feature)
   - Stored for record-keeping

### Review Guidelines

**Approve if**:
✅ Respectful and constructive  
✅ Based on actual experience  
✅ Relevant to the trip  
✅ Appropriate language  

**Reject if**:
❌ Offensive or abusive language  
❌ Discriminatory content  
❌ Spam or irrelevant  
❌ Personal information shared  
❌ False or defamatory  

---

## For Administrators

### Role Overview

As an **Administrator**, you have full platform access:
- View analytics and statistics
- Create employee accounts
- Suspend/unsuspend users
- Monitor platform health

### Accessing Admin Dashboard

1. **Log in with admin account**

2. **Click "Espace Admin"** in navigation (or go to /admin)

3. **Dashboard displays**:
   - Statistics cards
   - Analytics charts
   - Employee creation form
   - User management table

### Platform Statistics

**Real-time metrics displayed**:

📊 **Utilisateurs** (Users): Total registered users  
🚗 **Covoiturages**: Total carpools created  
✅ **Trajets terminés**: Completed trips  
🏃 **Trajets actifs**: Trips in progress  
📖 **Réservations**: Total bookings  
💰 **Crédits totaux**: Total credits in circulation  

**Charts**:
- **Covoiturages par jour**: Bar chart of carpools created daily (last 30 days)
- **Crédits gagnés par jour**: Bar chart of credits earned daily

### Creating Employee Accounts

1. **In the "Créer un employé" section**:
   - **Email**: Employee's email
   - **Pseudo**: Username
   - **Mot de passe**: Must meet password requirements

2. **Click "Créer le compte employé"**

3. **Account created**:
   - Role automatically set to EMPLOYEE
   - Can immediately access employee panel
   - Appears in user management list

### Managing Users

**User table shows**:
- Pseudo
- Email
- Role (with colored badge)
- Credits balance
- Account status (Active/Suspended)
- Actions

#### Suspending a User

**Why suspend?**
- Terms of service violation
- Repeated no-shows
- Inappropriate behavior
- Admin investigation

**Steps**:

1. **Find user in the table**

2. **Click "Suspendre"** (Suspend)

3. **Confirm action**

4. **User is suspended**:
   - Cannot log in
   - All active bookings preserved
   - Can be unsuspended later

#### Unsuspending a User

1. **Find suspended user** (shows "Suspendu" badge)

2. **Click "Réactiver"** (Reactivate)

3. **Confirm**

4. **User can log in again**

⚠️ **Restrictions**:
- Cannot suspend yourself
- Cannot suspend other admins
- Use responsibly with proper justification

### Viewing Logs

**(Future feature - API ready)**

Access audit logs to see:
- User login attempts
- Booking creations
- Trip lifecycle events
- Credit transactions

---

## Account Management

### Viewing Your Profile

1. **Click your name** in the top-right header

2. **Select "Mon profil"**

3. **Tabs available**:
   - **Profil**: Personal information
   - **Mes véhicules**: Your vehicles (drivers only)
   - **Mes préférences**: Driving preferences (drivers only)
   - **Mes covoiturages**: Your created trips (drivers only)
   - **Mes réservations**: Your bookings (passengers)
   - **Historique**: Past completed trips

### Updating Profile Information

**Current limitations**: Profile editing is view-only in current version

**Future features**:
- Change pseudo
- Update email
- Change password
- Upload profile photo

### Account Security

**Password Security**:
- Never share your password
- Use a unique password for EcoRide
- Change password if compromised

**Suspended Account**:
- Contact support if suspended
- Review terms of service
- Account can be restored by admin

### Logging Out

1. **Click your name** in header

2. **Select "Déconnexion"** (Logout)

3. **You're logged out** - JWT token cleared

---

## Credits System

### What are Credits?

Credits are EcoRide's **virtual currency**:
- Used to book trips
- Earned by completing trips as driver
- No real money involved
- Cannot be withdrawn or transferred outside platform

### Initial Credits

**Every new user receives:**
🎁 **20 credits** for free upon registration

### How to Earn Credits

**As a Driver**:

1. **Create a carpool** with your desired price per seat

2. **Wait for passengers** to book

3. **Complete the trip**

4. **Receive credits**: Your price × number of passengers
   - Example: 25 credits/seat × 3 passengers = **75 credits earned**

**Platform fee**:
- Passengers pay: Your price + 2
- You receive: Your price (platform keeps +2 per seat)

### How to Spend Credits

**As a Passenger**:

1. **Find a carpool** you like

2. **Book it**: Credits deducted immediately
   - Cost = Platform price × number of seats

3. **If you cancel**: **Full refund** (before trip starts)

4. **No refund**: After trip has started

### Viewing Your Balance

**Always visible** in the header when logged in:
- Shows current credit balance
- Updates in real-time after transactions

**Transaction history**:
- View in profile under booking/carpool history
- See amounts paid or earned

### Credit Safety

✅ **Credits are safe**:
- Stored in database
- Protected by transactions (ACID compliance)
- Can't be lost due to bugs

❌ **Cannot**:
- Transfer credits to other users
- Buy credits with real money (not implemented)
- Withdraw credits as real money

---

## FAQ

### General Questions

**Q: Is EcoRide free to use?**  
A: Yes! Registration is free and you get 20 credits to start. No payment gateway is implemented.

**Q: Can I use EcoRide on mobile?**  
A: Yes! The platform is fully responsive and works on phones and tablets.

**Q: How do I contact support?**  
A: Email: contact@ecoride.com (visible in footer)

### For Passengers

**Q: What if the driver cancels?**  
A: You receive a full automatic refund of your credits + email notification.

**Q: Can I book multiple seats?**  
A: Yes, if available. Enter the number when booking.

**Q: When are credits deducted?**  
A: Immediately upon successful booking confirmation.

**Q: Can I change my booking?**  
A: No direct editing. You must cancel and rebook (full refund if before trip starts).

**Q: What if I can't make my booking?**  
A: Cancel via your profile → "Mes réservations". Full refund if trip hasn't started.

### For Drivers

**Q: When do I receive credits?**  
A: Immediately when you mark the trip as completed.

**Q: Can I edit a published carpool?**  
A: Not in current version. You can cancel and create a new one.

**Q: What if no one books my carpool?**  
A: You can still start and complete it, but you won't earn credits.

**Q: Do I pay anything to create a carpool?**  
A: No! Creating carpools is free.

**Q: Can I offer seats for free?**  
A: No, minimum price is 1 credit per seat.

### Technical Issues

**Q: I forgot my password**  
A: Password reset not yet implemented. Contact admin for help.

**Q: My credits disappeared**  
A: Check your booking history. Credits may have been used for a booking.

**Q: I didn't receive a confirmation email**  
A: Check spam folder. Email delivery requires SMTP configuration.

**Q: The site is slow**  
A: Refresh the page. Contact support if issues persist.

---

## Support

### Getting Help

**Email Support**:  
📧 contact@ecoride.com

**Platform Issues**:  
- Report bugs or technical problems
- Include: Your email, description, screenshot if possible

**Account Issues**:  
- Suspended account inquiries
- Login problems
- Missing credits

**General Inquiries**:  
- How to use features
- Suggestion for improvements
- Partnership opportunities

### Legal

**Terms of Service**: [/terms] (to be created)  
**Privacy Policy**: [/privacy] (to be created)  
**Cookie Policy**: [/cookies] (to be created)

### About EcoRide

**Mission**: Promote ecological transportation through carpooling  
**Vision**: Reduce CO² emissions and traffic congestion  
**Values**: Sustainability, Community, Trust, Innovation

**Version**: 1.0.0  
**Launch Date**: February 2026  
**Platform**: Next.js 16 + PostgreSQL + MongoDB

---

## Quick Reference Card

### Common Actions

| Action | Navigate To | Requirements |
|--------|-------------|--------------|
| Search carpools | `/carpools` or homepage | None |
| Create account | `/register` | Valid email |
| Login | `/login` | Account exists |
| Book a trip | Carpool detail page | Login + Credits |
| Create carpool | `/create-carpool` | Login + Vehicle + Driver role |
| View profile | Click name → "Mon profil" | Login |
| Add vehicle | Profile → "Mes véhicules" | Login |
| Leave review | Profile → "Historique" | Completed trip |
| Validate reviews | `/employee` | Employee role |
| Admin dashboard | `/admin` | Admin role |

### Keyboard Shortcuts

*(Future feature)*

### Mobile App

*(Future development - Web app works on mobile browsers)*

---

**Thank you for choosing EcoRide! 🌱🚗**  
**Together, we make transportation greener.**

---

**Document Version**: 1.0.0  
**Last Updated**: February 2026  
**Maintained By**: EcoRide Support Team

---

## Screenshots Guide

*Note: This section describes where screenshots should be placed in the PDF version*

### Recommended Screenshots

1. **Homepage**:
   - Hero section with search bar
   - Footer with contact info

2. **Registration Page**:
   - Empty form
   - Form with validation errors
   - Successful registration

3. **Carpool Listing**:
   - Search results with multiple cards
   - Filter panel (expanded)
   - Eco badge highlighted

4. **Carpool Detail**:
   - Full page view
   - Driver information section
   - Vehicle details
   - Reviews list
   - Booking section

5. **Booking Flow**:
   - Confirmation modal
   - Success message
   - Email confirmation (screenshot from email client)

6. **Driver Dashboard**:
   - Create carpool form
   - My carpools list
   - Trip controls (Start/Complete buttons)

7. **Employee Panel**:
   - Pending reviews list
   - Validation actions

8. **Admin Dashboard**:
   - Statistics cards
   - Analytics charts
   - User management table
   - Employee creation form

9. **Profile Pages**:
   - Profile overview
   - Vehicle management
   - Booking history

10. **Mobile Views**:
    - Homepage on mobile
    - Search results on mobile
    - Navigation menu (hamburger expanded)

**For PDF conversion**: Use tools like Markdown to PDF with prince, pandoc, or export from Notion/Google Docs after importing this markdown.
